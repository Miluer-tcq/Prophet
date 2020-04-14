import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {parseTime} from './utils/FormatTime'
import {Deduplication} from './utils/Deduplication'
import {
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
} from "./utils/getWeb3"
import Event from "./components/Event";

Vue.component('Event', Event);
Vue.prototype.$parseTime = parseTime;
Vue.prototype.$Deduplication = Deduplication;
Vue.prototype.$Connection = Connection;
Vue.prototype.$CreatePlayer = CreatePlayer;
Vue.prototype.$InitiateEvent = InitiateEvent;
Vue.prototype.$Vote = Vote;
Vue.prototype.$Report = Report;
Vue.prototype.$Reward = Reward;
Vue.prototype.$getTotalEvent = getTotalEvent;
Vue.prototype.$getEvent = getEvent;
Vue.prototype.$getEventOptionInfo = getEventOptionInfo;
Vue.prototype.$getPlayer = getPlayer;
Vue.prototype.$getVote = getVote;
Vue.prototype.$getPlayerLogs = getPlayerLogs;
Vue.prototype.axios = axios;
Vue.use(Element);
Vue.config.productionTip = false;


const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default app;
