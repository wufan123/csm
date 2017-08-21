<template>
    <div class="tab-content">
        <div class="table-list">
            <el-form ref="form" :model="form" label-width="85px" :inline="true">
                <el-form-item label="影院组名称">
                    <el-select v-model="form.cinemaGroupId" placeholder="全部" v-on:change="getCinemas()">
                        <group-options :showAll="true"></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="影院名称">
                    <el-select v-model="form.cinemaId" placeholder="全部">
                        <cinema-options :showAll="true" ref="cinemaOp"></cinema-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作职员">
                    <el-input v-model="form.serviceUserName" placeholder="">
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
                    <el-button type="text" class="t-info" v-on:click="exportReport">导出Excel</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="this.pageDatas.content"
                    stripe
            >
                <el-table-column
                        prop="date"
                        label="序号"
                        width="100"
                >
                    <template scope="scope">
                        {{ scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="操作时间"
                        width="150"
                >
                    <template scope="scope">
                        {{new Date(scope.row.createTime).format("yyyy-MM-dd hh:mm")}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="serviceUserName"
                        label="操作职员"
                        width="100" >
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="workorderTypeName"-->
                <!--label="类型">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="workorderNo"
                        label="单据编号"
                        width="100" >
                </el-table-column>
                <el-table-column
                        prop="cinemaName"
                        label="影院名称"
                        width="100" >
                </el-table-column>
                <el-table-column
                        prop="cinemaGroupName"
                        label="影院组名称"
                        width="100" >
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="address"-->
                <!--label="客诉类型">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="detail"
                        label="具体操作">
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
</template>
<script>
    import workorderHandleRecordApi from 'api/handleRecordApi'
    export default {
        data(){
            let tableData = []
            return {
                tableData: tableData,
                createTimeStart: '',
                createTimeEnd: '',
                pageNumber: 1,
                form: {
                    cinemaGroupId: '',
                    cinemaId: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    serviceUserName:'',
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
                this.form.cinemaId = ''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            getList(){
                this.form.createTimeStart = this.createTimeStart ? this.createTimeStart.format('yyyy-MM-dd') : '';
                this.form.createTimeEnd = this.createTimeEnd ? this.createTimeEnd.format('yyyy-MM-dd') : '';
                workorderHandleRecordApi.list(this.form).then(res => {
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
                workorderHandleRecordApi.exportReport(this.form) 
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

