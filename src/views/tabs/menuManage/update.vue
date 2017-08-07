<template>
    <div>
        <el-dialog :title="dialogData.type?'编辑菜单':'新增菜单'" :visible.sync="dialogData.dialogVisible" size="tiny" @open="initFn" >
    
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="菜单名称" required prop="name" >
                    <el-input v-model="ruleForm.name" placeholder="请输入菜单名称" ></el-input>
                </el-form-item>
                <el-form-item label="样式/ID名称"  prop="iconFont" >
                    <el-input v-model="ruleForm.iconFont" placeholder="请输入样式/ID名称" ></el-input>
                </el-form-item>
                 <el-form-item label="上级菜单" required prop="parentId" >
                     <el-select v-model="ruleForm.parentId" placeholder="请选择">
                        <el-option
                        v-for="item in menuDataObj"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
import menuApi from 'api/menuApi'
export default {
    props: {
        dialogData: Object,
        menuData:Array
    },
    data() {
        return {
            ruleForm: {
                parentId:'',
                enable:'true'
            },
            rules: {
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' },{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
                url: [{ required: true, message: '请输入菜单地址', trigger: 'blur' }],
                parentId:[{ type: 'number', required: true, message: '请选择岗位', trigger: 'change' }]
            }
        }
    },

    computed: {  
        data: function () {  
            var obj={};  
            obj=JSON.parse(JSON.stringify(this.dialogData)); //this.templateData是父组件传递的对象  
            return obj  
        },
        menuDataObj:function(){
            var obj={};  
            obj=JSON.parse(JSON.stringify(this.menuData)); //this.templateData是父组件传递的对象 
            obj.unshift({
                name:'一级菜单',
                id:0
            })
            return obj 
        }  
    },
    methods:{
        initFn(){
             this.menuDataObj&&this.menuDataObj.forEach((item,index)=>{
                    if(item.hierarchy===3){
                        item.name = '----'+item.name
                    }
                    if(item.hierarchy===2){
                        item.name = '--'+item.name
                    }
                    if(item.id === this.dialogData.data.id){
                        this.menuDataObj.splice(index,1)
                    }
                })
            if(this.dialogData.type){
                console.log('data',this.data.data)
                this.ruleForm = this.data.data
                this.ruleForm.enable = this.data.data.enable.toString()
                             
               
                if(!this.data.data.parentId){
                    this.ruleForm.parentId =0
                }
            }else{
                this.ruleForm ={
                    parentId:'',
                    enable:'true'
                }
            }
        },
        submitFn(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    if(this.dialogData.type){
                        var params = {}
                        params.id = this.data.data.id
                        params.parentId = this.ruleForm.parentId
                        params.name = this.ruleForm.name
                        params.enable = this.ruleForm.enable
                        params.iconFont = this.ruleForm.iconFont
                        menuApi.updateMenu(params).then(res=>{
                            this.$emit('SuccessM',true)
                        },error=>this.$message.error(error))
                    }else{
                        menuApi.AddMenu(this.ruleForm).then(res=>{
                            this.$emit('SuccessM',true)
                        },error=>this.$message.error(error))
                    }
                   
                }
            })
        }
    }
}
</script>

