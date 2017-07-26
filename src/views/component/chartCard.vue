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
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');// 引入柱状图
    require('echarts/lib/chart/line');//引入折线图
    require('echarts/lib/component/tooltip');//引入提示框
    require('echarts/lib/component/title');//引入标题
    require('echarts/lib/component/toolbox');//引入标题


    export default {
        props: {
            chart:{
                type:Object,//该对象包含属性字段 title id
                required:true
            }
        },

        data(){
            return {
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
            drawChart(id){
                let  colorStart = '#FFF7C2';
                let lineColor = '#FEC445';
                let colorEnd = '#FFFFFF';
                let tipText = '客诉数量{c}条';
                let title = '单位:条';
                let myChart = echarts.init(document.getElementById(id));
                myChart.setOption({
                    title: {
                        text: title,
                        textStyle:{
                            fontWeight:'normal',
                            fontSize:'12',
                            color:'#898989'
                        },
                        left: '0',
                    },
                    toolbox:{
                        feature:{
                            magicType:{
                                type:['line','bar']
                            }
                        },
                        right:'0'
                    },
                    tooltip: {
                        formatter:tipText
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [500, 2000, 3600, 1000, 1000, 2000],
                        symbolSize:10,//数据点的大小
                        areaStyle:{//与坐标围成的面积的样式
                            normal:{
                                type: 'linear',
                                color:{
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: colorStart // 0% 处的颜色
                                    }, {
                                        offset: 1, color: colorEnd // 100% 处的颜色
                                    }],
                                    globalCoord: false
                                }
                            }
                        },
                        lineStyle:{//折线样式
                            normal:{
                                type: 'solid',
                                color:{
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: lineColor // 0% 处的颜色
                                    }, {
                                        offset: 1, color: lineColor // 100% 处的颜色
                                    }],
                                    globalCoord: false
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: lineColor // 0% 处的颜色
                                    }, {
                                        offset: 1, color: lineColor // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        }
                    }]
                });
            },
        },
        mounted(){
            this.$nextTick(function() {
                this.drawChart('complaint')
            })

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