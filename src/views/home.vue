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
                    <el-tabs v-model="currentTabId" type="card" @tab-remove="removeTab" @tab-click="clickTab">
                        <el-tab-pane
                                v-for="(item, index) in menuTabs"
                                :key="item.id"
                                :label="item.name"
                                :name="item.id.toString()"
                                :closable="true"
                        >
                            <component v-bind:is="item.page" v-on:goOtherTab="showTabByName"
                                       @setAdvertImg="setAdvertImgFn"
                                       :tabForm="item.tabForm" :ref="'tab'+item.id"></component>
                        </el-tab-pane>
                    </el-tabs>
                    <p class="copyright">Copyright 2014-2015 福州最美影视网络科技有限公司 版权所有 4008-12345678  </p>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
    import indexPage from 'views/tabs/trendsPage.vue'
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
                destopNotifyList: [],
                messageNotifyList: []
            }
        },
        methods: {
            setAdvertImgFn(val){
                this.headImageLink = val
            },
            logout(){
                loginApi.logout({
                    userId: this.userDetail.id
                }).then((response) => {
                    clearInterval(window.loginHeart);
                    window._nim.disconnect();
                    this.menuTabs = []
                    this.$router.push({path: 'login'})
                })
            },
            topMenuSelect(key) {
                if (key.indexOf('submenu') === -1) {
                    this.subMenus = this.topMenus[key].childMenus
                }
                else {
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
                for (let i = 0; i < this.menuTabs.length; i++) {
                    if (item.id === this.menuTabs[i].id) {
                        if(!this.$refs['tab' + item.id])
                            return
                        let tabPage = this.$refs['tab' + item.id][0]
                        if (tabPage.changeViewState) {
                            tabPage.changeViewState({
                                tabForm: {
                                    status: '1'
                                }
                            })
                        }
                        if (tabPage.fetchData) {
                            tabPage.fetchData(true)
                        }
                        return;
                    }
                }
                item.page = rooter.mapTabPage(item)
                this.menuTabs.push(item)
            },
            showTabByName(targetTab){
                for (let i = 0; i < this.menus.length; i++) {
                    if (this.menus[i].name == targetTab.name) {
                        this.menus[i].tabForm = targetTab.tabForm
                        this.showSelectTab(this.menus[i])
                    }
                }

            },
            onCustomSysmsg(sysMsg){
                if (sysMsg) {
                    for (let i = 0; i < this.destopNotifyList.length; i++) {
                        if (sysMsg.time == this.destopNotifyList[i].time) {
                            return
                        }
                    }
                }
                if (this.destopNotifyList.length > 50) {
                    this.destopNotifyList = []
                }
                this.destopNotifyList.push(sysMsg);
                if (window._audioNotify)
                    window._audioNotify.play();
                let n = new Notification("你有新的客诉订单", {
                    icon: '',
                    body: '你有新的客诉订单,请及时处理'
                });

                window.vm = this
                n.onclick = () => {
                    self.focus();
                    window.vm.showTabByName({name: '客诉列表'})
                    n.close()
                }
                _vue.$bus.$emit('getWorkorders')
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
                for (let i in tabs) {
                    if (tabs[i].id == targetId) {
                        tabs.remove(tabs[i])
                    }
                }
            },
            viewReady(){
                window.vm = this;
                if (!this.userDetail)
                    return
                this.showTabByName({name: '趋势查询'})
                window._nim = new NIM({//初始化im
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
                                        console.log('分发到聊天记录')
                                        window._nim.onMsg(msg)
                                    } else {
                                        /*this.$notify.info({
                                         title:msg.fromNick +"  \n-"+new Date(msg.time).format("yyyy-MM-dd hh:mm:ss"),
                                         message:(msg.text ? msg.text : '图片'),
                                         iconClass: 'el-icon-message'
                                         });*/
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
                        window.vm.onCustomSysmsg(sysMsg)
                    },
                    ondisconnect: error => {
                        console.log('IM断开连接', error)
                        if (error.code == 'kicked') {
                            this.$message({
                                message: "该账号已在别处登录,如果不是你本人操作,请尽快修改密码",
                                type: 'error'
                            })
                            this.$router.push({path: 'login'});
                        }
                    },
                    onsessions: sessions => {
                        console.log('收到会话列表', sessions);
                    },
                    onupdatesession: session => {
                        console.log('更新会话列表', session);
                        if (window._nim && window._nim.updateSession) {
                            window._nim.updateSession(session)
                        }
                    }
                })
                if (!window._audioNotify) {
                    window._audioNotify = new Audio(require('assets/mp3/notify.mp3'));
                }
                if (!window.Notification) {
                    this.$notify({
                        title: '无法启用桌面通知',
                        message: '该浏览器或版本不支持桌面通知，请使用较新版本的谷歌浏览器',
                        duration: 0,
                        type: "error"
                    });
                    return
                }
                function notifyNoPermission() {
                    window.vm.$notify({
                        title: '无法启用桌面通知',
                        message: '无桌面通知权限，为不影响正常使用，请点击浏览器中链接左侧的 i 图标开启桌面通知权限',
                        duration: 0,
                        type: "error"
                    });
                }

                if (Notification.permission === 'denied') {
                    notifyNoPermission();
                }
                if (Notification.permission === 'default') {
                    Notification.requestPermission(function (permission) {
                        if (permission !== "granted") {
                            notifyNoPermission();
                        }
                    });
                }

            },
            clickTab(item){
                if(!this.$refs['tab' + item.name])
                    return
                let tabPage = this.$refs['tab' + item.name][0];
                console.log(tabPage)
                if (tabPage.fetchData) {
                    tabPage.fetchData(true)
                }
            }
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
                            .el-tab-pane {
                                height: 100%;
                                .tab-content {
                                    height: 100%;
                                    > div {
                                        height: 100%;
                                        overflow-y: scroll;
                                        overflow-x: hidden;
                                    }
                                }
                            }
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
