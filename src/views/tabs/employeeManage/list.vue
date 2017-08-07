<<template>
  <div class="page">
      <div class="seatch">
          <el-form :inline="true" :model="search" class="demo-form-inline">
               <el-form-item label="岗位">
                    <el-select v-model="search.positionId" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option   v-for="item in positionList"  :key="item.id"
                        :label="item.positionName"  :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="search.enable" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职员姓名">
                <el-input v-model="search.fullName" ></el-input>
            </el-form-item>
            <el-form-item label="入职时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="search.timeStart"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="search.timeEnd"></el-date-picker>
                </el-col>
            </el-form-item>
            <p>
                <el-form-item>
                    <el-button type="info" @click="searchSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addSubmit">新增</el-button>
                </el-form-item>
            </p>
          </el-form>
      </div>
      							
      <div class="content">
         <el-table   :data="employeeList"   border  stripe  style="width: 100%">
            <el-table-column  type="index" label="序号"  width="100"></el-table-column>
            <el-table-column   prop="fullName"    label="职员姓名"   width="180">  </el-table-column>
            <el-table-column   prop="position.positionName"   label="岗位"  width="180">  </el-table-column>
            <el-table-column   prop="loginName"   label="职员账号"  width="180">  </el-table-column>
            <el-table-column    label="管理影院组" :formatter="formateCinema"  width="180">  </el-table-column>
            <el-table-column   prop="hireDate" :formatter="formateDate"   label="入职时间"  width="180">  </el-table-column>
            <el-table-column   label="操作"  > 
                <template scope="scope">
                    <el-button type="text" class="t-info" @click="editEmployee(scope.$index)">编辑</el-button>
                    <el-button type="text" class="t-danger" @click="deleteEmployee(scope.$index)">删除</el-button>
                </template>    
            </el-table-column>
        </el-table>   
         <div class="h20"></div>
         <el-row type="flex" justify="end" class="pagination">
             <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="pageNumber"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="this.page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.page.totalElements">
                </el-pagination>
        </el-row> 
      </div>  

  </div>
</template>
<<script>
import employeeApi from 'api/employeeApi'
import positionApi from 'api/positionApi'
export default {
    data(){
        return{
            employeeList:[],
            pageNumber:1,
            page:{
                pageSize:10,
                pageNumber:0,
                totalElements:0
            },
            positionList:[],
            search: {
                positionId: null,
                enable: null,
                timeStart:null,
                timeEnd:null,
                fullName:''
            }
        }
    },
    methods:{
        getData:function (params) {
            if(!params){
                params = {}
            }
            params.pageNumber = this.page.pageNumber
            params.pageSize = this.page.pageSize
            employeeApi.ListEmployee(params).then(res => {
                this.page.totalElements = res.resultData.totalElements
                this.employeeList = res.resultData.content
            },error=>this.$message.error(error))
        },
        searchSubmit(){
            var params = {}
           if(this.search.positionId){
               params.positionId = this.search.positionId
           }
           if(this.search.enable){
                params.isEnable = this.search.enable==1?true:false
           }
           if(this.search.fullName){
                params.fullNameLike = this.search.fullName
           }
           if(this.search.timeStart || this.search.timeEnd){
               if(!this.search.timeStart){
                   params.hireDateStart = "2000-01-01"
                   params.hireDateEnd = this.search.timeEnd.format("yyyy-MM-dd")
               }
               if(!this.search.timeEnd){
                   params.hireDateStart = this.search.timeStart.format("yyyy-MM-dd")
                   params.hireDateEnd = "2599-01-01"
               }
               if(this.search.timeStart && this.search.timeEnd){
                   params.hireDateStart = this.search.timeStart.format("yyyy-MM-dd")
                   params.hireDateEnd = this.search.timeEnd.format("yyyy-MM-dd")
               }
           }
            this.getData(params)
        },
        addSubmit(){
            this.$emit('setType',{
                type:'add'
            })
        },
        editEmployee(_index){
          this.$emit('setType',{
              type:'edit',
              data:this.employeeList[_index]
          })
          this.$storage.setItem('curEmployeeDetail',this.employeeList[_index])
        },
        formateDate(row){
           return new Date(row.hireDate).format("yyyy-MM-dd")
        },
        formateCinema(row){
            var str = ''
            row.manageGroups.forEach(item => {
                str += item.name+' '
            })
            return str
        },
        getPositionList(){
            positionApi.ListPosition().then(res => {
                this.positionList = res.resultData.content;
                this.$storage.setItem('position',res.resultData.content)
            },error=>this.$message.error(error))
        },
        deleteEmployee(_index){
             this.$confirm('此操作将永久删除该职员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    employeeApi.delEmployee({id:this.employeeList[_index].id}).then(res => {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                     },error=>this.$message.error(error))
                
                })
        },
        pageCurrentChange(currentPage){
            this.page.pageNumber = currentPage -1
            this.getData();
        },
        pageSizeChange(size){
            this.page.pageSize= size
            this.getData();
        }
    },
    created:function () {
        this.getData()
        this.getPositionList()
    }
}
</script>
