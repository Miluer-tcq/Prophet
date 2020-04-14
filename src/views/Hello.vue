<template>
    <div>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 10px">
            <el-step title="介绍"></el-step>
            <el-step title="连接"></el-step>
            <el-step title="开始"></el-step>
        </el-steps>
        <div style="text-align: left;margin-top: 40px;margin-left: 100px">
            <el-container>
                <el-aside width="200px">
                    <img v-show="active === 0" src="../assets/logo.png" height="200" width="200"/>
                    <img v-show="active === 1" src="../assets/mm-logo.svg" height="200" width="200"/>
                    <video v-show="active === 2" src="../assets/ethereum-hero-light.mp4" playsinline
                           autoplay="autoplay" loop="loop" muted="muted" height="200" width="200"></video>
                    <img src="../assets/Prophet.png" height="200" width="200"/>
                </el-aside>
                <el-main>
                    <div style="margin-left: 100px">
                        <div v-show="active === 0">
                            <h1>Prophet是什么？</h1>
                            <p>Prophet是基于<a href="https://ethereum.org/" target="_blank"
                                            style="color: cornflowerblue"><strong>以太坊(Ethereum)</strong></a>区块链智能合约的<strong>投票预测平台</strong>。
                            </p>
                            <p>网页展示由<a href="https://cn.vuejs.org/" target="_blank" style="color: #42b983"><strong>Vue.js</strong></a>和<a
                                    href="https://github.com/ethereum/web3.js/" target="_blank"
                                    style="color: #42b983"><strong>Web3.js</strong></a>等框架搭建。</p>
                            <p>旨在于提供一个去中心化的数据交互方式,用户的投票纪录将<strong>不可篡改</strong>地保存在区块链中。</p>
                            <p>用户在有<strong>成本制约</strong>的投票行为下，整体投票结果将对预测事件未来发展具有可靠的参考意义。</p>
                            <p style="color: #ff3508">注：考虑到外网环境因素，平台采用MetaMask插件在国内网络环境接入以太坊。</p>
                            <p style="color: #ff3508">如不方便安装，可直接访问左侧<strong style="color: #4e4949">概览</strong>查看演示事件，或访问<a
                                    href="https://gitee.com/t940783074/Prophet"
                                    target="_blank">Gitee</a>查看项目介绍。</p>
                            <el-button style="margin-top: 12px;" type="warning" @click="next">下一步</el-button>
                        </div>
                        <div v-show="active === 1">
                            <h1>连接区块链</h1>
                            <p>Prophet使用<a href="https://MetaMask.io/" target="_blank"
                                           style="color: #ff7f51"><strong>MetaMask</strong></a>浏览器插件作为网页(Web3.js)与区块链的通信桥梁。
                            </p>
                            <p>在浏览器安装MetaMask后，使用MetaMask生成一个以太坊账号并选择<strong>Ropsten测试网络</strong>。</p>
                            <p>由于任何写入以太坊区块链数据的操作都需要支付ETH手续费，因此可在<a href="https://faucet.MetaMask.io/" target="_blank"
                                                                   style="color: #ff7f51"><strong>Ether Faucet</strong></a>中获取用于测试的ETH。
                            </p>
                            <p>(当前Prophet处于测试阶段，暂未上线需要消耗真正价值ETH数字货币的主网)</p>
                            <el-button style="margin-top: 12px;" type="success" @click="active = 0">返回上一步</el-button>
                            <el-button style="margin-top: 12px;" type="warning" @click="next">下一步</el-button>
                        </div>
                        <div v-show="active === 2">
                            <h1>开始投票</h1>
                            <p>点击<strong>网页右上角头像</strong>使MetaMask对Prophet进行操作授权，随后可<strong>创建用户</strong>。</p>
                            <p>此时Prophet将展示区块链的所有投票事件信息，用户可选择事件进行投票。</p>
                            <p>如果部分用户的投票选择与事件最终的<strong>实际结果一致</strong>，便能按比例分配奖池中的代币。</p>
                            <p>用户同时可<strong>消耗</strong>一定数量代币创建一个事件发布给全体用户进行投票。</p>
                            <p>Prophet的所有投票数据均在<strong style="color:cornflowerblue">以太坊(Ethereum)</strong>公开给任何机构和个人用于事件预测。
                            </p>
                            <el-button style="margin-top: 12px;" type="success" @click="active = 1">返回上一步</el-button>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },

        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
    h1 {
        font-size: 32px
    }

    p {
        font-size: 16px
    }
</style>
