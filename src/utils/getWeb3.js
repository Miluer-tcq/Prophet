const Web3 = require('web3');
let WEB3;
let Address;
let Contracts;
const ContractAddr = "0xc026E2dFF8cA4cdaaC9e52e8063e93eAEe1eBA07";
const Ballot = [{
    "constant": false,
    "inputs": [{"name": "content", "type": "string"}, {"name": "option", "type": "string[]"}, {
        "name": "Validity",
        "type": "uint256"
    }, {"name": "addr", "type": "address"}],
    "name": "InitiateEvent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "uint256"}],
    "name": "Reward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "getPlayer",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256[]"}, {
        "name": "",
        "type": "uint256[]"
    }, {"name": "", "type": "uint256[]"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getTotalEvent",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "uint256"}, {"name": "option", "type": "uint256"}],
    "name": "Report",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "id", "type": "uint256"}, {"name": "option", "type": "uint256"}, {
        "name": "finance",
        "type": "uint256"
    }],
    "name": "Vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "id", "type": "uint256"}],
    "name": "getEvent",
    "outputs": [{
        "components": [{"name": "ID", "type": "uint256"}, {
            "name": "Sponsor",
            "type": "address"
        }, {"name": "Content", "type": "string"}, {"name": "Option", "type": "string[]"}, {
            "name": "Reporter",
            "type": "address"
        }, {"name": "StartDate", "type": "uint256"}, {"name": "Deadline", "type": "uint256"}, {
            "name": "Voters",
            "type": "address[]"
        }, {"name": "PrizePool", "type": "uint256"}, {"name": "Report", "type": "bool"}, {
            "name": "Result",
            "type": "uint256"
        }], "name": "", "type": "tuple"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "id", "type": "uint256"}, {"name": "option", "type": "uint256"}],
    "name": "getEventOptionInfo",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "id", "type": "uint256"}, {"name": "addr", "type": "address"}],
    "name": "getVote",
    "outputs": [{
        "components": [{"name": "Voted", "type": "bool"}, {
            "name": "Time",
            "type": "uint256"
        }, {"name": "Option", "type": "uint256"}, {"name": "Finance", "type": "uint256"}, {
            "name": "Reward",
            "type": "bool"
        }], "name": "", "type": "tuple"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "getPlayerLogs",
    "outputs": [{
        "components": [{"name": "Time", "type": "uint256"}, {
            "name": "ID",
            "type": "uint256"
        }, {"name": "action", "type": "string"}, {"name": "Change", "type": "int256"}, {
            "name": "Balance",
            "type": "uint256"
        }], "name": "", "type": "tuple[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "CreatePlayer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];

// WEB3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a400c585da084233b12bb66f23304eb6'));
// Contracts = new WEB3.eth.Contract(Ballot, ContractAddr);

function Connection() {
    if (typeof web3 !== 'undefined') {
        if (ethereum.selectedAddress !== 'undefined') {
            if (ethereum.networkVersion === '3') {
                WEB3 = new Web3(web3.currentProvider);
                ethereum.enable();
                Address = ethereum.selectedAddress;
                Contracts = new WEB3.eth.Contract(Ballot, ContractAddr);
            } else {
                alert("请选择Ropsten测试网络！");
            }
        } else {
            alert("请解锁MetaMask并创建账号！");
        }
    } else {
        alert("请在浏览器安装MetaMask插件！");
    }
    return WEB3;
}

// _web3.eth.defaultAccount = web3.eth.accounts[1];
// ethereum.enable();
// ethereum.selectedAddress;
// window.console.log(ethereum.selectedAddress);
// window.addr = ethereum.selectedAddress;

function CreatePlayer() {
    return Contracts.methods.CreatePlayer().send({from: Address})
}

function InitiateEvent(content, option, Validity, addr) {
    return Contracts.methods.InitiateEvent(content, option, Validity, addr).send({from: Address})
}

function Vote(id, option, finance) {
    return Contracts.methods.Vote(id, option, finance).send({from: Address})
}

function Report(id, option) {
    return Contracts.methods.Report(id, option).send({from: Address})
}

function Reward(id) {
    return Contracts.methods.Reward(id).send({from: Address})
}

function getTotalEvent() {
    return Contracts.methods.getTotalEvent().call({from: Address})
}

function getEvent(id) {
    return Contracts.methods.getEvent(id).call({from: Address})
}

function getEventOptionInfo(id, option) {
    return Contracts.methods.getEventOptionInfo(id, option).call({from: Address})
}

function getPlayer(addr = Address) {
    return Contracts.methods.getPlayer(addr).call({from: Address})
}

function getVote(id, addr = Address) {
    return Contracts.methods.getVote(id, addr).call({from: Address})
}

function getPlayerLogs(addr = Address) {
    return Contracts.methods.getPlayerLogs(addr).call({from: Address})
}

export {  //关键
    WEB3,
    Connection,
    CreatePlayer,
    InitiateEvent,
    Vote,
    Report,
    Reward,
    getTotalEvent,
    getEvent,
    getEventOptionInfo,
    getPlayer,
    getVote,
    getPlayerLogs
}
