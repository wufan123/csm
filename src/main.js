import Vue from 'vue'
import 'style/theme/index.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/tabs.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import rooter from './rooter'
import storage from 'utils/storage'
import cinemaGroupOptions from 'views/component/cinemaGroupOptions.vue'
import cinemations from 'views/component/cinemaOptions.vue'
import cinemaGroupCheckbox from 'views/component/cinemaGroupCheckbox.vue'
import qiniuImg from 'views/component/qiniuImgUpload.vue'
import froToDatePicker from 'views/component/froToDatePicker.vue'
import baseMixin from 'utils/baseMixin'
import * as util from 'utils'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('group-options', cinemaGroupOptions)
Vue.component('cinema-options', cinemations)
Vue.component('cinema-checkbox', cinemaGroupCheckbox)
Vue.component('qiniu-img', qiniuImg)
Vue.component('froto-datepicker', froToDatePicker)
Vue.mixin(baseMixin)
Vue.prototype.$storage = storage;
Vue.prototype.$util = util //工具类
window._vue = new Vue({
    el: '#app',
    router: rooter,
    render: h => h(App),
});
window._vue.$bus = new Vue();
_MOCK ? require('../src/api/mock') : ''
export default _vue;