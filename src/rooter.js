import VueRouter from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import indexPage from 'views/tabs/TrendsPage.vue'
import complaintListPage from 'views/tabs/complaintListPage.vue'
import employeeManagePage from 'views/tabs/employeeManage/index.vue'
import positionManagePage from 'views/tabs/positionManage/index.vue'




const routes = [
    { path: '/login', component: login },
    { path: '/home', component: home },
    { path: '*', redirect: '/login' }
];

let router = new VueRouter({
    routes
});
router.mapTabPage = tabItem => { //映射tabview
    switch (tabItem.name) {
        case '趋势查询':
            return indexPage;
        case '客诉列表':
            return complaintListPage;
        case '职员管理':
            return employeeManagePage;
        case '岗位管理':
            return positionManagePage;

        default:
            return undefined;
    }
};

export default router