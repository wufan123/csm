<template>
    <div>
        <div class="page">
            <div class="seatch">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="影院组">
                        <el-input v-model="search.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="searchSubmit">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addSubmit">新增</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="content">
                <el-table :data="cinemaGroupList" border stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="100"></el-table-column>
                    <el-table-column prop="name" label="影院组" width="180"></el-table-column>
                    <el-table-column prop="hasCinemaCount" label="下属影院数量" width="180"></el-table-column>
                    <el-table-column prop="createTime" :formatter="formateDate" label="创建时间"
                                     width="180"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)">编辑</el-button>
                            <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="h20"></div>
                <el-row type="flex" justify="end" class="pagination">
                    <el-pagination
                            @size-change="pageSizeChange"
                            @current-change="pageCurrentChange"
                            :current-page="pageNumber"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="this.page.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.page.totalElements">
                    </el-pagination>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import employeeApi from 'api/employeeApi'
    import cinemaApi from 'api/cinemaApi'
    export default {
        data(){
            return {
                cinemaGroupList: [],
                pageNumber: 1,
                page: {
                    pageSize: 10,
                    pageNumber: 0,
                    totalElements: 0
                },
                search: {
                    name: '',
                }
            }
        },
        methods: {
            getData: function (params) {
                if (!params) {
                    params = {}
                }
                params.pageNumber = this.page.pageNumber
                params.pageSize = this.page.pageSize
                cinemaApi.listCinemaGroup(params).then(res => {
                    this.page.totalElements = res.resultData.totalElements
                    this.cinemaGroupList = res.resultData.content
                })
            },
            searchSubmit(){
                var params = {}
                if (this.search.name) {
                    params.name = this.search.name
                }
                this.getData(params)
            },
            addSubmit(){
                this.$prompt('影院组名称', '新建影院组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '长度在2到25个字符',
                    inputValidator: function (value) {
                        if (!value || !(value.length >= 2 && value.length <= 25)) {
                            return false;
                        }
                    },
                }).then(({value}) => {
                    cinemaApi.addCinemaGroup({name: value}).then(res => {
                        this.getData();
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    })
                }).catch(() => {

                });
            },
            editFn(_index, row){
                this.$prompt('影院组名称', '编辑影院组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '长度在2到25个字符',
                    inputValue: row.name,
                    inputValidator: function (value) {
                        if (!value || !(value.length >= 2 && value.length <= 25)) {
                            return false;
                        }
                    },
                }).then(({value}) => {
                    cinemaApi.editCinemaGroup({name: value, id: row.id}).then(res => {
                        this.getData();
                    })
                }).catch(() => {

                });
            },
            formateDate(row){
                return new Date(row.createTime).format("yyyy-MM-dd")
            },
            deleteFn(_index, row){
                console.log('row', row)
                this.$confirm('此操作将永久删除该影院组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cinemaApi.delCinemaGroup({cinemaGroupId: row.id}).then(res => {
                        this.getData();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, error => this.$message.error(error))

                })
            },
            pageCurrentChange(currentPage){
                this.page.pageNumber = currentPage - 1
                this.getData();
            },
            pageSizeChange(size){
                this.page.pageSize = size
                this.getData();
            },
            fetchData(){
                this.getData()
            }
        }
    }
</script>
