<template>
    <div>
        <el-row v-loading="Loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部事件" name="first"></el-tab-pane>
                <el-tab-pane label="进行中" name="second"></el-tab-pane>
                <el-tab-pane label="已结束" name="third"></el-tab-pane>
                <el-tab-pane label="已汇报" name="fourth"></el-tab-pane>
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
    export default {
        data() {
            return {
                activeName: 'first',
                Loading: true,
                Current: new Date().getTime(),
                TotalEvent: 0,
                ShowEvent: [],
                AllEvents: [],
                InProgress: [],
                Finished: [],
                Reported: [],
            }
        },

        created: function () {
            if (typeof web3 !== 'undefined') {
                this.getTotalEvent();
            } else {
                this.axios.get('data.json').then(response => {
                    this.AllEvents.push(response.data["Event"]);
                    this.ShowEvent = this.Finished = this.AllEvents;
                    this.Loading = false;
                })
            }
        },

        methods: {
            getTotalEvent() {
                this.$Connection();
                this.$getTotalEvent().then(result => {
                    this.TotalEvent = parseInt(result);
                    this.Loading = false;
                    this.getAllEvent();
                })
            },

            getAllEvent() {
                for (let i = 0; i < this.TotalEvent; i++) {
                    this.getEvent(i);
                }
                this.ShowEvent = this.AllEvents;
            },

            getEvent(id) {
                this.$getEvent(id).then(result => {
                    this.AllEvents.push(result);
                    //{__ob__: observer}不可枚举问题 所以在then内部排序
                    this.AllEvents.sort(this.sortID);
                    if (this.Current < parseInt(result['Deadline']) * 1000) {
                        this.InProgress.push(result);
                        this.InProgress.sort(this.sortID);
                    } else {
                        if (result['Report'] === true) {
                            this.Reported.push(result);
                            this.Reported.sort(this.sortID);
                        } else {
                            this.Finished.push(result);
                            this.Finished.sort(this.sortID);
                        }
                    }
                })
            },

            sortID(a, b) {
                return b['ID'] - a['ID'];
            },

            handleClick(tab, event) {
                if (this.activeName === 'first') {
                    this.ShowEvent = this.AllEvents;
                } else if (this.activeName === 'second') {
                    this.ShowEvent = this.InProgress;
                } else if (this.activeName === 'third') {
                    this.ShowEvent = this.Finished;
                } else {
                    this.ShowEvent = this.Reported;
                }
            },
        }
    }
</script>

<style>

</style>
