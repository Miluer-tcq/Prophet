<template>
    <div>
        <el-row>
            <el-col :span="24" style="margin-bottom: 20px">
                <div class="grid-content bg-purple-dark" style="height:200px">
                    <span class="bottom"><span style="font-size: 120px">{{Balance}}</span>ETH
                        <span style="margin-left: 80px">Addr:<span
                                style="font-size: 20px">{{Address}}</span></span></span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="Time"
                                label="时间"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="ID"
                                label="关联事件"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="action"
                                label="操作"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="Change"
                                label="金额变动"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="Balance"
                                label="剩余金额"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="查看事件"
                                width="200">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.action !=='CreatePlayer'" @click="handleClick(scope.row)"
                                           type="text" size="small">查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "UserInfo",
        data() {
            return {
                tableData: [],
            }
        },
        computed: {
            ...mapState(['Address', 'Balance']),
        },
        created: function () {
            this.getPlayerLogs();
        },
        methods: {
            handleClick(row) {
                this.$router.push('/EventInfo/' + row.ID);
            },
            getPlayerLogs() {
                this.$Connection()
                this.tableData = [];
                this.$getPlayerLogs().then(result => {
                    result.sort(this.sortID);
                    for (let i = 0; i < result.length; i++) {
                        this.tableData.push({
                            Time: this.$parseTime(result[i]['Time']),
                            ID: result[i]['ID'],
                            action: result[i]['action'],
                            Change: result[i]['Change'],
                            Balance: result[i]['Balance']
                        });
                        if (i === result.length - 1) {
                            this.tableData[i].ID = null;
                        }
                    }
                })
            },
            sortID(a, b) {
                return b['Time'] - a['Time'];
            },
        },
    }
</script>

<style scoped>
    .bottom {
        margin-left: 80px;
        position: absolute;
        bottom: 0
    }

    .bg-purple-dark {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        position: relative
    }
</style>
