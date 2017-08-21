<template>
  <div class="tab-content">
    <div class="page">
      <div class="search">
        <el-button type="success" @click="addSubmit">新增</el-button>
      </div>
      <div class="h20"></div>
      <div class="content">
        <el-table :data="gpData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="name" label="菜单名称" >
            <template scope="scope">
              <c-dot :count="scope.row.hierarchy"></c-dot> {{scope.row.name}}
            </template>
          </el-table-column>
          <!--<el-table-column prop="url" label="菜单地址"> </el-table-column>-->
          <el-table-column prop="enable" label="是否启用" width="180">
            <template scope="scope">
              <el-switch v-model="scope.row.enable" on-color="#13ce66" off-color="#ccc" @change="switchFn(scope.row)" >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" class="t-info" @click="editFn(scope.$index,scope.row)"> 编辑</el-button>
              <el-button type="text" class="t-danger" @click="deleteFn(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="h20"></div>
        <el-row type="flex" justify="end" class="pagination">
          <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="this.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.page.totalElements">
          </el-pagination>
        </el-row> -->
      </div>
      <edit-dialog :dialogData="dialogData" :menuData="gpData" @SuccessM="refesh"></edit-dialog>
    </div>
  </div>
</template>
<script>
import editDialog from 'views/tabs/menuManage/update.vue'
import cDot from 'views/component/dot.vue'
import menuApi from 'api/menuApi'
export default {
  components: { 'edit-dialog': editDialog, 'c-dot': cDot },
  data() {
    return {
      tableList: [],
      dialogData: {
        dialogVisible: false,
        type: 0
      },
      pageNumber: 1,
      page: {
        pageSize: 120,
        pageNumber: 0,
        totalElements: 0
      },
    }
  },
  computed:{
    gpData(){
      var arr=[]
      this.tableList&&this.tableList.forEach(item =>{
        if(!item.parentId){
          arr.push(item)
          this.tableList.forEach(subItem=>{
            if(item.id === subItem.parentId){
              arr.push(subItem)
              this.tableList.forEach(subdItem=>{
                if(subItem.id === subdItem.parentId){
                  arr.push(subdItem)
                }
              })
            }
          })
        }
      })
      return arr
    }
  },
  methods: {
    getData(params) {
      if (!params) {
        params = {}
      }
      params.pageNumber = this.page.pageNumber
      params.pageSize = this.page.pageSize
      menuApi.ListMenu(params).then(res => {
        this.tableList = res.resultData.content
        this.page.totalElements = res.resultData.totalElements
      }, error => this.$message.error(error))
    },
    refesh(values){
      this.getData();
       this.dialogData.dialogVisible = false;
    },
    addSubmit() {
      this.dialogData.dialogVisible = true
      this.dialogData.type = 0
      this.dialogData.data = {}
    },
    editFn(_index, row) {
      this.dialogData.dialogVisible = true
      this.dialogData.type = 1
      this.dialogData.data = row
    },
    deleteFn(_index, row) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuApi.delMenu({ menuId: row.id }).then(res => {
          this.getData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }, error => this.$message.error(error))

      })
    },
    switchFn(row,values){
      var params = {}
      params.menuId = row.id
      params.enable = (row.enable).toString()
      menuApi.enableMenu(params).then(res=>{

      },error=>this.$message.error(error))
    },
    pageCurrentChange(currentPage) {
      this.page.pageNumber = currentPage - 1
      this.getData();
    },
    pageSizeChange(size) {
      this.page.pageSize = size
      this.getData();

    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="less" scoped>

</style>
