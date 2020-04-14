<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo logo-width">
                <el-button @click="$router.push('/')" type="text" style="font-size: 25px;color: white">{{sysName}}
                </el-button>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-popover
                        placement="bottom"
                        width="400"
                        trigger="click">
                    <el-row v-loading="Loading">
                        <div style="text-align: center" class="omission">{{'地址：' + Address}}</div>
                        <div style="text-align: center">{{'当前区块链高度：' + BlockNumber}}</div>
                        <div style="text-align: center">{{'余额：' + Balance}}</div>
                        <div style="text-align: center">
                            <el-button v-if="!created" type="primary" size="medium" :loading="Trading"
                                       @click="CreatePlayer"
                                       round plain>创建用户
                            </el-button>
                            <el-link v-if="created" type="primary" @click="$router.push('/UserInfo')">更多信息</el-link>
                        </div>
                    </el-row>
                    <span slot="reference" class="el-dropdown-link userinfo-inner">
                        <img @click="getBalance"
                             src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                        <el-button v-if="Address !== ''"
                                   slot="reference"
                                   type="success"
                                   icon="el-icon-check"
                                   circle
                                   size="mini">{{"已连接"}}</el-button>
					</span>
                </el-popover>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class='menu-expanded'>
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen"
                         @close="handleclose" @select="handleselect" unique-opened router>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                          v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                                :class="item.iconCls"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        data() {
            return {
                sysName: 'Prophet',
                Loading: true,
                created: true,
                Hash: '',
                Trading: false
                // Address: ethereum.selectedAddress,
                // Balance:'',
            }
        },
        computed: {
            ...mapState(['Address', 'Balance', 'BlockNumber']),
        },
        created: function () {
        },
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },

            ...mapMutations(['modifyBalance']),
            // ...mapActions(['getBalance']),
            getBalance() {
                let WEB3 = this.$Connection();
                this.$getPlayer().then(result => {
                    WEB3.eth.getBlockNumber().then(Number => {
                        this.modifyBalance({'Balance': result[0], 'BlockNumber': Number})
                    });
                });
                this.getPlayerLogs();
            },
            getPlayerLogs() {
                this.$getPlayerLogs().then(result => {
                    this.created = result.length !== 0;
                    this.Loading = false
                })
            },
            CreatePlayer() {
                const _this = this;
                this.$CreatePlayer().on('transactionHash', function (hash) {
                    _this.notify(hash);
                    _this.Hash = hash;
                    _this.Trading = true;
                }).on('confirmation', function (confirmationNumber, receipt) {
                    // _this.notify1('验证交易：' + confirmationNumber, '', 'info')
                }).on('receipt', function (receipt) {
                    _this.notify1('成功', '交易成功', 'success');
                    _this.Trading = false;
                    _this.created = true;
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
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    _this.$router.push('/login');
                }).catch(() => {

                });


            },
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    .omission {
    }

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;

        .header {
            height: 60px;
            line-height: 60px;
            background: #545c64;
            color: #fff;

            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;

                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                        background-color: #475669;
                    }
                }
            }

            .logo {
                //width:230px;
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;

                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }

                .txt {
                    color: #fff;
                }
            }

            .logo-width {
                width: 230px;
            }
        }

        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;

            aside {
                flex: 0 0 230px;
                width: 230px;

                .el-menu {
                    height: 100%;
                }

                .collapsed {
                    width: 60px;

                    .item {
                        position: relative;
                    }

                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }

            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;

                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
