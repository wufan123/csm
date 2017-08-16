<template>
    <div class="tab-form add-form">
        <el-row class="tab-pane-title">
            编辑建议
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
                <el-form-item label="状态" prop="status" required>
                    <el-select v-model="form.status" placeholder="请选择" >
                        <el-option label="新建" value="1"></el-option>
                        <el-option label="不采纳" value="2"></el-option>
                        <el-option label="采纳" value="3"></el-option>
                        <el-option label="已经实现" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源影院组" prop="cinemaGroupId" required>
                    <el-select v-model="form.cinemaGroupId"  placeholder="请选择" v-on:change="getCinemas()">
                        <group-options ></group-options>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源影院" prop="cinemaId" required>
                    <el-select v-model="form.cinemaId" placeholder="请选择" >
                        <cinema-options  ref="cinemaOp"></cinema-options>
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
        props: {
            viewState: {
                type: Object,
            }
        },
        data(){
            let viewData =this.viewState.data
            return {
                form:{
                    id:viewData.id,
                    suggestSource:viewData.suggestSource?viewData.suggestSource.toString():'',
                    status:viewData.status?viewData.status.toString():'',
                    title:viewData.title?viewData.title:'',
                    cinemaId:viewData.cinemaId?viewData.cinemaId:'',
                    cinemaGroupId:viewData.cinemaGroupId?viewData.cinemaGroupId:'',
                    content:viewData.content?viewData.content:'',
                    suggestAttaches:viewData.suggestAttaches?viewData.suggestAttaches.split(','):[]
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
                    status:[
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
                        suggestApi.save(this.form).then(res=>{
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
                this.$emit('view', {
                    type:'list'
                })
            },
            fetchData(){
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            }
        }
    }
</script>
<style lang="less">

</style>