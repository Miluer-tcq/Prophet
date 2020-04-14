<template>
    <div>
        <el-row v-loading="Loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的投票" name="first"></el-tab-pane>
                <el-tab-pane label="我的创建" name="second"></el-tab-pane>
                <el-tab-pane name="third">
                    <span slot="label">我待汇报<el-badge v-if="ReportEvent.length !== 0" :value="ReportEvent.length"
                                                     class="item"></el-badge></span>
                </el-tab-pane>
                <el-tab-pane label="我已汇报" name="fourth"></el-tab-pane>
            </el-tabs>
            <el-row :gutter="20">
                <div v-for="(Event,id) in ShowEvent" :key="id">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <Event :Event='Event' info="true" width1="10" width2="14"/>
                        </div>
                    </el-col>
                </div>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "Oneself",
        data() {
            return {
                activeName: 'first',
                Loading: true,
                Address: typeof ethereum !== 'undefined'? ethereum.selectedAddress:null,
                TotalEvent: [],
                ShowEvent: [],
                SelectedEvent: [],
                CreatedEvent: [],
                ReportEvent: [],
                Reported: [],
            }
        },

        created: function () {
            if (typeof web3 !== 'undefined') {
                this.getPlayerEvent();
            } else {
                this.Loading = false;
            }
        },

        methods: {
            getPlayerEvent() {
                this.$Connection();
                this.$getPlayer().then(result => {
                    this.TotalEvent = result;
                    this.Loading = false;
                    this.getAllEvent();
                })
            },

            getAllEvent() {
                let Selected = this.$Deduplication(this.TotalEvent[1]);
                let Created = this.$Deduplication(this.TotalEvent[2]);
                let Report = this.$Deduplication(this.TotalEvent[3]);
                for (let i = 0; i < Selected.length; i++) {
                    this.getEvent(parseInt(Selected[i]), 'SelectedEvent');
                }
                for (let i = 0; i < Created.length; i++) {
                    this.getEvent(parseInt(Created[i]), 'CreatedEvent');
                }
                for (let i = 0; i < Report.length; i++) {
                    this.getEvent(parseInt(Report[i]), 'ReportEvent');
                }
                this.ShowEvent = this.SelectedEvent;
            },

            getEvent(id, means) {
                this.$getEvent(id).then(result => {
                    if (means === 'SelectedEvent') {
                        this.SelectedEvent.push(result);
                        this.SelectedEvent.sort(this.sortID);
                    } else if (means === 'CreatedEvent') {
                        this.CreatedEvent.push(result);
                        this.CreatedEvent.sort(this.sortID);
                    } else if (means === 'ReportEvent') {
                        if (result['Report'] === false) {
                            this.ReportEvent.push(result);
                            this.ReportEvent.sort(this.sortID);
                        } else {
                            this.Reported.push(result);
                            this.Reported.sort(this.sortID);
                        }
                    }
                })
            },

            sortID(a, b) {
                return b['ID'] - a['ID'];
            },

            handleClick(tab, event) {
                if (this.activeName === 'first') {
                    this.ShowEvent = this.SelectedEvent;
                } else if (this.activeName === 'second') {
                    this.ShowEvent = this.CreatedEvent;
                } else if (this.activeName === 'third') {
                    this.ShowEvent = this.ReportEvent;
                } else {
                    this.ShowEvent = this.Reported;
                }
            }
        }
    }
</script>

<style scoped>

</style>
