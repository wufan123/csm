<template>
  <el-row id="index" :gutter="20">
      <el-col :span="16" class="index-body">
          <chart-card v-for="(item,index) in charts" :chart="item" :key="index"></chart-card>
      </el-col>
      <el-col :span="8" class="index-body">
          <el-card class="box-card">
              <div slot="header" >
                  <span >登录人员</span>
              </div>
          </el-card>
      </el-col>
  </el-row>
</template>
<script>
    import chartCard from 'views/component/chartCard.vue'
    import chartData from 'assets/chartData.json'//获取要显示的图表
    export default {
        components:{
            chartCard
        },
        data(){
            return {
                chartCardView:{},
                charts:chartData
            };
        }
    }
</script>
<style lang="less">
    #index {
        padding: 0 20px 0 20px;
        .el-card{
            margin-top: 20px;
        }
    }
</style>