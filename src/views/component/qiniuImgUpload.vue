<template>
    <div>
        <el-upload
                action="http://up-z2.qiniu.com/"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :data="form"
                :on-success="success"
                :on-error="error">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import httpApi from 'api/httpApi'
    const TOKEN_URL = '/qiniu/getToken.do';
    export default {
        props: ['value'],
        data(){
            let qiniuHost = this.$storage.getItem(this.$storage.KEY_USER_DETAIL).qiniuHost;
            let fileList =[]
            for(let i =0;i<this.value.length;i++){
                fileList.push({
                    name:this.value[i],
                    url:this.value[i],
                    status: 'finished'
                })
            }
            return {
                qiniuHost:qiniuHost,
                fileList: fileList,
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    token:'',
                    key: ''
                }
            }
        },
        watch: {
            value: function (val) {
                console.log(val)
                let fileList =[]
                for(let i in val){
                    fileList.push({
                        name:val[i],
                        url:val[i],
                        status: 'finished'
                    })
                }
                this.fileList=fileList
            }
        },
        methods: {
            handleRemove(file, fileList) {
                let newValue=  this.value.filter(item=>{
                    return item !== file.url;
                })
                console.log('1111111',newValue);
                this.$emit('input',newValue)
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeUpload(file){
                let prefix = new Date(file.lastModified).format('yyyyMMddhhmmss').toString()
                let suffix = file.name;
                return httpApi.postForm(TOKEN_URL).then(res => { //获取最新的上传token
                    this.form.token = res.resultData.token
                    this.form.key = encodeURI(`csm/images/${prefix}_${suffix}`);
                })
            },
            success(response, file){
                this.fileList.push(file)
                let url ;
                if(response.key)
                {
                    url =`${this.qiniuHost}/${encodeURI(response.key)}`
                }else{
                    url =`${this.qiniuHost}/${encodeURI(response.hash)}`
                }
                this.value.push(url)
                this.$emit('input',this.value)
            },
            error(err){
                this.$message({
                    message: err,
                    type: 'error'
                })
            }
        }
    }
</script>