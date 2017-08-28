<template>
    <div class="tab-content">
        <div>
            <div class="page">
                <div class="search">
                    <el-button type="success" @click="addSubmit">新增</el-button>
                </div>
                <div class="h20"></div>
                <div class="content">
                    <el-table :data="tableList" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column prop="name" label="接口名称" width="180"> </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)">编辑</el-button>
                                <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="h20"></div>
                    <el-row type="flex" justify="end" class="pagination">
                        <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="this.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.page.totalElements">
                        </el-pagination>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import portApi from 'api/siteInterfaceApi'
export default {
    data() {
        return {
            tableList: [],
            pageNumber: 1,
            page: {
                pageSize: 10,
                pageNumber: 0,
                totalElements: 0
            }
        }
    },
    methods: {
        getData(params) {
            portApi.ListPortGroup(this.page).then(res => {
                this.page.totalElements = res.resultData.totalElements
                this.tableList = res.resultData.content
            },error=>this.$message.error(error))
        },
        addSubmit() {
            this.$prompt('接口名称', '新建接口', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '长度在2到25个字符',
                inputValidator: function (value) {
                    if (!value||!(value.length>2&&value.length<50)) {
                            return false;
                        }
                },
            }).then(({ value }) => {
                portApi.addPortGroup({ name: value }).then(res => {
                    this.getData();
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                },error=>this.$message.error(error))
            }).catch(() => {

            });
        },
        editFn(_index, row) {
            this.$prompt('接口名称', '编辑接口', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: row.name,
                inputErrorMessage: '长度在2到25个字符',
                inputValidator: function (value) {
                    if (!value||!(value.length>2&&value.length<50)) {
                            return false;
                        }
                },
            }).then(({ value }) => {
                portApi.editPortGroup({ name: value, id: row.id }).then(res => {
                    this.getData();
                },error=>this.$message.error(error))
            }).catch(() => {

            });
        },
        deleteFn(_index, row) {
            this.$confirm('此操作将永久删除该接口, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    portApi.delPortGroup({id:row.id}).then(res => {
                        this.getData();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                     },error=>this.$message.error(error))
                
                })
        },
        pageCurrentChange(currentPage) {
            this.page.pageNumber = currentPage - 1
            this.getData();
        },
        pageSizeChange(size) {
            this.page.pageSize = size
            this.getData();

        },
        fetchData(){
            this.getData()
        }
    }
}
</script>

