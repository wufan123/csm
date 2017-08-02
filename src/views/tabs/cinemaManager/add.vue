<template>
    <div>
        <el-dialog
                title="新建管理账号"
                :visible.sync="dialogAdd.dialogVisible"
                size="tiny"
                :before-close="handleClose">
            <span>
                <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="账号" required>
                    <el-input v-model="form.region" placeholder="请选择">
                    </el-input>
                </el-form-item>
                <el-form-item label="归属影院组" required>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理人员姓名" required>
                    <el-input v-model="form.region" placeholder="请选择">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码" required>
                    <el-input v-model="form.region" placeholder="请选择">
                    </el-input>
                </el-form-item>
                <el-form-item label="设置初始密码" required>
                    <el-input v-model="form.region" placeholder="请选择">
                    </el-input>
                </el-form-item>
                <el-form-item label="重复初始密码" required>
                    <el-input v-model="form.region" placeholder="请选择">
                    </el-input>
                </el-form-item>
                </el-form>
            </span>
            <span slot="footer" >
             <el-button @click="dialogAdd.dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogAdd.dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            dialogAdd:{
                type:Object,//该对象包含属性字段 title id
                required:true
            }
        },
        data(){
            return {
                form: {}
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }

    }
</script>