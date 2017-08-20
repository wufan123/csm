<template>
    <div class="tab-form add-form">
        <el-row class="tab-pane-title">
            新建建议
        </el-row>
        <el-row>
            <el-form ref="form" :model="form" label-width="100px" :rules="rules" >
                <el-form-item label="具体途径" prop="suggestSource" required>
                    <el-select v-model="form.suggestSource" placeholder="请选择" >
                        <el-option label="线下客人反馈" value="1"></el-option>
                        <el-option label="线上客人反馈" value="2"></el-option>
                        <el-option label="影城工作人员反馈" value="3"></el-option>
                        <el-option label="其他" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源影院组" prop="cinemaGroupId" required>
                    <el-select v-model="form.cinemaGroupId"  placeholder="请选择" v-on:change="getCinemas()">
                        <group-options ></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源影院" prop="cinemaId" required>
                    <el-select v-model="form.cinemaId" placeholder="请选择" >
                        <cinema-options   ref="cinemaOp"></cinema-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" required prop="title">
                    <el-input v-model="form.title" placeholder="请输入">
                    </el-input>
                </el-form-item>
                <el-form-item label="内容" required prop="content">
                    <el-input
                            v-model="form.content"
                            type="textarea"
                            :rows="12"
                            placeholder="请输入内容"
                            >
                    </el-input>
                </el-form-item>
                <el-form-item label="截图">
                    <qiniu-img v-model="form.suggestAttaches"></qiniu-img>
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button type="primary" v-on:click="save">保存</el-button>
                    <el-button v-on:click="close">关闭不保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import suggestApi from 'api/suggestApi'
    export default {
        data(){
            return {
                form:{
                    suggestSource:'',
                    status:'',
                    title:'',
                    cinemaId:'',
                    cinemaGroupId:'',
                    content:'',
                    suggestAttaches:[]
                },
                dialogImageUrl: '',
                dialogVisible: false,
                rules:{
                    cinemaGroupId:[
                        { type:'number', required: true, message: '请选择来源影院组', trigger: 'blur' }
                    ],
                    cinemaId:[
                        { type:'number', required: true, message: '请选择来源影院', trigger: 'blur' }
                    ],
                    content:[
                        { required: true, message: '请输入建议内容', trigger: 'blur' },
                        { max: 200, message: '长度不超过200 个字符', trigger: 'blur' }
                    ],
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    suggestSource:[
                        { required: true, message: '请选择具体途径', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getCinemas(){
                this.form.cinemaId=''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        suggestApi.create(this.form).then(res=>{
                            this.$emit('view', {
                                type:'list'
                            })
                        })
                    } else {
                        return false;
                    }
                });
            },
            close(){
                this.$confirm('你确定放弃新建建议吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: "你放弃了新建建议",
                        type: 'info'
                    })
                    this.$emit('view', {
                        type:'list'
                    })
                })
            }
        }
    }
</script>
<style lang="less">

</style>