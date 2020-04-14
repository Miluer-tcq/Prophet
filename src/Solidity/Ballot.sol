pragma solidity >0.4.22;
//可用string[]作为输入参数
pragma experimental ABIEncoderV2;


contract Ballot{
    struct Event{
        uint ID;//事件ID
        address Sponsor;//发起人
        string Content;//事件内容
        string[] Option;//事件选项
        address Reporter;//汇报人
        uint StartDate;//开始时间
        uint Deadline;//截至时间
        address [] Voters;//投票人
        uint PrizePool;//奖池
        bool Report;//汇报状态 默认为false
        uint Result;//事件结果 对应选项索引 默认为99
    }

    struct Player{
        address Uesr;//用户地址
        uint Balance;//用户余额
        uint[] Created;//已创建ID
        uint[] Selected;//已投票ID
        uint[] Report;//需汇报ID
        mapping(uint=>Option) OptionInfo;//每个已投票事件的选项资金
    }

    struct Option{
        bool Voted;//事件投票状态
        uint Time; //投票时间
        uint Option;//事件选项
        uint Finance;//事件金额
        bool Reward;//事件奖励状态
    }

    struct Finance{
        mapping(uint=>uint) Finance;//选项对应金额
    }

    struct Log{
        uint Time;
        uint ID;
        string action;
        int Change;
        uint Balance;
    }


    Event[] Events;//总事件
    mapping(uint=>Finance) EventFinance;//事件对应金额
    address[] ExistPlayers;//总用户
    mapping(address=>Player) Players;//用户对应信息
    mapping(address=>Log[]) PlayerLogs;

    //构造函数
    // constructor()public{
    // }

    //账号初始化
    function CreatePlayer()public {
        if(msg.sender == Players[msg.sender].Uesr){revert("you are Created");}//查询判断是否已为用户
        //利用映射查找，避免使用遍历浪费资源
        // for(uint i=0;i<ExistPlayers.length;i++){
        //     if(msg.sender == ExistPlayers[i]){revert("you are Created!");}
        // }
        uint[] memory empty;
        uint cost = 10000;
        Players[msg.sender] = Player(msg.sender,cost,empty,empty,empty);//给予初始金额
        ExistPlayers.push(msg.sender);//添加进总用户
        PlayerLogs[msg.sender].push(Log(block.timestamp,0,'CreatePlayer',int(cost), Players[msg.sender].Balance));
    }

    //发起投票事件
    function InitiateEvent (string  content,string[] option,uint Validity,address addr) public {
        if(msg.sender != Players[msg.sender].Uesr){revert("You did not Create!");}//查询判断是否为用户
        if(addr != Players[addr].Uesr){revert("Reporter does not exist!");}//查询汇报人是否为用户
        uint cost = 500;
        if(Players[msg.sender].Balance < cost){revert("Insufficient balance!");}//判断余额
        Players[msg.sender].Balance -= cost;//消耗代币发起投票
        uint ID = Events.length;
        address [] memory voters;
        Players[msg.sender].Created.push(ID);//添加到已创建列表
        Players[addr].Report.push(ID);//添加到汇报人需汇报列表
        Events.push(Event(ID, msg.sender, content, option, addr, block.timestamp, block.timestamp + Validity,voters, 0, false, 99));
        PlayerLogs[msg.sender].push(Log(block.timestamp,ID,'InitiateEvent',0 - int(cost), Players[msg.sender].Balance));
    }

    //投票
    function Vote(uint id,uint option,uint finance)public{
        if(msg.sender != Players[msg.sender].Uesr){revert("You did not Create!");}//判断是否为用户
        if(id >= Events.length){revert("non-ID!");}//判断事件id
        if(option >= Events[id].Option.length){revert("non-opID!");}//判断事件选项id
        if(block.timestamp >= Events[id].Deadline){revert("The event is over!");}//判断事件是否结束
        if(finance > Players[msg.sender].Balance){revert("Insufficient balance!");}//判断余额
        if(Players[msg.sender].OptionInfo[id].Voted != false){//避免选择不同选项
            if(option != Players[msg.sender].OptionInfo[id].Option){revert("Disable other options!");}
        }
        Players[msg.sender].Balance -= finance;//先扣除金额，防止重入攻击
        Players[msg.sender].Selected.push(id);//更新用户投票信息
        Players[msg.sender].OptionInfo[id].Time = block.timestamp;
        Players[msg.sender].OptionInfo[id].Option = option;
        Players[msg.sender].OptionInfo[id].Finance += finance;
        Players[msg.sender].OptionInfo[id].Voted = true;//标记已有选择
        Events[id].Voters.push(msg.sender);//更新事件投票人
        Events[id].PrizePool += finance;//更新事件资金
        EventFinance[id].Finance[option] += finance;
        PlayerLogs[msg.sender].push(Log(block.timestamp,id,'Vote',0 - int(finance), Players[msg.sender].Balance));
    }

    //汇报结果
    function Report(uint id, uint option) public{
        if(id >= Events.length){revert("non-ID!");}//判断事件id
        if(option >= Events[id].Option.length){revert("non-opID!");}//判断事件选项id
        if(Events[id].Report != false){revert("Has been reported");}//判断是否已经汇报
        if(block.timestamp < Events[id].Deadline){revert("The event is not over");}//判断事件是否结束
        if(msg.sender != Events[id].Reporter){revert("You are not Reporter!");}//判断是否为汇报人
        Events[id].Result = option;
        Events[id].Report = true;
        PlayerLogs[msg.sender].push(Log(block.timestamp,id,'Report',0, Players[msg.sender].Balance));
    }

    //申请奖励
    function Reward(uint id)public{
        if(Players[msg.sender].OptionInfo[id].Voted != true){revert("You did not vote!");}//判断是否投票
        if(Events[id].Report != true){revert("Unreported!");}//判断是否已经汇报
        if(Players[msg.sender].OptionInfo[id].Option != Events[id].Result){revert("You predict failure!");}//判断是否预测成功
        if(Players[msg.sender].OptionInfo[id].Reward != false){revert("You have received the prize!");}//判断是否有过奖励
        uint reward = Players[msg.sender].OptionInfo[id].Finance + ((Players[msg.sender].OptionInfo[id].Finance * (Events[id].PrizePool - EventFinance[id].Finance[Events[id].Result])) / EventFinance[id].Finance[Events[id].Result]);
        Players[msg.sender].Balance += reward;//奖励代币
        Players[msg.sender].OptionInfo[id].Reward = true;
        PlayerLogs[msg.sender].push(Log(block.timestamp,id,'Reward',int(reward), Players[msg.sender].Balance));
    }

     //查看总事件数
    function getTotalEvent() public view returns(uint){
        return Events.length;
    }

    //查看事件信息
    //****总数据需前端循环遍历每个事件id****
    function getEvent(uint id) public view returns(Event){
        return Events[id];
    }

    //查看事件选项金额
    //****总数据需前端循环遍历每个事件选项id****
    function getEventOptionInfo(uint id,uint option) public view returns(uint){
        return EventFinance[id].Finance[option];
    }

    //查看个人信息
    function getPlayer(address addr) public view returns(uint,uint[],uint[],uint[]){
        return (Players[addr].Balance,Players[addr].Selected,Players[addr].Created,Players[addr].Report);
    }

    //查看用户投票选项和金额
    //****总数据需前端根据已投事件id循环遍历****
    function getVote(uint id,address addr) public view returns(Option){
        return Players[addr].OptionInfo[id];
    }

    function getPlayerLogs(address addr) public view returns(Log[]){
        return PlayerLogs[addr];
    }
}
