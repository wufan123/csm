<template xmlns="http://www.w3.org/1999/html">
    <div id="main">
        <el-row class="main-header">
            <el-col :span="3" class="logo">
                <div class="logo"></div>
            </el-col>
            <el-col :span="21" class="logo">
                <el-menu theme="dark" mode="horizontal" default-active="0"
                         @select="topMenuSelect">
                    <el-menu-item v-for="(item, index) in topMenus" :index='index.toString()'
                                  :key="item.name">{{item.name}}
                    </el-menu-item>
                    <el-submenu index="submenu">
                        <template slot="title"><img class="avatar" v-bind:src="headImageLink"
                                                    :onerror="errorImg"/>{{fullName}}
                        </template>
                        <el-menu-item index="submenu-1">修改头像</el-menu-item>
                        <el-menu-item index="submenu-2">修改密码</el-menu-item>
                        <el-menu-item index="submenu-3">安全退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="main-body">
            <el-row>
                <el-col :span="3" class="slide-menu">
                    <el-menu>
                        <el-submenu v-for="(item,index) in subMenus"
                                    :index="index.toString()" :name="index.toString()" :key="item.name">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item v-for="(subItem,subIndex) in item.childMenus"
                                          :index="index.toString()+'-'+subIndex.toString()" :key="subItem.name"
                                          v-on:click="sideMenuClick(subItem)">{{subItem.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="21">
                    <el-tabs v-model="currentTabId" type="card" closable @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item, index) in menuTabs"
                                :key="item.id"
                                :label="item.name"
                                :name="item.id.toString()"
                        >
                            <component v-bind:is="item.page" v-on:goOtherTab="showTabByName"
                                       :tabForm="item.tabForm"></component>
                        </el-tab-pane>
                    </el-tabs>
                    <p class="copyright">Copyright 2014-2015 福州最美影视网络科技有限公司 版权所有 4008-12345678  </p>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
    import indexPage from 'views/tabs/TrendsPage.vue'
    import complaintListPage from 'views/tabs/workOrder/index.vue'
    import loginApi from 'api/loginApi'
    import rooter from  '~/rooter'//
    export default{
        data(){
            this.userDetail = this.$storage.getItem(this.$storage.KEY_USER_DETAIL)
            let topMenus = [], subMenus = [], menus = [], menuTabs = [], fullName = '', headImageLink = ''
            if (!this.userDetail) {
                this.$router.push({path: 'login'})
            } else {
                topMenus = this.userDetail.sortedMenus
                if (topMenus.length > 0) {
                    subMenus = topMenus[0].childMenus
                }
                fullName = this.userDetail.fullName
                headImageLink = this.userDetail.headImageLink
                menus = this.userDetail.menus
            }
            return {
                fullName: fullName,
                headImageLink: headImageLink,
                errorImg: 'this.src=""',
                currentTabId: '',
                menuTabs: menuTabs,
                topMenus: topMenus,
                subMenus: subMenus,
                menus: menus,
                notifyList: []
            }
        },
        methods: {
            logout(){
                loginApi.logout({
                    userId: this.userDetail.id
                }).then((response) => {
                    window._nim.disconnect();
                    this.$router.push({path: 'login'})
                })
            },
            topMenuSelect(key) {
//                this.onCustomSysmsg();

                if (key.indexOf('submenu') === -1) //
                {
                    this.subMenus = this.topMenus[key].childMenus
                } else {
                    switch (key) {
                        case 'submenu-1':
                            this.showTabByName({
                                name: '头像修改'
                            })
                            break;
                        case 'submenu-2':
                            this.showTabByName({
                                name: '密码修改'
                            })
                            break;
                        case 'submenu-3':
                            this.logout();
                            break;
                    }
                }
            },
            sideMenuClick(item){
                this.showSelectTab(item)
            },
            showSelectTab(item){
                this.currentTabId = item.id.toString();
                for (let i in this.menuTabs) {
                    if (item.id === this.menuTabs[i].id) {
                        return;
                    }
                }
                item.page = rooter.mapTabPage(item)
                this.menuTabs.push(item)
            },
            showTabByName(targetTab){
                for (let i in  this.menus) {
                    if (this.menus[i].name == targetTab.name) {
                        this.menus[i].tabForm = targetTab.tabForm
                        this.showSelectTab(this.menus[i])
                    }
                }

            },
            onCustomSysmsg(sysMsg){
                if (!("Notification" in window)) {
                    this.$message({
                        message: '不支持桌面通知,请使用谷歌浏览器',
                        type: 'error'
                    })
                    return
                }
                if (Notification.permission === 'denied') {
                    Notification.requestPermission(function (permission) {
                        if (permission !== "granted") {
                            this.$message({
                                message: '无桌面通知权限,请开启权限',
                                type: 'error'
                            })
                        }
                    });
                    return
                }
                for (let i = 0; i < this.notifyList.length; i++) {
                    if (sysMsg.time == this.notifyList[i].time) {
                        return
                    }
                }
                this.notifyList.push(sysMsg);
                let n = new Notification("您有新的工单", {
                    icon: '',
                    body: '有新的工单需要处理,请您尽快处理'
                });
                let vm = this
                n.onclick = () => {
                    self.focus();
                    vm.showTabByName({name: '客诉列表'})
                    console.log(vm.currentTabId)
                    n.close()
                }
            },
            removeTab(targetId) {//关闭tab标签
                let tabs = this.menuTabs;
                let activeId = this.currentTabId;
                if (activeId == targetId) {
                    tabs.forEach((tab, index) => {
                        if (tab.id == targetId) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeId = nextTab.id;
                            }
                        }
                    });
                }
                this.currentTabId = activeId.toString();
                this.menuTabs = tabs.filter(tab => tab.id.toString() != targetId);
            },
            viewReady(){
                let vm = this;
                if (!this.userDetail)
                    return
                this.showTabByName({name: '趋势查询'})
                if (!window._nim) {
                    window._nim = NIM.getInstance({//初始化im
                        appKey: this.userDetail.appKey,
                        account: this.userDetail.accid,
                        token: this.userDetail.token,
                        onconnect: () => {
                            console.log('IM连接成功');
                        },
                        onwillreconnect: obj => {
                            console.log('IM即将重连');
                            console.log(obj.retryCount);
                            console.log(obj.duration);
                        },
                        onerror: error => {

                        },
                        onmsg: msg => {
                            console.log('IM收到消息', msg.scene, msg.type, msg);
                            try {
                                msg.custom = JSON.parse(msg.custom)
                            }
                            catch (e) {
                            }
                            if (!msg.custom)
                                msg.custom = {}
                            if (window._nim) {
                                switch (msg.type) {
                                    case "text":
                                    case "image":
                                        if (window._nim.onMsg) {
                                            window._nim.onMsg(msg)
                                        }
                                        break;
                                    case "notification":
                                        if (window._nim.onNoti) {
                                            window._nim.onNoti(msg)
                                        }
                                        break;
                                }
                            }


                        },
                        onsysmsg: sysMsg => {
                            console.log('IM收到系统通知', sysMsg)
                        },
                        oncustomsysmsg: sysMsg => {
                            console.log('IM收到自定义系统通知', sysMsg)
                            vm.onCustomSysmsg(sysMsg)
                        },
                        ondisconnect: error => {
                            console.log('IM断开连接', error)
                        }
                    })
                } else {

                    window._nim.setOptions({
                        account: this.userDetail.accid,

                    });
                    window._nim.connect();
                }

            },
        },

    }
</script>
<style lang="less">
    @import "~style/base-variables";

    #main {
        height: 100%;
        .logo {
            display: inline-block;
            height: 70px;
            background: url("~assets/image/main/main_logo.png") no-repeat center;
            background-size: cover;
        }
        .avatar {
            height: 24px;
            width: 24px;
            border-radius: 12px;
            vertical-align: middle;
            background: @color-base-bg;
            margin-right: 8px;
        }
        .main-body {
            height: calc(~"100% - 70px");;
            > .el-row {
                height: 100%;
                > .el-col {
                    height: 100%;
                    .el-tabs {
                        padding-top: 6px;
                        height: calc(~"100% - 46px");
                        .el-tabs__header {
                            padding: 0 44px 0 44px;
                        }
                        .el-tabs__content {
                            height: calc(~"100% - 40px");
                            overflow-y: auto;
                        }
                        .el-tabs__item {
                            font-size: @size-small;
                        }
                    }
                }
            }
            .copyright {
                text-align: center;
                height: 40px;
                line-height: 40px;
                background-color: @color-base-bg;
            }
        }
    }
</style>
