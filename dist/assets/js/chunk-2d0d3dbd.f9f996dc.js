(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3dbd"],{"5f0f":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-page-header",{attrs:{content:"详情页面"},on:{back:function(e){return t.$router.go(-1)}}}),n("br"),n("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading,expression:"Loading"}]},[""!==t.Event?n("div",[n("Event",{attrs:{Event:t.Event,width1:"4",width2:"6",width3:"12"}},[n("div",{attrs:{slot:"Progress"},slot:"Progress"},[(new Date).getTime()<1e3*parseInt(t.Event["Deadline"])?n("el-alert",{attrs:{closable:!1,title:"投票进行中",type:"success",description:"到达截至日期后关闭投票入口"}}):t._e(),(new Date).getTime()>1e3*parseInt(t.Event["Deadline"])&&!1===t.Event["Report"]&&t.Event["Reporter"].toUpperCase()!==t.Address.toUpperCase()?n("el-alert",{attrs:{closable:!1,title:"投票已结束",type:"info",description:"等待汇报人汇报结果后开启奖励入口"}}):t._e(),(new Date).getTime()>1e3*parseInt(t.Event["Deadline"])&&!1===t.Event["Report"]&&t.Event["Reporter"].toUpperCase()===t.Address.toUpperCase()?n("el-alert",{attrs:{closable:!1,title:"投票已结束",type:"info",description:"您是汇报人,请如实汇报结果！"}}):t._e(),!0===t.Option["Voted"]&&!0===t.Event["Report"]&&t.Option["Option"]===t.Event["Result"]&&!1===t.Option["Reward"]?n("el-alert",{attrs:{closable:!1,title:"事件已汇报",type:"warning",description:"恭喜您预测成功,可以申请奖励！"}}):t._e(),!0===t.Option["Reward"]?n("el-alert",{attrs:{closable:!1,title:"事件已汇报",type:"warning",description:"恭喜您预测成功,您已申请奖励！"}}):t._e(),!0===t.Option["Voted"]&&!0===t.Event["Report"]&&t.Option["Option"]!==t.Event["Result"]?n("el-alert",{attrs:{closable:!1,title:"事件已汇报",type:"error",description:"很遗憾您预测失败,再接再厉吧！"}}):t._e(),!0===t.Event["Report"]&&!0!==t.Option["Voted"]?n("el-alert",{attrs:{closable:!1,title:"事件已汇报",type:"info",description:"预测成功的账号可以进行奖励申请"}}):t._e()],1),n("div",{attrs:{slot:"Info"},slot:"Info"},[n("el-popover",{attrs:{placement:"right",width:"400",trigger:"click"}},[t._v("\n                        "+t._s("发起人："+t.Event["Sponsor"])),n("br"),t._v("\n                        "+t._s("汇报人："+t.Event["Reporter"])),n("br"),t._v("\n                        "+t._s("汇报状态："+t.Event["Report"])),n("br"),n("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("更多信息")])],1),t.Trading?n("span",{staticStyle:{"margin-left":"20px"}},[n("el-link",{attrs:{href:"https://ropsten.etherscan.io/tx/"+t.Hash,type:"primary",target:"_blank"}},[t._v("交易正在确认中。。。")])],1):t._e(),n("br"),n("br"),t.ReportButton&&t.Event["Reporter"].toUpperCase()===t.Address.toUpperCase()&&(new Date).getTime()>1e3*parseInt(t.Event["Deadline"])&&!1===t.Event["Report"]?n("el-button",{attrs:{loading:t.Trading,type:"warning",round:"",plain:""},on:{click:function(e){t.ReportDialog=!0}}},[t._v("\n                        "+t._s("汇报结果")+"\n                    ")]):t._e(),n("el-dialog",{attrs:{title:"确认汇报结果",visible:t.ReportDialog,width:"30%",top:"30vh"},on:{"update:visible":function(e){t.ReportDialog=e}}},[t._l(t.Event["Option"],function(e,o){return n("el-button",{key:o,staticStyle:{"margin-right":"20px"},attrs:{type:"warning",plain:"",round:""},on:{click:function(n){return t.report(e,o)}}},[t._v("\n                            "+t._s(e)+"\n                        ")])}),n("br"),n("br"),n("br"),n("div",{staticStyle:{color:"#ff5e21"}},[t._v(t._s("*请如实汇报事件结果，用户可对汇报进行质疑"))])],2),t.RewardButton&&!0===t.Option["Voted"]&&!0===t.Event["Report"]&&t.Option["Option"]===t.Event["Result"]&&!1===t.Option["Reward"]?n("el-button",{attrs:{loading:t.Trading,type:"success",round:"",plain:""},on:{click:t.reward}},[t._v("\n                        "+t._s("奖励")+"\n                    ")]):t._e()],1),n("div",{attrs:{slot:"Option"},slot:"Option"},t._l(t.Event["Option"],function(e,o){return n("div",{key:o},[t._v("\n                        "+t._s(t.getEventOptionInfo(o))+"\n                        "),n("el-popover",{attrs:{placement:"top-start",width:"150",trigger:"hover",content:"点击投票。已有投票行为后只能加注相同选项！"}},[n("el-button",{staticStyle:{width:"110%","text-align":"left"},attrs:{slot:"reference",loading:t.Trading,disabled:!0===t.Option["Voted"]&&t.Option["Option"]!==String(o)||(new Date).getTime()>1e3*parseInt(t.Event["Deadline"]),plain:"",type:t.Event["Result"]===String(o)?"warning":""},on:{click:function(e){return t.Vote(o)}},slot:"reference"},[t._v("\n                                "+t._s(e)),n("br"),n("br"),n("el-progress",{attrs:{"text-inside":!0,"stroke-width":14,percentage:t.percentage(o)}}),n("br"),!0===t.Option["Voted"]&&t.Option["Option"]===String(o)?n("div",{staticStyle:{color:"#ff7f00"}},[t._v("\n                                    "+t._s("已投注："+t.Option["Finance"])+"\n                                ")]):t._e()],1)],1)],1)}),0),n("el-table",{staticStyle:{width:"100%"},attrs:{slot:"Voters",data:t.tableData,"default-sort":{prop:"date",order:"descending"}},slot:"Voters"},[n("el-table-column",{attrs:{prop:"Time",label:"时间",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"Option",label:"选项",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"Finance",label:"金额",sortable:"",width:"180"}}),n("el-table-column",{attrs:{prop:"address",label:"用户地址",sortable:"",formatter:t.formatter}})],1)],1)],1):t._e()])],1)},i=[],r={name:"EventInfo",data:function(){return{Loading:!0,Trading:!1,ReportDialog:!1,ReportButton:!0,RewardButton:!0,Hash:"",Address:ethereum.selectedAddress,Event:"",Voters:[],Id:this.$route.params.id,Option:[],OptionFinance:{},tableData:[]}},created:function(){this.getEvent(),this.getVote()},methods:{getEvent:function(){var t=this;this.$Connection(),this.$getEvent(this.Id).then(function(e){t.Event=e,t.Loading=!1,t.Voters=t.$Deduplication(e["Voters"]),t.getRecord()})},getVote:function(){var t=this;this.$getVote(this.Id).then(function(e){t.Option=e})},getEventOptionInfo:function(t){var e=this;this.$getEventOptionInfo(this.Id,t).then(function(n){e.$set(e.OptionFinance,t,parseInt(n))})},getRecord:function(){var t=this;this.tableData=[];for(var e=function(e){t.$getVote(t.Id,t.Voters[e]).then(function(n){t.tableData.push({Time:t.$parseTime(n["Time"]),Option:t.Event["Option"][parseInt(n["Option"])],Finance:n["Finance"],address:String(t.Voters[e])})})},n=0;n<this.Voters.length;n++)e(n)},Vote:function(t){var e=this;this.$prompt("你选择的是【"+this.Event["Option"][t]+"】,请输入投票金额","确认",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[0-9]*$/,inputErrorMessage:"格式不正确"}).then(function(n){var o=n.value;e.$message({type:"success",message:"金额是: "+o+",请在MetaMask中确认！"}),e.vote(t,o)}).catch(function(t){console.error(t),e.$message({type:"info",message:"取消输入"})})},vote:function(t,e){this.$Connection();var n=this;this.$Vote(this.Id,t,parseInt(e)).on("transactionHash",function(t){n.notify(t),n.Hash=t,n.Trading=!0}).on("confirmation",function(t,e){}).on("receipt",function(t){n.notify1("成功","交易成功","success"),n.Trading=!1,n.getEvent(),n.getVote()}).on("error",function(t){n.notify1("失败","交易失败，详情见MetaMask","error",0)})},report:function(t,e){this.ReportDialog=!1,this.$message({type:"success",message:"汇报结果为【"+t+"】,请在MetaMask中确认！"});var n=this;this.$Report(this.Id,e).on("transactionHash",function(t){n.notify(t),n.Hash=t,n.Trading=!0}).on("confirmation",function(t,e){}).on("receipt",function(t){n.notify1("成功","交易成功","success"),n.Trading=!1,n.ReportButton=!1,n.getEvent(),n.getVote()}).on("error",function(t){n.notify1("失败","交易失败，详情见MetaMask","error",0)})},reward:function(){this.$message({type:"success",message:"请在MetaMask中确认！"});var t=this;this.$Reward(this.Id).on("transactionHash",function(e){t.notify(e),t.Hash=e,t.Trading=!0}).on("confirmation",function(t,e){}).on("receipt",function(e){t.notify1("成功","交易成功","success"),t.Trading=!1,t.RewardButton=!1,t.getEvent(),t.getVote()}).on("error",function(e){t.notify1("失败","交易失败，详情见MetaMask","error",0)})},notify:function(t){var e=this.$createElement;this.$notify({title:"交易Hash,详情见MetaMask",message:e("i",{style:"color: teal"},t)})},notify1:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4500;this.$notify({title:t,message:e,type:n,duration:o})},formatter:function(t,e){return t.address},percentage:function(t){var e=parseFloat((100*this.OptionFinance[t]/parseInt(this.Event["PrizePool"])).toFixed(1));if(!isNaN(e))return e}}},a=r,s=n("2877"),l=Object(s["a"])(a,o,i,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0d3dbd.f9f996dc.js.map