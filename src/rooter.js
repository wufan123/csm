import VueRouter from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import indexPage from 'views/tabs/TrendsPage.vue'
import complaintListPage from 'views/tabs/complaintListPage.vue'



const routes = [
    {path: '/login', component: login},
    {path: '/home', component: home},
    { path: '*', redirect: '/login' }
];

let router = new VueRouter({
    routes
});
router.mapTabPage = tabItem =>{ //映射tabview
    switch(tabItem.name){
        case '趋势查询':
            return indexPage;
        case '客诉列表':
            return complaintListPage;
        default:
            return undefined;
    }
};

export default router