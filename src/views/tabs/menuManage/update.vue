<template>
    <div>
        <el-dialog :title="dialogData.type?'编辑菜单':'新增菜单'" :visible.sync="dialogData.dialogVisible" size="tiny">
    
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="菜单名称" required prop="name" >
                    <el-input v-model="ruleForm.name" placeholder="请输入菜单名称" ></el-input>
                </el-form-item>
                <el-form-item label="访问链接" required prop="url" >
                    <el-input v-model="ruleForm.url" placeholder="请输入访问链接" ></el-input>
                </el-form-item>
                <el-form-item label="样式/ID名称" required prop="iconFont" >
                    <el-input v-model="ruleForm.iconFont" placeholder="请输入样式/ID名称" ></el-input>
                </el-form-item>
                 <el-form-item label="同级序号" required prop="iconFont" >
                    <el-input v-model="ruleForm.iconFont" placeholder="请输入同级序号" ></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enable" required>
                    <el-radio class="radio" v-model="ruleForm.enable" label="true">正常</el-radio>
                    <el-radio class="radio" v-model="ruleForm.enable" label="false">停用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogData.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFn('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        dialogData: Object
    },
    data() {
        return {
            ruleForm: {},
            rules: {}
        }
    },
    methods:{
        submitFn(){

        }
    }
}
</script>

