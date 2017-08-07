<template>
    <div class="complain-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="客诉类型">
                <el-select v-model="form.orderType" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="查询" value="1"></el-option>
                    <el-option label="影票退款" value="2"></el-option>
                    <el-option label="卖品退款" value="3"></el-option>
                    <el-option label="套票退款" value="4"></el-option>
                    <el-option label="票券状态处理" value="5"></el-option>
                    <el-option label="密码重置" value="6"></el-option>
                    <el-option label="活动管理" value="7"></el-option>
                    <el-option label="影片排期刷新/删除" value="8"></el-option>
                    <el-option label="其他" value="9"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影院组名称">
                <el-select v-model="form.cinemaGroupId" placeholder="全部" v-on:change="getCinemas">
                    <el-option v-for="(item,index) in cinemaGroupOptions" :key="index" :label="item.name"
                               :value="item.id"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="影院名称">
                <el-select v-model="form.cinemaName" placeholder="全部">
                    <el-option v-for="(item,index) in cinemasOptions" :key="index" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createTimeStart"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createTimeEnd"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="客诉等级">
                <el-select v-model="form.orderLevel" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉来源">
                <el-select v-model="form.orderSource" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="自建客诉" value="1"></el-option>
                    <el-option label="平台影院" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉状态">
                <el-select v-model="form.status" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="等待处理" value="1"></el-option>
                    <el-option label="处理中" value="2"></el-option>
                    <el-option label="处理中转技术" value="3"></el-option>
                    <el-option label="未解决" value="4"></el-option>
                    <el-option label="已解决" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否星标">
                <el-select v-model="form.isStar" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="info" v-on:click="getWorkOrders">查询</el-button>
                <el-button type="success" v-on:click="add">新建</el-button>
            </el-form-item>
        </el-form>
        <div class="list-body">
            <el-row>
                <el-tabs v-model="activeSubTab" type="card" v-on:tab-click="tabClick">
                    <el-tab-pane label="全部" name=""></el-tab-pane>
                    <el-tab-pane label="等待处理" name="1"></el-tab-pane>
                    <el-tab-pane label="处理中" name="2 3"></el-tab-pane>
                    <el-tab-pane label="处理完毕" name="5"></el-tab-pane>
                </el-tabs>
            </el-row>
            <el-row type="flex" justify="end" class="state-explain">
                <el-col :span="2" class="onhandle">
                    ■ 等待处理
                </el-col>
                <el-col :span="2" class="processing">
                    ■ 正在处理
                </el-col>
                <el-col :span="3" class="shift">
                    ■ 正在处理-转技术解决
                </el-col>
                <el-col :span="2" class="unsolved">
                    ■ 未解决
                </el-col>
                <el-col :span="2" class="worked-out">
                    □ 处理完毕
                </el-col>
                <el-col :span="3">
                    你有11条新客诉
                </el-col>
            </el-row>
            <el-row :gutter="21" class="list-card">
                <el-col :span="8" v-for="(item,index) in OrdersContent" :key="index">
                    <el-card :class="getStatusClass(item.status)" @click.native="handleComplaint(item)">
                        <div class="card_header">
                            {{item.orderNo}}
                        </div>
                        <div class="card_body">
                            {{item.content}}
                        </div>
                        <div class="card_footer">
                            来自:{{item.cinemaGroupName + '  ' + (item.cinemaName ? item.cinemaName : '')}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="pageNumber"
                        :page-sizes="[21, 42, 63]"
                        :page-size="this.form.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.pageDatas.totalElements">
                </el-pagination>
            </el-row>
        </div>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    import workOrderApi from 'api/workOrderApi'
    export default {
        data(){
            return {
                activeSubTab: '',
                createTimeStart: '',
                createTimeEnd: '',
                OrdersContent: [],
                pageNumber:1,
                form: {
                    orderType: '',
                    cinemaGroupId: '',
                    cinemaName: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    orderLevel: '',
                    orderSource: '',
                    status: '',
                    isStar: '',
                    pageSize:21,
                    pageNumber:0,
                },
                pageDatas: {
                    content: [],
                    totalElements: 0,
                },
                cinemaGroupOptions: [],
                cinemasOptions: []
            }
        },
        methods: {
            tabClick(tab){
                this.OrdersContent = this.pageDatas.content.filter(item => {
                    let status = this.activeSubTab.split(' ')
                    for (let i in status) {
                        if (!status[i]||status[i]=='0'||status[i] == item.status) {
                            return true
                        }
                    }
                    return false;
                })
            },
            getCinemas(){
                this.cinemasOptions = [];
                cinemaApi.listCinema({
                    cinemaGroupId: this.form.cinemaGroupId
                }).then(res => {
                    let ops = [{id: '', name: '全部'}]
                    ops = ops.concat(res.resultData.content);
                    this.cinemasOptions = ops
                })
            },
            add(){
                this.$emit('view', {
                    type: 'add'
                })
            },
            handleComplaint(item){
                workOrderApi.inHandle({
                    workorderId: item.id
                }).then(res => {
                    if (!res.resultData) {
                        this.$emit('view', {
                            type: 'handle',
                            data: item
                        })
                    }
                })
            },
            fetchData(){
                cinemaApi.listCinemaGroup({}).then(res => {
                    let ops = [{id: '', name: '全部'}]
                    ops = ops.concat(res.resultData.content);
                    this.cinemaGroupOptions = ops;
                })
                this.getWorkOrders();
            },
            getWorkOrders(){
                this.form.createTimeStart = this.createTimeStart ? this.createTimeStart.format('yyyy-MM-dd') : '';
                this.form.createTimeEnd = this.createTimeEnd ? this.createTimeEnd.format('yyyy-MM-dd') : '';
                workOrderApi.list(this.form).then(res => {
                    this.pageDatas = res.resultData
                    this.OrdersContent = this.pageDatas.content
                })
            },
            getStatusClass(status){
                switch (status) {
                    case workOrderApi.STATUS_WAITING:
                        return "onhandle"
                    case workOrderApi.STATUS_HANDLEING:
                        return "processing"
                    case workOrderApi.STATUS_HANDLEING_TO_TECH:
                        return "shift"
                    case workOrderApi.STATUS_NO_COMPLETE:
                        return "unsolved"
                    case workOrderApi.STATUS_COMPLETE:
                    case workOrderApi.STATUS_SCORE_COMPLETE:
                        return ""
                }
            },
            pageCurrentChange(currentPage){
                this.form.pageNumber = currentPage -1
                this.getWorkOrders();
            },
            pageSizeChange(size){
                this.form.pageSize= size
                this.getWorkOrders();

            }
        },

    }

</script>
<style lang="less">
    @onhandleColor: #be0000;
    @onhandleBg: #ffdede;
    @processingColor: #dc6200;
    @processingBg: #ffeee1;
    @shiftColor: #3f5a04;
    @shiftBg: #dfedc0;
    @unsolvedColor: #d6bd00;
    @unsolvedBg: #fffad5;
    @workedOutColor: #be0000;
    .complain-list {
        padding: 30px 20px 20px 20px;
        .el-form-item {
            margin-bottom: 10px;
        }
        .list-body {
            margin-top: 25px;
        }
        .state-explain {
            margin-top: 30px;
            font-size: 12px;
            .onhandle {
                color: @onhandleColor;
            }
            .processing {
                color: @processingColor;
            }
            .shift {
                color: @shiftColor;
            }
            .unsolved {
                color: @unsolvedColor;
            }
        }
        .list-card {
            margin-top: 30px;
            .el-card {
                height: 180px;
                margin-bottom: 20px;
                cursor: pointer;
                padding: 24px 16px;
                .card_header {

                }
                .card_body {
                    margin-top: 24px;
                    height: 85px;
                    padding-left: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .card_footer {
                    margin-top: 28px;
                    text-align: right;
                }

            }
            .onhandle {
                color: @onhandleColor;
                background: @onhandleBg;
                border: 1px solid @onhandleColor;
            }
            .processing {
                color: @processingColor;
                background: @processingBg;
                border: 1px solid @processingColor;
            }
            .shift {
                color: @shiftColor;
                background: @shiftBg;
                border: 1px solid @shiftColor;
            }
            .unsolved {
                color: @unsolvedColor;
                background: @unsolvedBg;
                border: 1px solid @unsolvedColor;
            }
        }
    }
</style>