<template xmlns="http://www.w3.org/1999/html">
    <div id="main">
        <el-row class="main-header">
            <el-col :span="3" class="logo">
                <div class="logo"></div>
            </el-col>
            <el-col :span="21" class="logo">
                <el-menu theme="dark" mode="horizontal" :default-active="currentTopMenuIndex.toString()" @select="handleSelect">
                    <el-menu-item v-for="(item, index) in menus" :index='index.toString()' :key="item.name" >{{item.name}}</el-menu-item>
                    <el-submenu :index="(menus.length+1).toString()">
                    <template slot="title"><img class="avatar"  v-bind:src="userDetail.headImageLink" :onerror="errorImg" />{{userDetail.fullName}}</template>
                        <el-menu-item :index="(menus.length+1).toString()+'-1'">修改头像</el-menu-item>
                        <el-menu-item :index="(menus.length+1).toString()+'-2'">修改密码</el-menu-item>
                        <el-menu-item :index="(menus.length+1).toString()+'-3'" v-on:click="logout">安全退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="main-body">
            <el-row>
                <el-col :span="3" class="slide-menu">
                    <el-menu >

                        <el-submenu v-for="(item,index) in menus[currentTopMenuIndex].childMenus" :index="index.toString()" :name="index.toString()" :key="item.name">
                            <template slot="title"><i class="el-icon-search"></i>{{item.name}}</template>
                            <el-menu-item v-for="(subItem,subIndex) in item.childMenus" :index="index.toString()+'-'+subIndex.toString()" :key="subItem.name">{{subItem.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="21">
                    <el-tabs v-model="menuTabsValue" type="card" closable @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item, index) in menuTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                        >
                            <component v-bind:is="item.tabView">
                                <!-- 组件在 vm.currentview 变化时改变！ -->
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
    import indexPage from './tabs/indexPage.vue'
    import complaintListPage from './tabs/complaintListPage.vue'
    import loginApi from '../api/loginApi'
    import menu from '../assets/menu.json'
    export default{
        data(){
            this.userDetail =this.$storage.getItem(this.$storage.KEY_USER_DETAIL);
            return {
                currentTopMenuIndex:0,
                menus:this.userDetail.menus,
                errorImg:'this.src=""',
                menuTabsValue: '1',
                menuTabs: [{
                    title: '首页',
                    name: '1',
                    tabView: indexPage
                }],
            }
        },
        methods: {
            logout(){
                loginApi.logout({
                    userId:this.userDetail.id
                }).then((response) => {
                    this.$router.push({ path: 'login' })
                })
            },
            handleSelect(key) {
                console.log(key);
                this.currentTopMenuIndex=key;
            },
            removeTab(targetName) {//关闭tab标签
                let tabs = this.menuTabs;
                let activeName = this.menuTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.menuTabsValue = activeName;
                this.menuTabs = tabs.filter(tab => tab.name !== targetName);
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
