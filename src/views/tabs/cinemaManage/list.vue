<template>
    <div class="page">
        <div class="seatch">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="影院组名称">
                    <el-select v-model="search.cinemaGroupId" placeholder="全部">
                        <group-options :showAll="true"></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="影院">
                    <el-input v-model="search.name" placeholder="">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="searchSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addFn">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <el-table :data="cinemaList" border stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="name" label="影院名称" width="180"></el-table-column>
                <el-table-column prop="cinemaGroup.name" label="归属影院组" width="180"></el-table-column>
                <el-table-column prop="createTime" :formatter="formateDate" label="创建时间" width="180"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="影院名称" prop="name" required>
                    <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院组名称" required prop="cinemaGroupId">
                    <el-select v-model="ruleForm.cinemaGroupId" placeholder="请选择影院组" > 
                        <group-options ></group-options>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn('ruleForm')">确 定</el-button>
    </span>
        </el-dialog>
    </div>
</template>

<script>
    import employeeApi from 'api/employeeApi'
    import cinemaApi from 'api/cinemaApi'
    export default {
        data(){
            var validateGroupId = (rule, value, callback) => {
                if (!value) {
                    callback('请选择影院组')
                } else {
                    callback()
                }
            }
            return {
                cinemaList: [],
                dialogVisible: false,
                ruleForm: {
                    type: 0,
                    name: '',
                    cinemaGroupId: ''
                },
                search: {
                    cinemaGroupId: '',
                    name: ''
                },
                rules: {
                    name: [{required: true, message: '请输入影院名称', trigger: 'blur'}, {
                        min: 3,
                        max: 8,
                        message: '长度在 2 到 8 个字符',
                        trigger: 'blur'
                    }],
                    cinemaGroupId: [{validator: validateGroupId, trigger: 'blur'}]
                }
            }
        },
        methods: {
            getData: function (params) {
                cinemaApi.listCinema(params).then(res => {
                    this.cinemaList = res.resultData.content
                })
            },
            searchSubmit(){
                var params = {}
                if (this.search.cinemaGroupId) {
                    params.cinemaGroupId = this.search.cinemaGroupId
                }
                if (this.search.name) {
                    params.name = this.search.name
                }
                this.getData(params)
            },
            addSubmit(){
                this.$prompt('影院组名称', '新建影院组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {

                }).catch(() => {

                });
            },
            formateDate(row){
                return new Date(row.createTime).format("yyyy-MM-dd")
            },
            addFn(_index, row){
                this.dialogVisible = true;
                this.ruleForm = {
                    type: 0,
                    name: '',
                    cinemaGroupId: ''
                }
            },
            editFn(_index, row){
                this.dialogVisible = true;
                this.ruleForm = JSON.parse(JSON.stringify(row))
                this.ruleForm.type = 1
            },
            deleteFn(_index, row){
                this.$confirm('此操作将永久删除该影院, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cinemaApi.delCinema({id: row.id}).then(res => {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                     },error=>this.$message.error(error))
                
                })
            },
            submitFn(ruleForm) {
                this.$refs['ruleForm'].validate((valid) => {
                    if(valid){
                        let params = {}
                        params.name = this.ruleForm.name
                        params.cinemaGroupId = this.ruleForm.cinemaGroupId
                        if(this.ruleForm.type){
                            params.id = this.ruleForm.id
                            cinemaApi.editCinema(params).then(res =>{
                                this.getData()
                            },error=>this.$message.error(error))
                        }else(
                            cinemaApi.addCinema(params).then(res =>{
                                this.getData()
                            },error=>this.$message.error(error))
                        )
                        this.dialogVisible = false;
                    }
                    
                })
        }
        },
    created:function () {
        this.getData()
    }
    }
</script>
