<template>
    <div>
        <el-dialog
                title="编辑管理账号"
                :visible="dialogEdit.dialogVisible"
                size="tiny"
                :before-close="handleClose">
            <span>
                <el-form ref="form" :model="dialogEdit.data" label-width="130px" :rules="rules" >
                <el-form-item label="账号" required prop="loginName" >
                    <el-input v-model="dialogEdit.data.loginName" placeholder="请输入账号" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="管理子账号数量" required prop="hasSubCount" >
                    <el-input v-model="dialogEdit.data.hasSubCount" placeholder="管理子账号数量" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="归属影院组" required prop="cinemaGroupId">
                    <el-select v-model="dialogEdit.data.cinemaGroupId" placeholder="请选择" disabled>
                        <group-options :showAll="true"></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理人员姓名" required prop="fullName">
                    <el-input v-model="dialogEdit.data.fullName" placeholder="请输入管理人员姓名">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码" required prop="mobile">
                    <el-input v-model="dialogEdit.data.mobile" placeholder="请输入手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item label="设置初始密码" prop="password">
                    <el-input type="password" v-model="dialogEdit.data.password" placeholder="不超过8个字符,数字,字母均可">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认初始密码"  prop="checkPassword">
                    <el-input type="password" v-model="dialogEdit.data.checkPassword" placeholder="请确认初始密码">
                    </el-input>
                </el-form-item>
                </el-form>
            </span>
            <span slot="footer">
             <el-button @click="dialogEdit.dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import cinemaManagerApi from 'api/cinemaManagerApi'
    export default {
        props: {
            dialogEdit: {
                type: Object,
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
                        {required: true, message: '请输入账号', trigger: 'blur'},{ min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
                    ],
                    fullName: [
                        {required: true, message: '请输入管理人员姓名', trigger: 'blur'},{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
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
                        { validator: (rule, value, callback) => {
                            if (value&&/[a-zA-Z0-9]{9,}.*/.test(value)) {
                                callback(new Error('不超过8个字符,数字,字母均可'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: (rule, value, callback) => {
                            if (value !== this.dialogEdit.data.password) {
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
                        cinemaManagerApi.save({
                            id:this.dialogEdit.data.id,
                            fullName:this.dialogEdit.data.fullName,
                            password:this.dialogEdit.data.password,
                            mobile:this.dialogEdit.data.mobile,
                        }).then(res=>{
                            this.dialogEdit.dialogVisible = false
                            this.$emit('onRefirm')
                        })
                        this.$emit('dialog', {
                            type: 'edit'
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.dialogEdit.dialogVisible = false
                    })
                    .catch(_ => {
                    });
            }
        }

    }
</script>