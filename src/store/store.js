import Vue from 'vue'
import Vuex from 'vuex'
import login from './login/login'
import getters from '@/store/getter/index.js'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        login,
    },
    getters: {
        ...getters
    }
})
