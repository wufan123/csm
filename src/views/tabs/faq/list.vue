<template>
    <div>
        <div class="table-list">
            <el-form ref="form" :model="form" label-width="85px" :inline="true">
                <el-form-item label="影院组名称">
                    <el-select v-model="form.cinemaGroupId" placeholder="全部">
                        <group-options :showAll="true"></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加职员">
                    <el-input v-model="form.serviceUserName" placeholder="">
                    </el-input>
                </el-form-item>
                <el-form-item label="添加日期">
                    <froto-datepicker v-model="date"></froto-datepicker>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="getList">查询</el-button>
                    <el-button type="success" v-on:click="add">新建</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="this.pageDatas.content"
                    stripe
                    border>
                <el-table-column
                        prop="date"
                        label="序号"
                >
                    <template scope="scope">
                        {{ scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="添加日期"
                >
                    <template scope="scope">
                        {{new Date(scope.row.createTime).format("yyyy-MM-dd hh:mm")}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="serviceUserName"
                        label="添加职员">
                </el-table-column>
                <el-table-column
                        prop="questionCount"
                        label="问答数量">
                </el-table-column>
                <el-table-column
                        label="适用影院组">
                    <template scope="scope">
                        <label v-for="(item,key) in scope.row.cinemaGroups" v-bind:key="key">{{item.name+(key < scope.row.cinemaGroups.length-1?'、':'')}}</label>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template scope="scope">
                        <el-button type="text"
                                   size="mini"
                                   @click="handleEdit(scope.$index, scope.row)" class="t-info">编辑
                        </el-button>
                        <el-button type="text"
                                   size="mini"
                                   @click="handleDelete(scope.$index, scope.row)" class="t-danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" class="pagination">
                <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="pageNumber"
                        :page-sizes="[20, 40, 60, 80]"
                        :page-size="form.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageDatas.totalElements">
                </el-pagination>
            </el-row>
        </div>
    </div>
</template>
<script>
    import platformFaqApi from 'api/platformFaqApi'
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
                    createTimeStart: '',
                    createTimeEnd: '',
                    serviceUserName: '',
                    pageSize: 20,
                    pageNumber: 0
                },
                pageDatas: {
                    totalElements: 0
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$emit('view', {
                    type: 'edit',
                    data: row
                })
            },
            handleDelete(index, row) {
                this.$alert('确定删除该条建议么', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action == 'confirm') {
                            platformFaqApi.delete({
                                id: row.id
                            }).then(res => {
                                this.pageDatas.content = this.pageDatas.content.filter(item => {
                                    return item.id !== row.id
                                })
                            })
                        }
                    }
                });
            },
            getCinemas(){
                this.form.cinemaId = ''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            getList(){
                this.form.createTimeStart =  this.date.createTimeStart ?  this.date.createTimeStart.format('yyyy-MM-dd') : '';
                this.form.createTimeEnd =  this.date.createTimeEnd ?  this.date.createTimeEnd.format('yyyy-MM-dd') : '';
                platformFaqApi.list(this.form).then(res => {
                    this.pageDatas = res.resultData
                })
            },
            add(){
                this.$emit('view', {
                    type: 'add'
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



