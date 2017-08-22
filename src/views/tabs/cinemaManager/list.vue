<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.cinemaGroupId" placeholder="全部" >
                    <group-options :showAll="true"></group-options>
                </el-select>
            </el-form-item>
            <el-form-item label="管理人员">
                <el-input v-model="form.fullName" placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item label="账号名称">
                <el-input v-model="form.loginName" placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info" v-on:click="getList">查询</el-button>
                <el-button type="success" v-on:click="add">新建</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="this.pageDatas.content"
                stripe
                border
        >
            <el-table-column
                    prop="date"
                    label="序号"
            >
                <template scope="scope">
                    {{ scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="fullName"
                    label="管理人员姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="cinemaGroup"
                    label="影院组名称">
                <template scope="scope">
                    {{scope.row.cinemaGroup?scope.row.cinemaGroup.name:''}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    prop="loginName"
                    label="账号名">
            </el-table-column>
            <el-table-column
                    prop="hasSubCount"
                    label="管理子账号数量">
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
                    :page-size="this.form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.pageDatas.totalElements">
            </el-pagination>
        </el-row>
        <add-dialog :dialogAdd="dialogAdd" v-on:addSuccess="getList"></add-dialog>
        <edit-dialog :dialogEdit="dialogEdit" @onRefirm="getList"></edit-dialog>
    </div>
</template>
<script>
    import addDialog from 'views/tabs/cinemaManager/add.vue'
    import editDialog from 'views/tabs/cinemaManager/edit.vue'
    import cinemaManagerApi from 'api/cinemaManagerApi'
    export default {
        components: {
            'add-dialog': addDialog,
            'edit-dialog': editDialog
        },
        data(){
            return {
                pageNumber:1,
                form: {
                    fullName:'',
                    loginName:'',
                    cinemaGroupId:'',
                    pageSize: 20,
                    pageNumber: 0
                },
                pageDatas: {
                    totalElements: 0
                },
                dialogAdd: {
                    dialogVisible: false,
                    data:{}
                },
                dialogEdit: {
                    dialogVisible: false,
                    data:{
                        password: '',
                        checkPassword: ''
                    }
                },
            }
        },
        methods: {
            handleEdit(index, row) {
                this.dialogEdit.data = JSON.parse(JSON.stringify(row))
                this.dialogEdit.dialogVisible =true
            },
            handleDelete(index, row) {
                console.log(row.cinemaGroup)
                this.$alert(`确定删除${row.cinemaGroup?row.cinemaGroup.name:''}的管理账号${row.loginName}吗？删除后该账号及其创建的普通账号都将无法登陆。`, '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if(action=='confirm')
                        {
                            cinemaManagerApi.delete({
                                id: row.id
                            }).then(res => {
                                this.pageDatas.content = this.pageDatas.content.filter(item => {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功，该账号将无法使用微信端运维管理平台'
                                    });
                                    return item.id !== row.id
                                })
                            })
                        }
                    }
                });
            },
            add(){
                this.dialogAdd.data = {
                    loginName: '',
                    cinemaGroupId: '',
                    fullName: '',
                    mobile: '',
                    password: '',
                    checkPassword: ''
                }
                this.dialogAdd.dialogVisible =true
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            pageCurrentChange(currentPage){
                this.form.pageNumber = currentPage - 1
                this.getList()
            },
            pageSizeChange(size){
                this.form.pageSize = size
                this.getList()
            },
            fetchData(){
                this.getList()
            },
            getList(){
                cinemaManagerApi.list(this.form).then(res=>{
                    this.pageDatas = res.resultData
                })
            }
        }
    }
</script>
<style lang='less'>
    .suggest-list {
        padding: 30px 20px 20px 20px;
        .pagination {
            margin-top: 30px;
        }
    }
</style>