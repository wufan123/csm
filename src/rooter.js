import VueRouter from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import indexPage from 'views/tabs/trendsPage.vue'
import complaintListPage from 'views/tabs/workOrder/index.vue'
import employeeManagePage from 'views/tabs/employeeManage/index.vue'
import suggestPage from 'views/tabs/suggest/index.vue'
import cinemaManagerPage from 'views/tabs/cinemaManager/index.vue'
import complaintReportPage from 'views/tabs/complaintReport.vue'
import operationLogPage from 'views/tabs/operationLog.vue'
import faqPage from 'views/tabs/faq/index.vue'
import positionManagePage from 'views/tabs/positionManage/index.vue'
import cinemaGroupManagePage from 'views/tabs/cinemaGroupManage/index.vue'
import cinemaManagePage from 'views/tabs/cinemaManage/index.vue'
import avatarChangePage from 'views/tabs/avatarChange.vue'
import passwordChangePage from 'views/tabs/passwordChange.vue'
import menuManagePage from 'views/tabs/menuManage/index.vue'
import portClassManagePage from 'views/tabs/portClassManage/index.vue'
import portManagePage from 'views/tabs/portManage/index.vue'


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
            return cinemaManagerPage;
        case '岗位管理':
            return positionManagePage;
        case '客诉报表':
            return complaintReportPage;
        case '操作日志':
            return operationLogPage;
        case 'FAQ录入':
            return faqPage;
        case '影院组管理':
            return cinemaGroupManagePage;
        case '菜单管理':
            return menuManagePage;
        case '影院管理':
            return cinemaManagePage;
        case '头像修改':
            return avatarChangePage;
        case '密码修改':
            return passwordChangePage;
        case '接口分类管理':
            return portClassManagePage;
        case '接口管理':
            return portManagePage;
        default:
            return undefined;
    }
};

export default router