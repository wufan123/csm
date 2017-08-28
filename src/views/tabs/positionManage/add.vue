<template>
    <div>
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
                            <el-form-item label="菜单权限" required prop="menuIds">
                                <menus-collapse v-model="position.menuIds"></menus-collapse>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="接口权限" >
                                <port-collapse v-model="position.siteInterfaceIds"></port-collapse>
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
    </div>
</template>
<script>
import menusCollapse from 'views/component/menusCollapse.vue'
import portCollapse from 'views/component/portCollapse.vue'
import positionApi from 'api/positionApi'
export default {
  data(){
      return {
          position:{
              menuIds:[],
              siteInterfaceIds:[],
              positionName:'',
              enable:'true'
          },
          rules:{
             positionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' },{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
             menuIds:[{ type: 'array', required: true, message: '请至少选择一个菜单权限', trigger: 'change' }]
          }
      }
  },
    components: {'menus-collapse': menusCollapse,'port-collapse':portCollapse},
  methods: {
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
      closeFn(){
        this.$emit('setType',{
                  type:'list'
        })
      }
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

