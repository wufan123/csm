<template>
    <div class="tab-content">
        <div>
            <div class="table-list">
                <el-form ref="form" :model="form" label-width="85px" :inline="true">
                    <el-form-item label="影院组名称">
                        <el-select v-model="form.cinemaGroupId" placeholder="全部" v-on:change="getCinemas()">
                            <group-options showAll="true" withPermissions="true"></group-options>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="影院名称">
                        <el-select v-model="form.cinemaId" placeholder="全部">
                            <cinema-options showAll="true" withPermissions="true" ref="cinemaOp"></cinema-options>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客诉状态">
                        <el-select v-model="form.statuses" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="等待处理" value="1"></el-option>
                            <el-option label="处理中" value="2"></el-option>
                            <el-option label="处理中转技术" value="3"></el-option>
                            <el-option label="未解决" value="4"></el-option>
                            <el-option label="已解决" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客诉处理人">
                        <el-input v-model="form.firstHandler" placeholder="">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="客诉日期">
                        <froto-datepicker v-model="date"></froto-datepicker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="getList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="text" class="t-info" v-on:click="exportReport">导出Excel</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="this.pageDatas.content"
                        stripe
                >
                    <el-table-column
                            prop="orderNo"
                            label="编号"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            label="日期"
                            width="150">
                        <template scope="scope">
                            {{new Date(scope.row.createTime).format("yyyy-MM-dd")}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="时间"
                            width="75">
                        <template scope="scope">
                            {{new Date(scope.row.createTime).format("hh:ss")}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cinemaName"
                            label="影城"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="projectModule"
                            label="项目模块"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="initiatorName"
                            label="发起人"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="firstHandler"
                            label="运维人员"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="completeServiceUserName"
                            label="解决人"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="问题描述"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="handleResult"
                            label="处理结果及问题原因"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="scoreName"
                            label="客户评价"
                    >
                    </el-table-column>


                </el-table>
                <el-row type="flex" justify="end" class="pagination">
                    <el-pagination
                            @size-change="pageSizeChange"
                            @current-change="pageCurrentChange"
                            :current-page="pageNumber"
                            :page-sizes="[20, 40, 60, 80]"
                            :page-size="this.form.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.pageDatas.totalElements">
                    </el-pagination>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import workOrderApi from 'api/workOrderApi'
    export default {
        data(){
            let tableData = []
            return {
                tableData: tableData,
                date: {
                    createTimeStart: '',
                    createTimeEnd: ''
                },
                pageNumber: 1,
                form: {
                    cinemaGroupId: '',
                    cinemaId: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    statuses: '',
                    firstHandler: '',
                    suggestSource: '',
                    pageSize: 20,
                    pageNumber: 0,
                    orderByCreateTime:true
                },
                pageDatas: {
                    totalElements: 0
                }
            }
        },
        methods: {
            getCinemas(){
                this.form.cinemaId = ''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            getList(){
                this.form.createTimeStart = this.date.createTimeStart ? this.date.createTimeStart.format('yyyy-MM-dd') : '';
                this.form.createTimeEnd = this.date.createTimeEnd ? this.date.createTimeEnd.format('yyyy-MM-dd') : '';
                workOrderApi.list(this.form).then(res => {
                    this.pageDatas = res.resultData
                })
            },
            fetchData(){
                this.getList()
            },
            pageCurrentChange(currentPage){
                this.form.pageNumber = currentPage - 1
                this.getList()
            },
            pageSizeChange(size){
                this.form.pageSize = size
                this.getList()
            },
            exportReport(){
                workOrderApi.exportReport(this.form)
            },
        }
    }
</script>
<style lang='less'>
    .table-list {
        padding: 30px 20px 20px 20px;
        .pagination {
            margin-top: 30px;
        }
    }
</style>