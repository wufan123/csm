<template>
    <div>
        <el-dialog
                title="新建管理账号"
                :visible="dialogAdd.dialogVisible"
                size="tiny"
                :before-close="handleClose">
            <span>
                <el-form ref="form" :model="dialogAdd.data" label-width="120px" :rules="rules">
                <el-form-item label="账号" required prop="loginName">
                    <el-input v-model="dialogAdd.data.loginName" placeholder="请输入账号">
                    </el-input>
                </el-form-item>
                <el-form-item label="归属影院组" required prop="cinemaGroupId">
                    <el-select v-model="dialogAdd.data.cinemaGroupId" placeholder="请选择">
                        <group-options ></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理人员姓名" required prop="fullName">
                    <el-input v-model="dialogAdd.data.fullName" placeholder="请输入管理人员姓名">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码" required prop="mobile">
                    <el-input v-model="dialogAdd.data.mobile" placeholder="请输入手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item label="设置初始密码" required prop="password">
                    <el-input type="password" v-model="dialogAdd.data.password" placeholder="不超过8个字符,数字,字母均可">
                    </el-input>
                </el-form-item>
                <el-form-item label="重复初始密码" required prop="checkPassword">
                    <el-input type="password" v-model="dialogAdd.data.checkPassword" placeholder="请确认初始密码">
                    </el-input>
                </el-form-item>
                </el-form>
            </span>
            <span slot="footer">
             <el-button @click="dialogAdd.dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import cinemaManagerApi from 'api/cinemaManagerApi'
    export default {
        props: {
            dialogAdd: {
                type: Object,//该对象包含属性字段 title id
                required: true
            }
        },
        data(){
            return {
                rules: {
                    cinemaGroupId: [
                        {type: 'number', required: true, message: '请选择来源影院组', trigger: 'blur'}
                    ],
                    loginName: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    fullName: [
                        {required: true, message: '请输入管理人员姓名', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        { validator: (rule, value, callback) => {
                            if (!/^1[34578]\d{9}$/.test(value)) {
                                callback(new Error('手机号码不合法'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入初始密码', trigger: 'blur'},
                        { validator: (rule, value, callback) => {
                            if (/[a-zA-Z0-9]{8,}.*/.test(value)) {
                                callback(new Error('不超过8个字符,数字,字母均可'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ],
                    checkPassword: [
                        {required: true, message: '请确认初始密码', trigger: 'blur'},
                        { validator: (rule, value, callback) => {
                            if (value !== this.dialogAdd.data.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        cinemaManagerApi.create(this.dialogAdd.data).then(res=>{
                            this.dialogAdd.dialogVisible = false
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.dialogAdd.dialogVisible = false
                    })
                    .catch(_ => {
                    });
            }
        }

    }
</script>