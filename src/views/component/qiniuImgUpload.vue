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
                :on-error="error"
                :disabled="disabled"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="small">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import httpApi from 'api/httpApi'
    const TOKEN_URL = '/qiniu/getToken.do';
    export default {
        props: ['value', 'disabled'],
        data(){
            let qiniuHost = this.$storage.getItem(this.$storage.KEY_USER_DETAIL).qiniuHost;
            let fileList = []
            for (let i = 0; i < this.value.length; i++) {
                fileList.push({
                    name: this.value[i],
                    url: this.value[i],
                    status: 'finished'
                })
            }
            return {
                qiniuHost: qiniuHost,
                fileList: fileList,
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    token: '',
                    key: ''
                }
            }
        },
        watch: {
            value: function (val) {
                console.log(val)
                let fileList = []
                for (let i = 0; i < val.length; i++) {
                    fileList.push({
                        name: val[i],
                        url: val[i],
                        status: 'finished'
                    })
                }
                this.fileList = fileList;
            }
        },
        methods: {
            handleRemove(file, fileList) {
                if (file) {
                    this.fileList = fileList
                    let newValue = []
                    for (let i = 0; i < fileList.length; i++) {
                        newValue.push(fileList[i].url)
                    }
                    this.$emit('input', newValue)
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeUpload(file){
                if (this.fileList.length >= 5) {
                    this.$message({
                        message: '图片最多只能上传5张',
                        type: 'error'
                    })
                    return false
                }
                if (!(file.type == 'image/jpeg' || file.type == 'image/png')) {
                    this.$message({
                        message: '图片只能是 JPG或PNG格式',
                        type: 'error'
                    })
                    return false
                }
                if (file.size / 1024 / 1024 > 4) {
                    this.$message({
                        message: '图片大小不能超过 4MB!',
                        type: 'error'
                    })
                    return false
                }
                for (let i = 0; i < this.fileList.length; i++) {
                    if (file.name === this.fileList[i].name) {
                        return false
                    }
                }
                let prefix = new Date(file.lastModified).format('yyyyMMddhhmmss').toString()
                let suffix = file.name;
                return httpApi.postForm(TOKEN_URL).then(res => { //获取最新的上传token
                    this.form.token = res.resultData.token
                    this.form.key = encodeURI(`csm/images/${prefix}_${suffix}`);
                })
            },
            success(response, file){
//                this.fileList.push(file)
                let url;
                if (response.key) {
                    url = `${this.qiniuHost}/${encodeURI(response.key)}`
                } else {
                    url = `${this.qiniuHost}/${encodeURI(response.hash)}`
                }
                this.value.push(url)
                this.$emit('input', this.value)
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