import Vue from 'vue'
import './style/theme/index.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/tabs.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import rooter from  './rooter'
import storage from  './utils/storage'
// import indexPage from './views/tabs/indexPage.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);
// Vue.component("index-page",indexPage);

Vue.prototype.$storage = storage;

const vueApp= new Vue({
    el: '#app',
    router: rooter,
    render: h => h(App)
});
export  default vueApp;
