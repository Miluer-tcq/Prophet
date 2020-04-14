<template>
    <el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>事件信息</span>
            </div>
            <div class="text item">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px"
                         class="demo-dynamic">
                    <el-form-item
                            prop="name"
                            label="事件内容"
                            :rules="[
                                { required: true, message: '请输入事件内容', trigger: 'blur' },
                                { type: 'string', message: '请输入正确的事件内容', trigger: ['blur', 'change'] }]"
                    >
                        <el-input v-model="dynamicValidateForm.name" style="width: 100%"></el-input>
                    </el-form-item>
                    <el-form-item
                            v-for="(option, index) in dynamicValidateForm.option"
                            :label="'选项' + (index + 1)"
                            :key="option.key"
                            :prop="'option.' + index + '.value'"
                            :rules="{
                                required: true, message: '选项不能为空', trigger: 'blur'}"
                    >
                        <div>
                            <el-input v-model="option.value" style="width: 88%"></el-input>
                            <el-button v-show="index > 1" @click.prevent="removeOption(option)">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="截至时间" required>
                        <el-col :span="11">
                            <el-form-item
                                    prop="date"
                                    :rules="[
                                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }]"
                            >
                                <el-date-picker type="datetime"
                                                placeholder="选择日期时间"
                                                v-model="dynamicValidateForm.date"
                                                :picker-options="pickerOptions"
                                                style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                            prop="addr"
                            label="汇报人地址"
                            :rules="[
                                { required: true, message: '请输入汇报人地址', trigger: 'blur' },
                                { min: 42, max: 42, message: '地址为42位', trigger: 'blur' }]"
                    >
                        <el-input v-model="dynamicValidateForm.addr" style="width: 100%"></el-input>
                        <div style="color: #ff7f00">{{"*默认为创建者地址,指定给不存在的用户地址将创建失败！"}}</div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="Trading" @click="submitForm('dynamicValidateForm')">提交</el-button>
                        <el-button @click="addOption">新增选项</el-button>
                        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                        <span style="margin-left: 20px" v-if="Trading">
                            <el-link :href="'https://ropsten.etherscan.io/tx/'+Hash"
                                     type="primary"
                                     target="_blank">交易正在确认中。。。</el-link>
                        </span>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                Trading: false,
                Hash: '',
                dynamicValidateForm: {
                    option: [{
                        value: ''
                    }, {
                        value: ''
                    }],
                    name: '',
                    date: '',
                    addr: typeof ethereum !== 'undefined'? ethereum.selectedAddress:null,
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一个月后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 31);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            };
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认创建？').then(_ => {
                            const content = this.dynamicValidateForm.name;
                            const option = [];
                            const Validity = parseInt((this.dynamicValidateForm.date.getTime() - new Date().getTime()) / 1000);
                            const addr = this.dynamicValidateForm.addr;
                            for (let i = 0; i < this.dynamicValidateForm.option.length; i++) {
                                option.push(this.dynamicValidateForm.option[i]['value'])
                            }
                            this.InitiateEvent(content, option, Validity, addr);
                            this.resetForm(formName);
                        });
                    } else {
                        console.log('错误提交！');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeOption(item) {
                const index = this.dynamicValidateForm.option.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.option.splice(index, 1)
                }
            },
            addOption() {
                this.dynamicValidateForm.option.push({
                    value: '',
                    key: Date.now()
                });
            },
            InitiateEvent(content, option, Validity, addr) {
                this.$Connection();
                const _this = this;
                this.$InitiateEvent(content, option, Validity, addr).on('transactionHash', function (hash) {
                    _this.notify(hash);
                    _this.Hash = hash;
                    _this.Trading = true;
                }).on('confirmation', function (confirmationNumber, receipt) {
                    // _this.notify1('验证交易：' + confirmationNumber, '', 'info')
                }).on('receipt', function (receipt) {
                    _this.notify1('成功', '交易成功', 'success');
                    _this.Trading = false;
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

    .demo-dynamic {
        width: 60%;
    }
</style>
