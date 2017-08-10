<template>
  <div class="page position">
    <div class="p-title">新建岗位</div>
     <div class="h20"></div>
    <div class="content addForm">
      <el-form :rules="rules" ref="position"   :model="position" label-width="100px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位名称" required  prop="positionName">
              <el-input v-model="position.positionName" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
               <el-form-item label="职员状态" prop="enable">
                 <el-radio class="radio" v-model="position.enable" label="true">正常</el-radio>
                  <el-radio class="radio" v-model="position.enable" label="false">停用</el-radio>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
               <el-form-item label="职员状态" required prop="menuIds">
                 <el-collapse v-model="activeName" accordion>
                  <el-collapse-item v-for="(item,index) in fistMenu" :key="item.id"  :name="index">
                    <template slot="title">
                     <el-checkbox v-model="checkAll[index]" @change="handleCheckAllChange(item.id)">{{item.name}}</el-checkbox> 
                  </template>
                  <el-checkbox-group v-model="position.menuIds">
                    <div class="line" v-for="subItem in item.children" :key="subItem.id" >
                     <p><el-checkbox :label="subItem.id" :key="subItem.id"> <c-dot :count="subItem.hierarchy"></c-dot> {{subItem.name}}</el-checkbox>  </p>
                      <div class="line" v-for="subsubItem in subItem.children" :key="subsubItem.id" >
                        <p><el-checkbox :label="subsubItem.id" :key="subsubItem.id"> <c-dot :count="subsubItem.hierarchy"></c-dot> {{subsubItem.name}}</el-checkbox></p>
                      </div>
                    </div> 
                       
                    </el-checkbox-group>
                  </el-collapse-item>
                 
                </el-collapse>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
               <el-form-item label="选择接口权限" required prop="siteInterfaceIds">
                 <el-collapse v-model="activeName2" accordion>
                  <el-collapse-item v-for="(item,index) in portClassList" :key="item.id"  :name="index">
                    <template slot="title">
                     <el-checkbox v-model="checkAll2[index]" @change="handleCheckAllChange2(item.id)">{{item.name}}</el-checkbox> 
                  </template>
                  <el-checkbox-group v-model="position.siteInterfaceIds">
                    <div class="line" v-for="subItem in item.children" :key="subItem.id" >
                     <p><el-checkbox :label="subItem.id" :key="subItem.id">{{subItem.interfaceName}}</el-checkbox>   </p>
                    </div> 
                       
                    </el-checkbox-group>
                  </el-collapse-item>
                 
                </el-collapse>
              </el-form-item>
          </el-col>
        </el-row>
        <div class="h10"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('position')">立即创建</el-button>
          <el-button type="primary" :plain="true" @click="closeFn()" >关闭不保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
var onOff = true
var onOff2 = true
import positionApi from 'api/positionApi'
import cDot from 'views/component/dot.vue' 
import menuApi from 'api/menuApi' 
import portApi from 'api/siteInterfaceApi' 
export default {
   
  data(){
      return {
          checkAll: [],
          checkAll2:[],
          menuList:[],
          activeName: 0,
          activeName2: 0,
          
          portClassList:[],
          portList:[],
          position:{
              menuIds:[],
              siteInterfaceIds:[],
              positionName:'',
              enable:'true'
          },
          rules:{
             positionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' },{ min: 2, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
             menuIds:[{ type: 'array', required: true, message: '请至少选择一个职员状态', trigger: 'change' }],
             siteInterfaceIds:[{ type: 'array', required: true, message: '请至少选择一个接口权限', trigger: 'change' }]
          }
      }
  },
  components: { 'c-dot': cDot },
  computed:{
    fistMenu(){
      let arr = []
      this.menuList&&this.menuList.forEach(item=>{
        if(item.hierarchy=='1'){
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods:{
      getMenuList(){
        menuApi.ListMenu().then(res=>{
          this.menuList = res.resultData.content
        })
      },
      getPortClassList(){
        portApi.ListPortGroup().then(res=>{
          this.portClassList = res.resultData.content
          this.getPortList()
        })
      },
      getPortList(){
        portApi.ListPort().then(res=>{
          this.portClassList&&this.portClassList.forEach((subItem,subIndex)=>{
             this.portClassList[subIndex].children = []
          res.resultData.content&&res.resultData.content.forEach(item=>{
            this.portList = res.resultData.content
              if(item.interfaceCategoryId==subItem.id){
                console.log('item',item)
                
                this.portClassList[subIndex].children.push(item)
              }
            })
          })

          console.log('portClassList',this.portClassList)
        })
      },
      submitForm(position){
        console.log('position',this.position)
        
        this.$refs[position].validate((valid) => {
            if (valid) {
              positionApi.addPosition(this.position).then(res =>{
                this.$emit('setType',{
                  type:'list'
                })
              })
            }else{

            }
            })
      },
      handleCheckAllChange(id){
        if(onOff){
          var arr = []
          onOff = false
        }else{
          arr = this.position.menuIds
          var arr2 = this.position.menuIds
        }
        if (!event.target.checked) {
          arr2 && arr2.forEach(arrItem => {
            this.menuList && this.menuList.forEach((item, index) => {
              if (item.id == id) {
                arr2.remove(item.id);
                item.children && item.children.forEach(subItem => {
                  arr2.remove(subItem.id);
                  subItem.children && subItem.children.forEach(subsubItem => {
                    arr2.remove(subsubItem.id);
                  })
                })
              }
            })
          })
          
        }else{
          this.menuList&&this.menuList.forEach(item=>{
            if(item.id == id){
              arr.push(item.id)
              item.children&&item.children.forEach(subItem =>{
                arr.push(subItem.id)
                subItem.children&&subItem.children.forEach(subsubItem =>{
                  arr.push(subsubItem.id)
                })
              })
            }
          })
        }
        console.log('arr',arr)
        console.log('arr2',arr2)
        this.position.menuIds = event.target.checked ? arr : arr2;
      },
      handleCheckAllChange2(id){
        console.log('id',id)
        if(onOff){
          var arr = []
          onOff = false
        }else{
          arr = this.position.siteInterfaceIds
          var arr2 = this.position.siteInterfaceIds
        }
        if (!event.target.checked) {
          this.portList&&this.portList.forEach(item=>{
             if(item.interfaceCategoryId==id){
               arr2.remove(item.id);
             }
          })
        }else{
          this.portList&&this.portList.forEach(item=>{
             if(item.interfaceCategoryId==id){
               arr.push(item.id)
             }
          })
        }
        console.log('arr',arr)
        console.log('arr2',arr2)
        this.position.siteInterfaceIds = event.target.checked ? arr : arr2;
      },
      closeFn(){
        this.$emit('setType',{
                  type:'list'
        })
      }
  },
  created(){
    this.getMenuList()
    this.getPortClassList()
  }
}
</script>
<style lang="less" >
.position{
  .el-collapse{border: 0;}
      .el-collapse-item {border: 1px solid rgb(236, 223, 223);
        margin-bottom: 10px;
      }
      .el-collapse-item__content{ padding:0;
        .line{background: #fff;border-top: 1px solid rgb(236, 223, 223);
          &:first-child{border: 0;}}
        p{padding: 10px 35px;    display: block;}
      }
}

</style>

