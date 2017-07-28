<template>
    <el-row id="index" :gutter="20">
        <el-col :span="16" class="index-body">
            <chart-card v-for="(item,index) in charts" :chart="item" :key="index"></chart-card>
        </el-col>
        <el-col :span="8" class="index-body">
            <el-card class="login-info">
                <div slot="header">
                    <span>登录人员</span>
                </div>
                <div class="body">
                    <div class="title">欢迎你</div>
                    <div class="name">{{userDetail.positionName + ' ' + userDetail.fullName}}</div>
                    <div class='des'>
                        <label>负责范围：</label>
                        <el-row :gutter="20" class="range">
                            <el-col :span="12" v-for="(item,index) in userDetail.manageGroups" :key="index" v-if="index<4">{{item.name}}</el-col>
                            <el-col :span="12" v-if="userDetail.manageGroups.length>=4"><a href="">查看详情</a></el-col>
                        </el-row>
                    </div>
                    <div class='des'>
                        存在客诉：
                        <span class="num">
                            <div>
                                <a href="">{{workorderCount.existWorkorderCount}}</a>条
                            </div>
                            <div>
                                其中等待解决的客诉<a href="">{{workorderCount.waitingWorkorderCount}}</a>条
                            </div>
                        </span>
                    </div>
                </div>
            </el-card>
            <el-card class="rank">
                <div slot="header">
                    <span>运维之星</span>
                </div>
                <div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import chartCard from 'views/component/chartCard.vue'
    import cinemaApi from 'api/cinemaApi'
    import indexApi from 'api/indexApi'
    import apiMixin from 'utils/apiMixin'
    import chartData from 'assets/chartData.json'
    import ElRow from "element-ui/packages/row/src/row";
    //获取图表数据
    export default {
        mixins: [apiMixin],
        components: {
            ElRow,
            chartCard
        },
        data(){
            return {
                userDetail: this.$storage.getItem(this.$storage.KEY_USER_DETAIL),
                charts: chartData,
                workorderCount: {}
            };
        },
        methods: {
            fetchData(){
                cinemaApi.listCinemaGroup({}).then(res => {
                    for (let i in this.charts) {
                        this.charts[i].cinemaGroup = res.resultData.content
                    }
                })
                indexApi.workorderCount().then(res => {
                    this.workorderCount = res.resultData
                })
            }
        }

    }
</script>
<style lang="less">
    @import "~style/base-variables";

    #index {
        padding: 0 20px 0 20px;
        .el-card {
            margin-top: 20px;
        }
        .login-info {
            height: 433px;
            .body {
                padding: 30px;
                .title {
                    font-weight: bold;
                }
                .name {
                    font-size: @size-large-x;
                    color: @color-info;
                    margin-top: 24px;
                }
                .des {
                    margin-top: 30px;
                    span {
                        display: inline-table;
                    }
                    .num div {
                        margin-bottom: 30px;
                    }
                    .el-row {
                        width: calc(~'100% - 85px');
                        display: inline-table;
                    }
                    label {
                        float: left;

                    }
                    .el-col:not(:last-child) {
                        margin-bottom: 30px;
                    }

                }
            }
        }
        .rank {
            height: 886px;
        }
    }
</style>