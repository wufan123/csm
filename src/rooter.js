import VueRouter from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'


const routes = [
    {path: '/login', component: login},
    {path: '/home', component: home},
    { path: '*', redirect: '/home' }
];

const router = new VueRouter({
    routes
});


export default router