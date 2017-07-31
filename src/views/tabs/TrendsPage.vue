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
                            <el-col :span="12" v-for="(item,index) in userDetail.manageGroups" :key="index"
                                    v-if="index<4">{{item.name}}
                            </el-col>
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
                    <el-select v-model="rankForm.orderType" placeholder="请选择" v-on:change="orderTypeChage">
                        <el-option
                                v-for="item in rankOptions"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-radio-group v-model="rankForm.statisticsType" class="statisticsType" v-on:change="statisticsChage" >
                        <el-radio-button v-for="(item,index) in statisticsOptions"  :key="index"  :label="item.value" >{{item.label}}</el-radio-button>
                    </el-radio-group>

                    <el-table
                            :data="tableData" stripe :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                                label="排名"
                                prop="index"
                        >
                            <template scope="scope">
                                {{ scope.$index +1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="userFullName"
                                label="职员姓名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="completeNum"
                                label="解决数量"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="averageRespondTime"
                                label="平均响应时间(秒)"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="averageCompleteTime"
                                label="平均解决时间(秒)"
                        >
                        </el-table-column>
                    </el-table>
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
                workorderCount: {},
                rankOptions: [
                    {
                        label: '按解决数量排序',
                        id: 1
                    },
                    {
                        label: '按平均响应时间排序',
                        id: 2
                    },
                    {
                        label: '按平均解决时间排序',
                        id: 3
                    },
                ],
                statisticsOptions:[
                    {
                        label:'今日',
                        value:1
                    },
                    {
                        label:'月',
                        value:2
                    },
                    {
                        label:'总',
                        value:3
                    },

                ],
                rankForm:{
                    orderType:1,
                    statisticsType:1,
                    pageSize:10,
                    pageNumber:0
                },
                tableData: [
                    {
                    completeNum: 8,
                    averageCompleteTime: 63174611,
                    userFullName: '李云龙',
                    userId: '2',
                    averageRespondTime: '464843',

                }, {
                    completeNum: 1,
                    averageCompleteTime: 999999999,
                    userFullName: '李云龙',
                    userId: '2',
                    averageRespondTime: '4648432',

                }, {
                    completeNum: 15,
                    averageCompleteTime: 63127622,
                    userFullName: '李云龙',
                    userId: '2',
                    averageRespondTime: '9999999999',

                }, {
                    completeNum: 10,
                    averageCompleteTime: 63176644,
                    userFullName: '李云龙',
                    userId: '2',
                    averageRespondTime: '4644843',

                },
                    {
                        completeNum: 11,
                        averageCompleteTime: 63176633,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 111,
                        averageCompleteTime: 63176611,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    }, {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    },
                    {
                        completeNum: 11,
                        averageCompleteTime: 631766,
                        userFullName: '李云龙',
                        userId: '2',
                        averageRespondTime: '4644843',

                    }
                ],
            };
        },
        methods: {
            orderTypeChage(){
                this.getOperationStar();
            },
            fetchData(){
                cinemaApi.listCinemaGroup().then(res => {
                    for (let i in this.charts) {
                        this.charts[i].cinemaGroup = res.resultData.content
                    }
                })
                indexApi.workorderCount().then(res => {
                    this.workorderCount = res.resultData
                })
//                this.getOperationStar();
            },
            statisticsChage(){
                this.getOperationStar();
            },
            getOperationStar(){
                indexApi.operationStar(this.rankForm).then(res=>{
                    this.tableData = res.resultData;
                })
            },
            tableRowClassName(row, index){
                if (index === 0) {
                    return 'num-one';
                } else if (index === 1) {
                    return 'num-tow';
                }
                else if (index === 2) {
                    return 'num-three';
                }
                return '';
            }//前三名样式
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
        .login-info { //登录信息样式
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
        .rank { //排行样式
            height: 886px;
            .el-table {
                th,td{
                    text-align: center;
                }
                tr{
                    height: 70px;
                }
            }
            .num-one {
                background: #fffae5;
                color: #b97100;
            }
            .num-tow {
                background: #fbfdff;
                color: #3b7fb6;
            }
            .num-three {
                background: #fff8f2;
                color: #e16b0b;
            }
            .el-card__body {
                overflow: visible;
                padding: 0;
            }
            .el-select {
                float: right;
                top: -8px;
            }
            .statisticsType{
                margin:14px 0;
                text-align: center;
                display: block;
            }
        }
    }
</style>