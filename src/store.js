import Vue from 'vue'
import Vuex from 'vuex'
// import {
//   Connection,
//   getPlayer,
// } from "./utils/getWeb3"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Address: '',
        Balance: '',
        BlockNumber: '',
    },
    mutations: {
        modifyBalance(state, payload){
            state.Balance = payload['Balance'];
            state.BlockNumber = payload['BlockNumber'];
            state.Address = ethereum.selectedAddress;
        }
    },
    actions: {
        // getBalance(context) {
        //     Connection();
        //     getPlayer().then(result => {
        //         context.commit('modifyBalance', result[0])
        //     })
        // }
    }
})
