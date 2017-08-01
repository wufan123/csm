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
      							
      <div class="content">
         <el-table   :data="employeeList"   border    style="width: 100%">
            <el-table-column  type="index" label="序号"  width="100"></el-table-column>
            <el-table-column   prop="fullName"    label="职员姓名"   width="180">  </el-table-column>
            <el-table-column   prop="position.positionName"   label="岗位"  width="180">  </el-table-column>
            <el-table-column   prop="loginName"   label="职员账号"  width="180">  </el-table-column>
            <el-table-column    label="管理影院组" :formatter="formateCinema"  width="180">  </el-table-column>
            <el-table-column   prop="hireDate" :formatter="formateDate"   label="入职时间"  width="180">  </el-table-column>
            <el-table-column   label="操作"  > 
                <template scope="scope">
                    <el-button type="text" class="t-info">
                        编辑</el-button>
                    <el-button type="text" class="t-danger" @click="deleteEmployee(scope.$index)">删除</el-button>
                </template>    
            </el-table-column>
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
        },
        formateDate(row){
           return new Date(row.hireDate).format("yyyy-MM-dd")
        },
        formateCinema(){
            
        },
        deleteEmployee(_index){
             this.$confirm('此操作将永久删除该职员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    employeeApi.delEmployee({id:this.employeeList[_index].id}).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                     })
                
                })
        }
    },
    created:function () {
        console.log('时间',new Date(1502121600000).format("yyyy-MM-dd"))
        this.getData()
    }
}
</script>
