<template>
    <div>
        <el-page-header @back="$router.go(-1)" content="详情页面">
        </el-page-header>
        <br>
        <el-row v-loading="Loading">
            <div v-if="Event !== ''">
                <Event :Event="Event" width1="4" width2="6" width3="12">
                    <div slot="Progress">
                        <el-alert
                                v-if="new Date().getTime() < parseInt(Event['Deadline'])*1000"
                                :closable="false"
                                title="投票进行中"
                                type="success"
                                description="到达截至日期后关闭投票入口">
                        </el-alert>
                        <el-alert
                                v-if="(new Date().getTime() > parseInt(Event['Deadline'])*1000) && (Event['Report'] === false) && Event['Reporter'].toUpperCase() !== Address.toUpperCase()"
                                :closable="false"
                                title="投票已结束"
                                type="info"
                                description="等待汇报人汇报结果后开启奖励入口">
                        </el-alert>
                        <el-alert
                                v-if="(new Date().getTime() > parseInt(Event['Deadline'])*1000) && (Event['Report'] === false) && Event['Reporter'].toUpperCase() === Address.toUpperCase()"
                                :closable="false"
                                title="投票已结束"
                                type="info"
                                description="您是汇报人,请如实汇报结果！">
                        </el-alert>
                        <el-alert
                                v-if="Option['Voted'] === true && Event['Report'] === true  && Option['Option'] === Event['Result'] && Option['Reward'] === false"
                                :closable="false"
                                title="事件已汇报"
                                type="warning"
                                description="恭喜您预测成功,可以申请奖励！">
                        </el-alert>
                        <el-alert
                                v-if="Option['Reward'] === true"
                                :closable="false"
                                title="事件已汇报"
                                type="warning"
                                description="恭喜您预测成功,您已申请奖励！">
                        </el-alert>
                        <el-alert
                                v-if="Option['Voted'] === true && Event['Report'] === true  && Option['Option'] !== Event['Result']"
                                :closable="false"
                                title="事件已汇报"
                                type="error"
                                description="很遗憾您预测失败,再接再厉吧！">
                        </el-alert>
                        <!--                        未参与投票的提示-->
                        <el-alert
                                v-if="Event['Report'] === true && Option['Voted'] !== true"
                                :closable="false"
                                title="事件已汇报"
                                type="info"
                                description="预测成功的账号可以进行奖励申请">
                        </el-alert>
                    </div>
                    <div slot="Info">
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                            {{"发起人：" + Event["Sponsor"]}}<br>
                            {{"汇报人：" + Event["Reporter"]}}<br>
                            {{"汇报状态：" + Event["Report"]}}<br>
                            <el-button slot="reference">更多信息</el-button>

                        </el-popover>
                        <span style="margin-left: 20px" v-if="Trading">
                            <el-link :href="'https://ropsten.etherscan.io/tx/'+Hash"
                                     type="primary"
                                     target="_blank">交易正在确认中。。。</el-link>
                        </span>
                        <br><br>
                        <el-button :loading="Trading"
                                   type="warning" round plain
                                   @click="ReportDialog = true"
                                   v-if="ReportButton && Event['Reporter'].toUpperCase() === Address.toUpperCase()  && (new Date().getTime() > parseInt(Event['Deadline'])*1000) && (Event['Report'] === false)">
                            {{'汇报结果'}}
                        </el-button>
                        <el-dialog title="确认汇报结果"
                                   :visible.sync="ReportDialog"
                                   width="30%"
                                   top='30vh'>
                            <el-button type="warning" plain round
                                       v-for="(option,opId) in Event['Option']" :key="opId"
                                       @click="report(option,opId)"
                                       style="margin-right: 20px">
                                {{option}}
                            </el-button>
                            <br><br><br>
                            <div style="color: #ff5e21">{{'*请如实汇报事件结果，用户可对汇报进行质疑'}}</div>
                        </el-dialog>
                        <el-button :loading="Trading"
                                   type="success" round plain
                                   @click="reward"
                                   v-if="RewardButton && Option['Voted'] === true && Event['Report'] === true  && Option['Option'] === Event['Result'] && Option['Reward'] === false">
                            {{'奖励'}}
                        </el-button>
                    </div>
                    <div slot="Option">
                        <div v-for="(option,opId) in Event['Option']" :key="opId">
                            {{getEventOptionInfo(opId)}}
                            <el-popover
                                    placement="top-start"
                                    width="150"
                                    trigger="hover"
                                    content="点击投票。已有投票行为后只能加注相同选项！">
                                <el-button
                                        :loading="Trading"
                                        :disabled="(Option['Voted'] === true && Option['Option'] !== String(opId)) || (new Date().getTime() > parseInt(Event['Deadline'])*1000)"
                                        slot="reference"
                                        style="width: 110%;text-align:left"
                                        plain
                                        :type=" Event['Result'] === String(opId) ? 'warning':'' "
                                        @click="Vote(opId)">
                                    <!--                                    判断选项是否正确-->
                                    {{option}}<br><br>
                                    <el-progress
                                            :text-inside="true"
                                            :stroke-width="14"
                                            :percentage="percentage(opId)">
                                    </el-progress>
                                    <br>
                                    <div v-if="Option['Voted'] === true && Option['Option'] === String(opId)"
                                         style="color: #ff7f00">
                                        {{'您已投注：' + Option['Finance']}}
                                    </div>
                                </el-button>
                            </el-popover>
                        </div>
                    </div>
                    <el-table
                            slot="Voters"
                            :data="tableData"
                            style="width: 100%;"
                            :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column
                                prop="Time"
                                label="时间"
                                sortable
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="Option"
                                label="选项"
                                sortable
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="Finance"
                                label="金额"
                                sortable
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="用户地址"
                                sortable
                                :formatter="formatter">
                        </el-table-column>
                    </el-table>
                </Event>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "EventInfo",
        data() {
            return {
                Loading: true,
                Trading: false,
                ReportDialog: false,
                ReportButton: true,
                RewardButton: true,
                Hash: '',
                Address: '',
                Event: '',
                Voters: [],
                Id: this.$route.params.id,
                Option: [],
                OptionFinance: {},
                tableData: [],
            }
        },

        created: function () {
            if (typeof web3 !== 'undefined') {
                this.Address = ethereum.selectedAddress;
                this.getEvent();
                this.getVote();
            } else {
                this.axios.get('data.json').then(response => {
                    this.Event = response.data["Event"];
                    // this.Voters = this.$Deduplication(response.data["Event"]['Voters']);
                    this.Option = response.data["Option"];
                    this.OptionFinance = response.data["OptionFinance"];
                    this.tableData = response.data["tableData"];
                    this.Loading = false;
                })
            }
        },

        methods: {
            getEvent() {
                this.$Connection();
                this.$getEvent(this.Id).then(result => {
                    this.Event = result;
                    this.Loading = false;
                    this.Voters = this.$Deduplication(result['Voters']);
                    this.getRecord();
                })
            },

            getVote() {
                this.$getVote(this.Id).then(result => {
                    this.Option = result;
                })
            },

            getEventOptionInfo(Option) {
                if (typeof web3 !== 'undefined') {
                    this.$getEventOptionInfo(this.Id, Option).then(result => {
                        this.$set(this.OptionFinance, Option, parseInt(result));
                    })
                } else {
                }
            },

            getRecord() {
                this.tableData = [];
                for (let i = 0; i < this.Voters.length; i++) {
                    this.$getVote(this.Id, this.Voters[i]).then(result => {
                        this.tableData.push({
                            Time: this.$parseTime(result['Time']),
                            Option: this.Event['Option'][parseInt(result['Option'])],
                            Finance: result['Finance'],
                            address: String(this.Voters[i])
                        });
                    })
                }
            },

            Vote(opId) {
                this.$prompt('你选择的是【' + this.Event['Option'][opId] + '】,请输入投票金额', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9]*$/,
                    inputErrorMessage: '格式不正确'
                }).then(({value}) => {
                    this.$message({
                        type: 'success',
                        message: '金额是: ' + value + ',请在MetaMask中确认！'
                    });
                    this.vote(opId, value);
                }).catch((error) => {
                    console.error(error);
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            vote(opId, value) {
                this.$Connection();
                const _this = this;
                this.$Vote(this.Id, opId, parseInt(value)).on('transactionHash', function (hash) {
                    _this.notify(hash);
                    _this.Hash = hash;
                    _this.Trading = true;
                }).on('confirmation', function (confirmationNumber, receipt) {
                    // _this.notify1('验证交易：' + confirmationNumber, '', 'info')
                }).on('receipt', function (receipt) {
                    _this.notify1('成功', '交易成功', 'success');
                    _this.Trading = false;
                    _this.getEvent();
                    _this.getVote();
                }).on('error', function (error) {
                    _this.notify1('失败', '交易失败，详情见MetaMask', 'error', 0)
                });
            },

            report(option, opId) {
                this.ReportDialog = false;
                this.$message({
                    type: 'success',
                    message: '汇报结果为【' + option + '】,请在MetaMask中确认！'
                });
                const _this = this;
                this.$Report(this.Id, opId).on('transactionHash', function (hash) {
                    _this.notify(hash);
                    _this.Hash = hash;
                    _this.Trading = true;
                }).on('confirmation', function (confirmationNumber, receipt) {
                    // _this.notify1('验证交易：' + confirmationNumber, '', 'info')
                }).on('receipt', function (receipt) {
                    _this.notify1('成功', '交易成功', 'success');
                    _this.Trading = false;
                    _this.ReportButton = false;
                    _this.getEvent();
                    _this.getVote();
                }).on('error', function (error) {
                    _this.notify1('失败', '交易失败，详情见MetaMask', 'error', 0)
                });
            },

            reward() {
                this.$message({
                    type: 'success',
                    message: '请在MetaMask中确认！'
                });
                const _this = this;
                this.$Reward(this.Id).on('transactionHash', function (hash) {
                    _this.notify(hash);
                    _this.Hash = hash;
                    _this.Trading = true;
                }).on('confirmation', function (confirmationNumber, receipt) {
                    // _this.notify1('验证交易：' + confirmationNumber, '', 'info')
                }).on('receipt', function (receipt) {
                    _this.notify1('成功', '交易成功', 'success');
                    _this.Trading = false;
                    _this.RewardButton = false;
                    _this.getEvent();
                    _this.getVote();
                }).on('error', function (error) {
                    _this.notify1('失败', '交易失败，详情见MetaMask', 'error', 0)
                });
            },

            notify(value) {
                const h = this.$createElement;
                this.$notify({
                    title: '交易Hash,详情见MetaMask',
                    message: h('i', {style: 'color: teal'}, value)
                });
            },

            notify1(title, message, type, duration = 4500) {
                this.$notify({
                    title: title,
                    message: message,
                    type: type,
                    duration: duration,
                });
            },

            formatter(row, column) {
                return row.address;
            },

            percentage(opId) {
                const percentage = parseFloat((this.OptionFinance[opId] * 100 / parseInt(this.Event['PrizePool'])).toFixed(1));
                //四舍五入
                if (!isNaN(percentage)) {
                    return percentage;
                }
            }
        },
    }
</script>

<style>

</style>
