import Vue from 'vue'
import App from './App'
import store from './store'

import configService from '@/utils/config.js'

//import http from '@/utils/request.js'
import tip from '@/utils/tip.js'

Vue.config.productionTip = false

//Vue.prototype.$http = http;
Vue.prototype.$config = configService;
Vue.prototype.$store = store;
Vue.prototype.$tip = tip;
//console.log(http);

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount();
