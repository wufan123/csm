<
<template>
    <div>
        <div class="page">
            <div class="seatch">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="岗位名称">
                        <el-input v-model="search.positionName" placeholder="全部">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.enable" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" value="true"></el-option>
                            <el-option label="停用" value="false"></el-option>
                        </el-select>
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
                <el-table :data="positionList" border stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="100"></el-table-column>
                    <el-table-column prop="positionName" label="岗位名称" width="180"></el-table-column>
                    <el-table-column prop="enable" label="状态" width="180">
                        <template scope="scope">
                            <em>
                                {{scope.row.enable ? '正常' : '禁用'}}</em>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)">
                                编辑
                            </el-button>
                            <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除</el-button>
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
<
<script>
    import employeeApi from 'api/employeeApi'
    import positionApi from 'api/positionApi'
    export default {
        data(){
            return {
                positionList: [],
                pageNumber: 1,
                page: {
                    pageSize: 10,
                    pageNumber: 0,
                    totalElements: 0
                },
                search: {
                    positionName: '',
                    enable: ''
                }
            }
        },
        methods: {
            searchSubmit(){
                var params = {}
                params.positionName = this.search.positionName
                params.enable = this.search.enable
                this.getPositionList(params)
            },
            addSubmit(){
                this.$emit('setType', {
                    type: 'add'
                })
            },
            editFn(_index, row){
                this.$emit('setType', {
                    type: 'edit',
                    data: row
                })
                //  this.$storage.setItem('curEmployeeDetail',this.employeeList[_index])
            },
            formateDate(row){
                return new Date(row.hireDate).format("yyyy-MM-dd")
            },
            formateCinema(row){
                var str = ''
                row.manageGroups && row.manageGroups.forEach(item => {
                    str += item.name + ' '
                })
                return str
            },
            getPositionList(params){
                positionApi.ListPosition(params).then(res => {
                    this.page.totalElements = res.resultData.totalElements
                    this.positionList = res.resultData.content;
                    this.$storage.setItem('position', res.resultData.content)
                })
            },
            deleteFn(_index, row){
                this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    positionApi.delPosition({positionId: row.id}).then(res => {
                        this.getPositionList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

                })
            },
            pageCurrentChange(currentPage){
                this.page.pageNumber = currentPage - 1
                this.getPositionList(this.page);
            },
            pageSizeChange(size){
                this.page.pageSize = size
                this.getPositionList(this.page);

            }
        },
        created: function () {
            this.getPositionList(this.page)
        }
    }
</script>
