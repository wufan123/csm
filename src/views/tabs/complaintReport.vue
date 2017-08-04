<template>
    <div class="table-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.cinemaGroupId" placeholder="全部" v-on:change="getCinemas()">
                    <group-options :showAll="true"></group-options>
                </el-select>
            </el-form-item>
            <el-form-item label="影院名称">
                <el-select v-model="form.cinemaName" placeholder="全部">
                    <cinema-options :showAll="true" ref="cinemaOp"></cinema-options>
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
            <el-form-item label="客诉处理人">
                <el-input v-model="form.firstHandler" placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item label="客诉日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createTimeStart"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker ype="date" placeholder="选择日期" v-model="createTimeEnd"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="getList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <a href="">导出Excel</a>
            </el-form-item>
        </el-form>
        <el-table
                :data="this.pageDatas.content"
                stripe
        >
            <el-table-column
                    prop="orderNo"
                    label="客诉编号"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="orderSourceName"
                    label="客诉来源"
            >
            </el-table-column>
            <el-table-column
                    prop="initiatorName"
                    label="发起人">
            </el-table-column>
            <el-table-column
                    prop="cinemaName"
                    label="客诉影院">
            </el-table-column>
            <el-table-column
                    prop="cinemaGroupName"
                    label="影院组">
            </el-table-column>
            <el-table-column
                    prop="cinemaGroupName"
                    label="处理人">
            </el-table-column>
            <el-table-column
                    prop="statusName"
                    label="客诉状态"
                     >
            </el-table-column>
            <el-table-column
                    label="发起时间"
                    width="120" >
                <template scope="scope">
                    {{new Date(scope.row.createTime).format("yyyy-MM-dd hh:mm")}}
                </template>
            </el-table-column>
            <el-table-column
                    label="解决时间"
                    width="120" >
                <template scope="scope">
                    {{scope.row.completeTime?new Date(scope.row.completeTime).format("yyyy-MM-dd hh:mm"):''}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="orderSourceName"
                    label="客诉类型">
            </el-table-column>
            <el-table-column
                    prop="otherDetail"
                    label="其他详情">
            </el-table-column>
            <el-table-column
                    prop="scoreName"
                    label="客诉评价">
            </el-table-column>
            <el-table-column
                    prop="orderLevelName"
                    label="客诉等级"
                    >
            </el-table-column>
            <el-table-column
                    prop="orderBugLevelName"
                    label="bug等级"
                    >
            </el-table-column>
            <el-table-column
                    prop="bugTypeName"
                    label="bug类型"
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
</template>
<script>
    import workOrderApi from 'api/workOrderApi'
    export default {
        data(){
            let tableData = []
            return {
                tableData: tableData,
                createTimeStart: '',
                createTimeEnd: '',
                pageNumber: 0,
                form: {
                    cinemaGroupId: '',
                    cinemaName: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    status: '',
                    firstHandler:'',
                    suggestSource: '',
                    pageSize: 20,
                    pageNumber: 0
                },
                pageDatas: {
                    totalElements: 0
                }
            }
        },
        methods: {
            getCinemas(){
                this.form.cinemaName = ''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            getList(){
                this.form.createTimeStart = this.createTimeStart ? this.createTimeStart.format('yyyy-MM-dd') : '';
                this.form.createTimeEnd = this.createTimeEnd ? this.createTimeEnd.format('yyyy-MM-dd') : '';
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
            }
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