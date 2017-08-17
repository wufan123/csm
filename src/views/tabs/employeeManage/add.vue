<<template>
  <div class="page">
    <div class="p-title">新建职员 <em class="notice">注意：新建职员初始密码为123456</em>  </div>
     <div class="h20"></div>
    <div class="content addForm">
      <el-form :rules="rules" ref="employee"   :model="employee" label-width="100px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="职员姓名" required  prop="fullName">
              <el-input v-model="employee.fullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
               <el-form-item label="手机号码"  prop="mobile" >
                <el-input v-model="employee.mobile"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="职员账号" required prop="loginName">
              <el-input v-model="employee.loginName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
               <el-form-item label="身份证号" prop="cardId" >
                <el-input v-model="employee.cardId"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入职时间" prop="hireDate" >
               <el-date-picker type="date" placeholder="入职时间" v-model="employee.hireDate"></el-date-picker>
             </el-form-item>
          </el-col>
          <el-col :span="8">
               <el-form-item label="职员状态" prop="enable">
                 <el-radio class="radio" v-model="employee.enable" label="true">正常</el-radio>
                  <el-radio class="radio" v-model="employee.enable" label="false">停用</el-radio>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="管理影院组" required prop="cinemaGroupIds">
            <el-checkbox-group  v-model="employee.cinemaGroupIds">
              <el-checkbox v-for="item in cinemaGroupList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="所属岗位" required prop="positionId">
              <el-select v-model="employee.positionId" placeholder="请选择">
               <el-option   v-for="item in positionList"  :key="item.id"
                  :label="item.positionName"  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <div class="h10"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('employee')">立即创建</el-button>
          <el-button type="primary" :plain="true" @click="closeFn()" >关闭不保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<<script>
import employeeApi from 'api/employeeApi'  
import cinemaApi from 'api/cinemaApi'
export default {
  data(){
    
    var validateMobile = (rule, value, callback) =>{
       if (value&&!_vue.$util.isNumber(value)) {
          callback(new Error('请输入数字值'));
        }else if(value&&!_vue.$util.isPhone(value)){
        callback(new Error('请输入正确的手机号'));
        }else{
          callback()
        }
    }
    var validateCardId = (rule, value, callback) =>{
       if(value&&!_vue.$util.isIDCard(value)){
          callback(new Error('请输入正确的身份证号'));
        }else{
          callback()
        }
    }
    return{
      employee:{
        hireDate:null,
        fullName:'',
        loginName:'',
        cardId:'',
        enable:'true',
        cinemaGroupIds:[],
        positionId:''
      },
      cinemaGroupList:[],
      positionList:[],
      rules:{
        fullName: [{ required: true, message: '请输入职员姓名', trigger: 'blur' },{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
        mobile: [{ validator: validateMobile, trigger: 'blur' } ],
        loginName:[{ required: true, message: '请输入职员账号', trigger: 'blur' },{ min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }],
        cardId:[{ validator: validateCardId, trigger: 'blur' }],
        cinemaGroupIds:[{ type: 'array', required: true, message: '请至少选择一个影院组', trigger: 'change' }],
        positionId:[{ type: 'number', required: true, message: '请选择岗位', trigger: 'change' }]
      }
    }
  },
  methods:{
    submitForm(employee){
      this.$refs[employee].validate((valid) => {
          if (valid) {
            if(this.employee.hireDate){
                this.employee.hireDate = new Date(this.employee.hireDate).format("yyyy-MM-dd")
            }else{
              delete this.employee.hireDate;
            }
            employeeApi.AddEmployee(this.employee).then(res => {
              this.$emit('setType',{
              type:'list'
            })
            },error=>this.$message.error(error))
          } else {
            console.log('error submit!!');
            
            return false;
          }
        });
    },
    closeFn(){
      this.$emit('setType',{
        type:'list'
      })
    },
    getCinemaList(){
      cinemaApi.listCinemaGroup().then(res => {
        this.cinemaGroupList = res.resultData.content
      })
    }
    
  },
  created(){
    this.getCinemaList()
    this.positionList = this.$storage.getItem('position')
  }
}
</script>
<style lang="less">
.addForm{
  .el-date-editor{width: 100%!important;}
  .el-form-item{margin:10px 20px;}
}
    
</style>

