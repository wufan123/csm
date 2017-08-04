<<template>
  <div class="page">
      <div class="seatch"><el-button type="success" @click="addFn">新增</el-button> </div>
      <div class="h20"></div>	
      <div class="content">
         <el-table   :data="tableList"   border    style="width: 100%">
            <el-table-column  type="index" label="序号"  width="100"></el-table-column>
            <el-table-column   prop="interfaceName"   label="接口名称"  width="180">  </el-table-column>
            <el-table-column   prop="url"   label="接口地址"  > </el-table-column>
            <el-table-column   prop="interfaceCategoryId" :formatter="formateClass"    label="接口分类"  width="180"> </el-table-column>
            <el-table-column   prop="enable"  label="是否启用"  width="180"> 
                <template scope="scope"> <em> {{scope.row.enable ? '启用' : '禁用'}}</em></template>      
            </el-table-column>
            <el-table-column   label="操作" >
                <template scope="scope">
    <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)"> 编辑</el-button>
    <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除</el-button>
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
        <el-dialog
    :title="ruleForm.type?'编辑接口':'新增接口'"
    :visible.sync="dialogVisible"
    size="tiny">
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="接口名称" prop="interfaceName" required>
            <el-input type="text" v-model="ruleForm.interfaceName"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口地址" prop="url" required>
            <el-input type="text" v-model="ruleForm.url"  auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="是否启用" prop="enable" required>
            <el-radio class="radio" v-model="ruleForm.enable" label="true">正常</el-radio>
            <el-radio class="radio" v-model="ruleForm.enable" label="false">停用</el-radio>
        </el-form-item>

         <el-form-item label="接口分类" required prop="portClassId" >
            <el-select v-model="ruleForm.portClassId" placeholder="全部" >
                <el-option   v-for="item in portClassList"  :key="item.id"
                :label="item.name"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn('ruleForm')">确 定</el-button>
    </span>
</el-dialog>
  </div>
</template>

<<script>
import portApi from 'api/siteInterfaceApi'
export default {
    data(){
        var validateportClassId = (rule, value, callback) =>{
            if(!value){
                callback('请选择接口分类')
            }else{
                callback()
            }
        }
        return{
            tableList:[],
            portClassList:[],
            dialogVisible:false,
            pageNumber:1,
            page:{
                pageSize:10,
                pageNumber:0,
                totalElements:0
            },
            ruleForm:{
                type:0,
                interfaceName:'',
                url:'',
                enable:"true",
                portClassId:null
            },
            search: {
                portClassId: null,
                interfaceName: null
            },
            rules:{
               interfaceName:[{ required: true, message: '请输入接口名称', trigger: 'blur' },{ min: 3, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }] ,
               portClassId:[{ validator: validateportClassId, trigger: 'blur' }],
               url:[{ required: true, message: '请输入接口地址', trigger: 'blur' }] ,
            }
        }
    },
    methods:{
        getPortClassList(){
            portApi.ListPortGroup().then(res=>{
                this.portClassList = res.resultData.content
            },error=>this.$message.error(error))
        },
        getData:function (params) {
            if(!params){
                params = {}
            }
            params.pageNumber = this.page.pageNumber
            params.pageSize = this.page.pageSize
            portApi.ListPort(params).then(res => {
                this.tableList = res.resultData.content
                this.page.totalElements = res.resultData.totalElements
            },error=>this.$message.error(error))
        },
        formateClass(row){
            let str = ''
            this.portClassList&&this.portClassList.forEach(item => {
                if(item.id == row.interfaceCategoryId){
                    str = item.name
                }
            })
           return str
        },
        addFn(_index,row){
            this.dialogVisible = true;
            this.ruleForm = {
                enable:'true',
                portClassId:null
            }
            this.ruleForm.type = 0
        },
        editFn(_index,row){
            this.dialogVisible = true;
            this.ruleForm = row
            this.ruleForm.enable = row.enable.toString()
            this.ruleForm.portClassId = row.interfaceCategoryId
            this.ruleForm.type = 1
        },
        deleteFn(_index,row){
             this.$confirm('此操作将永久删除该接口, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    portApi.delPort({siteInterfaceId:row.id}).then(res => {
                        this.getData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                     },error=>this.$message.error(error))
                
                })
        },
        submitFn(ruleForm) {
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    let params = {}
                    params.interfaceName = this.ruleForm.interfaceName
                    params.url = this.ruleForm.url
                    params.enable = this.ruleForm.enable
                    params.interfaceCategoryId = this.ruleForm.portClassId
                    if(this.ruleForm.type){
                        params.id = this.ruleForm.id
                        portApi.editPort(params).then(res =>{
                            this.getData()
                        },error=>this.$message.error(error))
                    }else(
                        portApi.addPort(params).then(res =>{
                            this.getData()
                        },error=>this.$message.error(error))
                    )
                    this.dialogVisible = false;
                }
                
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
        this.getPortClassList()
    }
}
</script>
