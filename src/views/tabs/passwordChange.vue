<<template>
  <div class="page tab-form">
    <div class="p-title tab-pane-title">密码修改</div>
     <div class="h20"></div>
    <div class="content">
       <el-form :model="form" :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
           <input type="text" style="display:none">
           <el-form-item  prop="initPass">
                <el-input type="password" v-model="form.initPass" placeholder="初始密码"></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
                <el-input type="password" v-model="form.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>
<script>
import commonApi from 'api/commonApi'

export default {
  data(){
    
      var vaildateInitPass = (rule, value, callback) => {
        
        let userInfo = _vue.$storage.getUser()
        console.log('密码',userInfo)
        if (value === '') {
          callback(new Error('初始密码不能为空'));
        }else if(value != userInfo.password){
          callback(new Error('初始密码不正确'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
        //   if (this.form.checkPass !== '') {
        //     this.$refs.form.validateField('checkPass');
        //   }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
          form: {
            pass: '',
            checkPass: '',
            initPass: ''
        },
        rules2: {
            initPass: [ { validator: vaildateInitPass, trigger: 'blur' } ],
            pass: [ { validator: validatePass, trigger: 'blur' } ],
            checkPass: [ { validator: validatePass2, trigger: 'blur' } ]
        }
      }
  },
  methods:{
      submitForm(form) {
        let userInfo = this.$storage.getUser()
        this.$refs[form].validate((valid) => {
          if (valid) {
              var params = {}
              params.oldPassword = this.form.initPass
              params.newPassword = this.form.pass
            commonApi.updatepassword(params).then(res =>{
              
              let newUserInfo = userInfo
              newUserInfo.password = this.form.pass
                this.$storage.setUser(newUserInfo)
                this.$refs[form].resetFields();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
            })
          } else {
            return false;
          }
        });
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      }
  }
}
</script>

<style lang="less" scoped>
    .demo-ruleForm{width: 500px;margin: 80px auto;}
</style>

