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
    export default {
        data(){
            return {
                chartCardView:{},
                charts:[{
                    title:'单位:条',
                    colorStart:'#FFF7C2',
                    lineColor:'#FEC445',
                    id:'complaint',
                    tipText:'客诉数量{c}条'
                },{
                    title:'单位:秒',
                    colorStart:'#FFE8EE',
                    lineColor:'#F491A5',
                    id:'response',
                    tipText:'平均响应时间{c}秒'
                },{
                    title:'单位:秒',
                    colorStart:'#AAEE28',
                    lineColor:'#AAEE68',
                    id:'solve',
                    tipText:'平均解决时间{c}秒'
                }]
            }
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