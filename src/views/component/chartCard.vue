<template>
    <el-card class="box-card chart-card">
        <div slot="header">
            <span >{{chart.title}}</span>
        </div>
        <div  class="card-item">
            <el-date-picker
                    v-model="froValue"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
            至
            <el-date-picker
                    v-model="toValue"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-select v-model="value" placeholder="请选择影院组" >
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择影院">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>

            </el-select>
            <el-button type="info">查询</el-button>

        </div>
        <div class="card-item-chart" :id="chart.id">

        </div>
    </el-card>
</template>
<script>
    import indexApi from 'api/indexApi'
    import apiMixin from 'utils/apiMixin'
    import chartOpt from 'assets/chartOptions.json'//获取图表的定制信息
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');// 引入柱状图
    require('echarts/lib/chart/line');//引入折线图
    require('echarts/lib/component/tooltip');//引入提示框
    require('echarts/lib/component/title');//引入标题
    require('echarts/lib/component/toolbox');//引入标题


    export default {
        mixins:[apiMixin],
        props: {
            chart:{
                type:Object,//该对象包含属性字段 title id
                required:true
            }
        },
        data(){

            return {
                chartOption:{

                },
                pickerOptions:{
                },
                froValue:'',
                toValue:'',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods:{
            drawChart(chart){
                if(!this.myChartView)
                {
                    let chartEl =document.getElementById(chart.id);
                    if(chartEl)
                    {
                        this.myChartView= echarts.init(chartEl);
                    }else{
                        return;
                    }
                }
                chartOpt.title.text =chart.chartTitle//单位标题
                chartOpt.xAxis[0].data =chart.xAxisDate//x 轴第一行下标
                chartOpt.xAxis[1].data =chart.xAxisWeek//x 轴第二行下标
                chartOpt.series[0].data =chart.data//数据
                chartOpt.series[0].areaStyle.normal.color.colorStops[0].color =chart.colorStart//折线区域开始颜色
                chartOpt.series[0].areaStyle.normal.color.colorStops[1].color =chart.colorEnd//折线区域结束颜色
                chartOpt.series[0].lineStyle.normal.color.colorStops[0].color =chart.lineColor//折线开始颜色
                chartOpt.series[0].lineStyle.normal.color.colorStops[1].color =chart.lineColor//折线结束颜色
                chartOpt.series[0].itemStyle.normal.color.colorStops[0].color =chart.lineColor
                chartOpt.series[0].itemStyle.normal.color.colorStops[1].color =chart.lineColor
                this.myChartView.setOption(chartOpt);
            },
            fetchData(){

            },
            viewReady(){
                this.drawChart(this.chart)
            }
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";
    .chart-card{
        .card-item{
            color: @color-base-gray;
            font-size: @size-small;
            height: 40px;
            line-height: 40px;
            margin-top: 14px;
            overflow: hidden;
            .el-date-editor.el-input{
                width: 120px;
            }
            .el-select,button{
                margin-left: 15px;
            }
        }
        .card-item-chart{
            margin-top: 25px;
            display: inline-block;
            width: 850px;
            height: 300px;
        }
    }
</style>