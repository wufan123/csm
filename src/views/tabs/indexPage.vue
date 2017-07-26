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
                    title:'客诉数量趋势',
                    id:'complaint'
                },{
                    title:'平均响应时间趋势',
                    id:'response'
                },{
                    title:'平均解决时间趋势',
                    id:'solve'
                }]
            }
        }
    }
</script>
<style lang="less">
    #index {
        padding: 0 20px 0 20px;
        .chart-card{
            margin-top: 20px;
        }
    }
</style>