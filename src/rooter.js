import VueRouter from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import indexPage from 'views/tabs/TrendsPage.vue'
import complaintListPage from 'views/tabs/complaint/index.vue'
import employeeManagePage from 'views/tabs/employeeManage/index.vue'
import suggestPage from 'views/tabs/suggest/index.vue'
import cinemaManagePage from 'views/tabs/cinemaManage/index.vue'
import positionManagePage from 'views/tabs/positionManage/index.vue'
import cinemaGroupManagePage from 'views/tabs/cinemaGroupManage/index.vue'
import menuManagePage from 'views/tabs/menuManage/index.vue'

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
        case '建议列表':
            return suggestPage;
        case '运营人员管理':
            return cinemaManagePage;
        case '岗位管理':
            return positionManagePage;
        case '影院组管理':
            return cinemaGroupManagePage;
        case '菜单管理':
            return menuManagePage;
        default:
            return undefined;
    }
};

export default router