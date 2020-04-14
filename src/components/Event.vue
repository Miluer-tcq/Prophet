<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{Event["Content"]}}</span>
            </div>
            <span v-for="(option,i) in Event['Option']" :key="i" class="text item">
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<el-tag type="info" effect="plain">{{i+1}}.{{option}}</el-tag>
						</div>
					</el-col>
                </span><br>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="parseInt(width1)">
                    <div class="grid-content bg-purple" style="text-align: center">
                        <el-progress type="dashboard" :percentage="percentage(Event)" :color="Event['Report'] ? '#ff4645':colors"></el-progress>
                        <slot name="Progress"></slot>
                    </div>
                </el-col>
                <el-col :span="parseInt(width2)">
                    <div class="grid-content bg-purple">
                        {{"成交额：" + Event["PrizePool"]}}<br>
                        {{"参与人数：" + $Deduplication(Event['Voters']).length}}<br>
                        {{"开始时间：" + $parseTime(parseInt(Event["StartDate"]))}}<br>
                        {{"截至时间：" + $parseTime(parseInt(Event["Deadline"]))}}<br><br>
                        <el-button v-if="info" type="primary" @click="$router.push('/EventInfo/' + Event['ID'])">查看详情</el-button>
                        <slot name="Info"></slot>
                        <br>
                    </div>
                </el-col>
                <el-col :span="parseInt(width3)">
                    <slot name="Option"></slot>
                </el-col>
            </el-row>
            <slot name="Voters"></slot>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: ["Event", "info", 'width1', 'width2', 'width3'],
        data() {
            return {
                Current: new Date().getTime(),
                Report: true,
                colors: [
                    {color: '#6affd6', percentage: 20},
                    {color: '#79ffa8', percentage: 40},
                    {color: '#7fff72', percentage: 60},
                    {color: '#c3ff74', percentage: 80},
                    {color: '#ffe851', percentage: 100},
                    {color: '#ffb450', percentage: 101}
                ],
            }
        },

        methods: {
            percentage(item) {
                let startDate = parseInt(item["StartDate"]) * 1000;
                let deadline = parseInt(item["Deadline"]) * 1000;
                let percentage = parseInt((this.Current - startDate) / (deadline - startDate) * 100);
                if (percentage > 100) {
                    return 100;
                }
                return percentage;
            },
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }
</style>
