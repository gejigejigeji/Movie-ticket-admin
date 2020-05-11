import Vue from 'vue'
import store from './store/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
import power from '@/utils/power.js'
import appStyle from '@/assets/app.scss'
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
