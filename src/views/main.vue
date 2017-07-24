<template>
    <div id="main">
        <el-row class="main-header">
            <el-col :span="3" class="logo">
                <div class="logo"></div>
            </el-col>
            <el-col :span="21" class="logo">
                <el-menu theme="dark" mode="horizontal" default-active="1">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">客诉建议处理</el-menu-item>
                    <el-menu-item index="3">系统管理</el-menu-item>
                    <el-submenu index="4">
                        <template slot="title"><img class="avatar"/>管理员</template>
                        <el-menu-item index="4-1">修改头像</el-menu-item>
                        <el-menu-item index="4-2">修改密码</el-menu-item>
                        <el-menu-item index="4-2">安全退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="main-body">
            <el-row>
                <el-col :span="3" class="slide-menu">
                    <el-menu default-active="1">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-search"></i>数据查询1</template>
                            <el-menu-item index="1-1">选项11 </el-menu-item>
                            <el-menu-item index="1-2">选项11 </el-menu-item>
                            <el-menu-item index="1-3">选项11 </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-search"></i>数据查询</template>
                            <el-menu-item index="2-1">选项13</el-menu-item>
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

    export default{
        data(){
            return {
                menuTabsValue: '2',
                menuTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    tabView: indexPage
                }, {
                    title: 'Tab 2',
                    name: '2',
                    tabView: complaintListPage
                }
                    , {
                        title: 'Tab 3',
                        name: '3',
                        tabView: indexPage

                    }],
                tabIndex: 3
            }
        },
        methods: {
            ,
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
                        height: calc(~"100% - 40px");
                        .el-tabs__header {
                            padding: 0 44px 0 44px;
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
