import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account.js'
import alert from './modules/alert.js'
import crud from './modules/crud.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    account,
    crud
  },
});
