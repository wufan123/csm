import VueRouter from 'vue-router'
import login from './views/login.vue'
import main from './views/main.vue'
import index from './views/tabs/indexPage.vue'


const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/tabs', component: index},
    {
        path: '/main', component: main,
        children: [
            {path: 'index', component: index}
        ]
    }
];

const router = new VueRouter({
    routes
});


export default router