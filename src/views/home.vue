<template xmlns="http://www.w3.org/1999/html">
    <div id="main">
        <el-row class="main-header">
            <el-col :span="3" class="logo">
                <div class="logo"></div>
            </el-col>
            <el-col :span="21" class="logo">
                <el-menu theme="dark" mode="horizontal" :default-active="currentTopMenuIndex.toString()" @select="topMenuSelect">
                    <el-menu-item v-for="(item, index) in this.userDetail.menus" :index='index.toString()' :key="item.name" >{{item.name}}</el-menu-item>
                    <el-submenu index="submenu">
                        <template slot="title"><img class="avatar"  v-bind:src="userDetail.headImageLink" :onerror="errorImg" />{{userDetail.fullName}}</template>
                        <el-menu-item index="submenu-1">修改头像</el-menu-item>
                        <el-menu-item index="submenu-2">修改密码</el-menu-item>
                        <el-menu-item index="submenu-3" v-on:click="logout">安全退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="main-body">
            <el-row>
                <el-col :span="3" class="slide-menu">
                    <el-menu>
                        <el-submenu v-for="(item,index) in this.userDetail.menus[currentTopMenuIndex].childMenus" :index="index.toString()" :name="index.toString()" :key="item.name">
                            <template slot="title"><i class="el-icon-search"></i>{{item.name}}</template>
                            <el-menu-item v-for="(subItem,subIndex) in item.childMenus" :index="index.toString()+'-'+subIndex.toString()" :key="subItem.name" v-on:click="sideMenuClick(subItem)">{{subItem.name}}</el-menu-item>
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
                            <component v-bind:is="item.page">

                            </component>
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
    import complaintListPage from 'views/tabs/complaintListPage.vue'
    import loginApi from 'api/loginApi'
    import rooter from  '~/rooter'//
    export default{
        data(){
            this.userDetail =this.$storage.getItem(this.$storage.KEY_USER_DETAIL);
            if(!this.userDetail)
            {
                this.$router.push({ path: 'login' })
            }
            let firstTab = this.userDetail.menus[0].childMenus[0].childMenus[0];
            firstTab.page = rooter.mapTabPage(firstTab);
            return {
                currentTopMenuIndex:0,
                errorImg:'this.src=""',
                currentTabId: '55',
                menuTabs:[firstTab],
            }
        },
        methods: {
            logout(){
                loginApi.logout({
                    userId:this.userDetail.id
                }).then((response) => {
                    this.$router.push({ path: 'login'})
                })
            },
            topMenuSelect(key) {
                if(key.indexOf('submenu')===-1) //
                {
                    this.currentTopMenuIndex=key;
                }
            },
            sideMenuClick(item){
                this.showSelectTab(item)
            }
            ,
            showSelectTab(item){
                this.currentTabId = item.id.toString();
                for(let i in this.menuTabs)
                {
                    if(item.id === this.menuTabs[i].id)
                    {
                        return;
                    }
                }
                item.page = rooter.mapTabPage(item)
                this.menuTabs.push(item)
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
            }
        }

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
                        .el-tabs__content{
                            height: calc(~"100% - 59px");
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
