<template>
  <div class="page">
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
export default {
  data(){
      return {
          position:{
              positionName:'',
              enable:'true'
          },
          rules:{}
      }
  }
}
</script>
