<<template>
  <div class="page">
      <div class="seatch">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="岗位">
                <el-select v-model="formInline.region" placeholder="全部">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.state" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职员姓名">
                <el-input v-model="formInline.user" ></el-input>
            </el-form-item>
            <el-form-item label="入职时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2"></el-date-picker>
                </el-col>
            </el-form-item>
            <p>
                <el-form-item>
                    <el-button type="info" @click="seatchSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addSubmit">新增</el-button>
                </el-form-item>
            </p>
          </el-form>
      </div>
      	职员姓名	岗位	职员账号	状态	管理影院组	最后登录时间	操作
      <div class="content">
         <el-table   :data="employeeList"   border    style="width: 100%">
            <el-table-column  prop="date" label="序号"  width="180"></el-table-column>
            <el-table-column   prop="name"    label="姓名"   width="180">  </el-table-column>
            <el-table-column   prop="address"   label="地址">  </el-table-column>
        </el-table>    
      </div>  

  </div>
</template>
<<script>
import employeeApi from 'api/employeeApi'
export default {
    data(){
        return{
            employeeList:[],
            formInline: {
                user: '',
                region: '',
                date1:null,
                date2:null,
                state:''
                }
        }
    },
    methods:{
        getData:function () {
            employeeApi.ListEmployee().then(res => {
                this.employeeList = res.resultData.content
            })
        },
        seatchSubmit(){

        },
        addSubmit(){
            this.$emit('setType','add')
        }
    },
    created:function () {
        this.getData()
    }
}
</script>
