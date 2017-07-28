import Vue from 'vue'
import 'style/theme/index.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/tabs.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import rooter from  './rooter'
import storage from  'utils/storage'
import 'utils/dateUtils'



Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$storage = storage;

const vueApp= new Vue({
    el: '#app',
    router: rooter,
    render: h => h(App),
});

_MOCK?require('../src/api/mock'):''
export  default vueApp;
