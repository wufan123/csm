<template>
    <el-card class="box-card chart-card">
        <div slot="header">
            <span>{{chart.title}}</span>

        </div>
        <div class="card-item">
            <el-date-picker
                    v-model="dateStart"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="dateStartOptions">
            </el-date-picker>
            至
            <el-date-picker
                    v-model="dateEnd"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="dateEndOptions">
            </el-date-picker>
            <el-select v-model="form.cinemaGroupId" filterable  placeholder="请选择影院组"  v-on:change="getCinemas" >
                <el-option label="全部" value=" "></el-option>
                <el-option
                        v-for="item in chart.cinemaGroup"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="form.cinemaId" filterable placeholder="请选择影院">
                <el-option label="全部" value=" "></el-option>
                <el-option
                        v-for="item in cinemas"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button type="info" v-on:click="fetchData">查询</el-button>
        </div>
        <div class="card-item-chart" :id="chart.id">
        </div>
    </el-card>
</template>
<script>
    import httpApi from 'api/httpApi'
    import indexApi from 'api/indexApi'
    import cinemaApi from 'api/cinemaApi'
    import chartOpt from 'assets/chartOptions.json'//获取图表的定制信息
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');// 引入柱状图
    require('echarts/lib/chart/line');//引入折线图
    require('echarts/lib/component/tooltip');//引入提示框
    require('echarts/lib/component/title');//引入标题
    require('echarts/lib/component/toolbox');//引入标题
    export default {
        props: {
            chart: {
                type: Object,//该对象包含属性字段 title id
                required: true
            }
        },
        data(){
            return {
                dateStart: '',
                dateEnd: '',
                form: {
                    cinemaGroupId: '',
                    cinemaId: '',
                    dateStart: '',
                    dateEnd: ''
                },
                dateStartOptions: {},
                dateEndOptions: {},
                cinemas: []
            }
        },
        methods: {
            drawChart(chart){
                if (!this.myChartView) {
                    let chartEl = document.getElementById(chart.id);
                    if (chartEl) {
                        this.myChartView = echarts.init(chartEl);
                    } else {
                        return;
                    }
                }
                chartOpt.title.text = chart.chartTitle//单位标题
                chartOpt.tooltip.formatter = chart.tipText//tip
                chartOpt.xAxis[0].data = chart.xAxisDate//x 轴第一行下标
                chartOpt.xAxis[1].data = chart.xAxisWeek//x 轴第二行下标
                chartOpt.series[0].data = chart.data//数据
                chartOpt.series[0].areaStyle.normal.color.colorStops[0].color = chart.colorStart//折线区域开始颜色
                chartOpt.series[0].areaStyle.normal.color.colorStops[1].color = chart.colorEnd//折线区域结束颜色
                chartOpt.series[0].lineStyle.normal.color.colorStops[0].color = chart.lineColor//折线开始颜色
                chartOpt.series[0].lineStyle.normal.color.colorStops[1].color = chart.lineColor//折线结束颜色
                chartOpt.series[0].itemStyle.normal.color.colorStops[0].color = chart.lineColor
                chartOpt.series[0].itemStyle.normal.color.colorStops[1].color = chart.lineColor
                this.myChartView.setOption(chartOpt);
            },
            getCinemas(){
                this.form.cinemaId=''
                cinemaApi.listCinema({
                    cinemaGroupId: this.form.cinemaGroupId
                }).then(res => {
                    this.cinemas = res.resultData.content
                })
            },
            fetchData(){

                this.form.dateEnd = this.dateEnd ? this.dateEnd.format('yyyy-MM-dd') : '';
                this.form.dateStart = this.dateStart ? this.dateStart.format('yyyy-MM-dd') : '';
                httpApi.postForm(this.chart.apiUrl, this.form).then(res => {//请求图表数据
                    let newRes = indexApi.preHandleIndexData(res.resultData, this.chart.type);
                    for (let i in newRes) {
                        this.chart[i] = newRes[i]
                    }
                    this.drawChart(this.chart)
                })
            },
            viewReady(){
                this.drawChart(this.chart)
                this.dateStartOptions.disabledDate = time => {//限制日期范围
                    if (time.getTime() > Date.now()) {
                        return true
                    } else {
                        if (this.dateEnd instanceof Date) {
                            return time.getTime() < this.dateEnd.getTime() - 14 * 24 * 60 * 60 * 1000 || time.getTime() >= this.dateEnd.getTime();
                        } else {
                            return false;
                        }
                    }

                }
                this.dateEndOptions.disabledDate = time => {
                    if (time.getTime() > Date.now()) {
                        return true;
                    } else {
                        if (this.dateStart instanceof Date) {
                            return time.getTime() > this.dateStart.getTime() + 14 * 24 * 60 * 60 * 1000 || time.getTime() <= this.dateStart.getTime();
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        computed: {}
    }
</script>
<style lang="less">
    @import "~style/base-variables";

    .chart-card {
        .card-item {
            color: @color-base-gray;
            font-size: @size-small;
            height: 40px;
            line-height: 40px;
            margin-top: 14px;
            overflow: hidden;
            .el-select, button {
                margin-left: 15px;
            }
        }
        .card-item-chart {
            margin-top: 25px;
            display: inline-block;
            width: 850px;
            height: 300px;
        }
    }
</style>