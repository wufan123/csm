<<template>
  <div class="page tab-form">
    <div class="p-title tab-pane-title">头像修改</div>
     <div class="h20"></div>
    <div class="content">
        <div class="box">
            <img :src="image" class="img-avatar">
            <h4>admin</h4>
            <p>上次登录：{{new Date(userInfo.preLoginTime).format("yyyy-MM-dd hh:mm:ss")}}</p>
            <div class="h20"></div>
            <div class="h20"></div>
            <el-button type="primary" :plain="true"  @click="imagecropperShow=true" style="width:100%">上传头像</el-button>
            <div class="h20"></div>
            <el-button type="primary"  @click="updateAvatar"  style="width:100%">保存</el-button>
            <ImageCropper :width="300" :height="300" @close='close' @crop-success="cropSuccess"
            :key="imagecropperKey" v-show="imagecropperShow" />
        </div>
    </div>
  </div>
</template>
<script>
import ImageCropper from '../component/ImageCropper/index.vue';
import {putb64} from 'utils/qiniu'
import commonApi from 'api/commonApi'
export default {
  components: { ImageCropper },
  data() {
    return {
        imagecropperShow: false,
        imagecropperKey: 0,
        image: '',
        userInfo:{}
         }
    },
    methods: {
        cropSuccess(resData) {
            let vm = this;
            this.imagecropperShow = false;
            this.imagecropperKey = this.imagecropperKey + 1;
            let timeStamp = this.$util.getTimestamp(new Date())
             let fileKey = 'csm/images/'+timeStamp+'/'+ this.$util.randomString()
            this.getQiNiuToken(res => {
                let result = res.resultData
                putb64(resData,-1,fileKey,result, url =>{
                  if(!url){
                      return;
                  }
                 vm.image = url
              })
            })
            
        },
        getQiNiuToken(callback){
            commonApi.getToken().then(res => {
                callback && callback(res)
            })
        },
        updateAvatar(){
            let params ={}
           
            params.userId = this.userInfo.id
            params.imgFile = this.image;
            commonApi.updateAvatar(params).then(res => {
                this.$emit('setAdvertImg',this.image)
                this.userInfo.headImageLink =this.image
                  this.$storage.setItem('userDetail',this.userInfo)
                this.$message({
                message: '修改成功',
                type: 'success'
                });
            })
        },
        close() {
            this.imagecropperShow = false;
        }
    },
    created(){
        this.userInfo = this.$storage.getItem('userDetail')
        this.image = this.userInfo.headImageLink
    }
}
</script>
<<style lang="less">
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area{height:125px!important;}
</style>

<style lang="less" scoped>

    .box{width:200px;    display: flex; flex-direction: column;  justify-content: center;  align-items: center;margin:80px auto;
        img{width:120px;height:120px;    border-radius: 50%;}
    }
</style>

