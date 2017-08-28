<template>
    <div>
        <div class="tab-form add-form">
            <el-row class="tab-pane-title">
                新建客诉
            </el-row>
            <el-row>
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="来源影院组" prop="cinemaGroupId" required>
                        <el-select v-model="form.cinemaGroupId" placeholder="请选择" v-on:change="getCinemas">
                            <el-option v-for="(item,index) in cinemaGroupOptions" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源影院" prop="cinemaId" required>
                        <el-select v-model="form.cinemaId" placeholder="请选择">
                            <el-option v-for="(item,index) in cinemasOptions" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="content" label="问题描述" required >
                        <el-input
                                type="textarea"
                                :rows="12"
                                placeholder="请输入内容"
                                v-model="form.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否星标" prop="isStartHandle" required>
                        <el-radio class="radio" v-model="form.isStar" label="true">是</el-radio>
                        <el-radio class="radio" v-model="form.isStar" label="false">否</el-radio>
                    </el-form-item>
                    <el-form-item label="运维附件">
                        <qiniu-img v-model="form.workorderAttaches"></qiniu-img>
                    </el-form-item>
                    <el-form-item class="form-button">
                        <el-button type="primary" v-on:click="save">保存</el-button>
                        <el-button type="primary" v-on:click="goHandle">保存并开始处理</el-button>
                        <el-button v-on:click="close">关闭不保存</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    import workOrderApi from 'api/workOrderApi'
    export default {
        data(){
//            this.userDetail = this.
            return {
                cinemaGroupOptions:[],
                cinemasOptions:[],
                form:{
                    initiatorId:this.$storage.getItem(this.$storage.KEY_USER_DETAIL).id,
                    cinemaGroupId:'',
                    cinemaId:'',
                    content:'',
                    isStar:'false',
                    workorderAttaches:[]
                },
                dialogImageUrl: '',
                dialogVisible: false,
                rules:{
                    cinemaGroupId:[
                        { type:'number', required: true, message: '请输入来源影院组', trigger: 'change' }
                    ],
                    cinemaId:[
                        { type:'number', required: true, message: '请输入来源影院', trigger: 'change' }
                    ],
                    content:[
                        { required: true, message: '请描述问题', trigger: 'blur' },
                        { max: 200, message: '长度不超过200个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getCinemas(){
                this.cinemasOptions=[];
                cinemaApi.listCinema({
                    cinemaGroupId:this.form.cinemaGroupId
                }).then(res=>{
                    let ops =[]
                    ops = ops.concat(res.resultData.content);
                    this.cinemasOptions = ops
                })
            },
            fetchData(){
                cinemaApi.listCinemaGroup().then(res => {
                    let ops =[]
                    ops = ops.concat(res.resultData.content);
                    this.cinemaGroupOptions = ops;
                })
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
                        workOrderApi.create(this.form).then(res=>{
                            this.$message({
                                message: `创建客诉成功，客诉编号${res.resultData.orderNo}`,
                                type: 'info'
                            })
                            this.$emit('view', {
                                type:'list'
                            })
                        })
                    } else {
                        return false;
                    }
                });
            },
            goHandle(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        workOrderApi.create(this.form).then(res=>{
                            this.$emit('view', {
                                type:'handle',
                                data:res.resultData
                            })
                        })
                    } else {
                        return false;
                    }
                });
            },
            close(){
                this.$confirm('你确定放弃新建客诉订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: "你放弃了新建客诉订单",
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