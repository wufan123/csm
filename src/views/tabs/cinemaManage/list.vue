<<template>
  <div class="page">
      <div class="seatch">
          <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="归属影院组">
                    <el-select v-model="search.positionId" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <!-- <el-option   v-for="item in positionList"  :key="item.id"
                        :label="item.positionName"  :value="item.id">
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="searchSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addSubmit">新增</el-button>
                </el-form-item>
          </el-form>
      </div>				
      <div class="content">
         <el-table   :data="cinemaList"   border    style="width: 100%">
            <el-table-column  type="index" label="序号"  width="100"></el-table-column>
            <el-table-column   prop="name"   label="影院名称"  width="180">  </el-table-column>
            <el-table-column   prop="cinemaGroupId"   label="归属影院组"  width="180"> </el-table-column>
            <el-table-column   prop="createTime" :formatter="formateDate"   label="创建时间"  width="180">  </el-table-column>
            <el-table-column   label="操作" >
                <template scope="scope">
                    <el-button type="text" class="t-info" @click="editEmployee(scope.$index)">编辑</el-button>
                    <el-button type="text" class="t-danger" @click="deleteEmployee(scope.$index)">删除</el-button>
                </template>    
            </el-table-column>
        </el-table>    
      </div>
  </div>
</template>
<<script>
import employeeApi from 'api/employeeApi'
import cinemaApi from 'api/cinemaApi'
export default {
    data(){
        return{
            cinemaList:[],
            search: {
                positionId: null,
                enable: null
            }
        }
    },
    methods:{
        getData:function (params) {
            cinemaApi.listCinema(params).then(res => {
                this.cinemaList = res.resultData.content
            })
        },
        searchSubmit(){
            var params = {}
           if(this.search.positionId){
               params.positionId = this.search.positionId
           }
           if(this.search.enable){
                params.isEnable = this.search.enable==1?true:false
           }
            this.getData(params)
        },
        addSubmit(){
             this.$prompt('影院组名称', '新建影院组', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                
                }).catch(() => {
               
                });
        },
        formateDate(row){
           return new Date(row.createTime).format("yyyy-MM-dd")
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
        this.getData()
    }
}
</script>
