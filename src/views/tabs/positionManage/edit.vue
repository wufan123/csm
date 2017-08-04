<template>
  <div class="page">
    <div class="p-title">编辑岗位</div>
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
        <div class="h10"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('position')">保存</el-button>
          <el-button type="primary" :plain="true" @click="closeFn()" >关闭不保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import positionApi from 'api/positionApi' 
export default {
  data(){
      return {
          position:{
              positionName:'',
              enable:'true'
          },
          rules:{
             positionName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' },{ min: 2, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
          }
      }
  },
  props: {
    dataObj: Object
  },
  methods:{
    submitForm(position){
      this.$refs[position].validate((valid) => {
          if (valid) {
            this.position.positionId = this.dataObj.id
            positionApi.editPosition(this.position).then(res =>{
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
  },
  created(){
      this.position = this.dataObj
      this.position.enable = this.dataObj.enable.toString()
  }
}
</script>
