<template>
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
                    <el-radio class="radio" v-model="form.isStartHandle" label="true">是</el-radio>
                    <el-radio class="radio" v-model="form.isStartHandle" label="false">否</el-radio>
                </el-form-item>
                <el-form-item label="运维附件">
                    <div v-for="item in dialogImageUrl">
                        <img :src="item">
                    </div>
                    <div class="el-upload el-upload--picture-card">
                        <i class="el-icon-plus"></i>
                        <input type="file" name="file"  v-on:change="updateLoadImg()" ref="inputer"  id="imageFiles" multiple="multiple">
                    </div>
                    
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button type="primary" v-on:click="save">保存</el-button>
                    <el-button type="primary" v-on:click="goHandle">保存并开始处理</el-button>
                    <el-button v-on:click="close">关闭不保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    import workOrderApi from 'api/workOrderApi'
    import commonApi from 'api/commonApi'
    import {putb64} from 'utils/qiniu'
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
                    isStartHandle:'false',
                    imageFiles:''
                },
                QiniuData:{ },
                dialogImageUrl: [],
                dialogVisible: false,
                rules:{
                    cinemaGroupId:[
                        { type:'number', required: true, message: '请输入来源影院组', trigger: 'blur' }
                    ],
                    cinemaId:[
                        { type:'number', required: true, message: '请输入来源影院', trigger: 'blur' }
                    ],
                    content:[
                        { required: true, message: '请描述问题', trigger: 'blur' }
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
            updateLoadImg(){
                 let vm = this
                let objUrl =null
                let filepath = event.target.value
                let inputDOM = this.$refs.inputer;
                let file = inputDOM.files[0];
                let timeStamp = this.$util.getTimestamp(new Date())
                let fileKey = 'csm/images/'+timeStamp+'/'+ this.$util.randomString()
                this.getQiNiuToken(res => {
                    let result = res.resultData
                    vm.$util.picBase64(file,imgData => {
                        console.log('data',imgData)
                        putb64(imgData,-1,fileKey,result, url =>{
                            if(!url){
                                return;
                            }
                            vm.dialogImageUrl.push(url)
                        })
                    })
                    
                })
            },
            getQiNiuToken(callback){
                commonApi.getToken().then(res => {
                    callback && callback(res)
                })
            },
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        workOrderApi.create(this.form).then(res=>{
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
                this.$emit('view', {
                    type:'list'
                })
            },
            close(){
                this.$emit('view', {
                    type:'list'
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-upload{
        input{position: absolute; width: 150px;  height: 150px;  top: 0;  left: 0;cursor: pointer; opacity: 0;}
    }
</style>