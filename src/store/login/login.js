import {getCookie,setCookie} from '@/utils/cookie.js'

export default {
    state: {
        token:null
    },
    mutations: {
        setToken(state,n) {
            setCookie('token', n, 1);
            state.token = n;
        }
    },
    actions: {
        setToken({commit},data) {
            commit('setToken',data)
        }
    }
}