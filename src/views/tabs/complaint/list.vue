<template>
    <div class="complain-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="客诉类型">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影院组名称">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影院名称">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="客诉等级">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉来源">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉状态">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否星标">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="info">查询</el-button>
                <el-button type="success" v-on:click="add">新建</el-button>
            </el-form-item>
        </el-form>
        <div class="list-body">
            <el-row>
                <el-tabs v-model="activeSubTab" type="card">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="等待处理" name="second"></el-tab-pane>
                    <el-tab-pane label="处理中" name="third"></el-tab-pane>
                    <el-tab-pane label="处理完毕" name="fourth"></el-tab-pane>
                </el-tabs>
            </el-row>
            <el-row type="flex" justify="end" class="state-explain"  >
                <el-col :span="2" class="onhandle">
                    ■ 等待处理
                </el-col>
                <el-col :span="2" class="processing">
                    ■ 正在处理
                </el-col>
                <el-col :span="3" class="shift">
                    ■ 正在处理-转技术解决
                </el-col>
                <el-col :span="2" class="unsolved">
                    ■ 未解决
                </el-col>
                <el-col :span="2" class="worked-out">
                    □ 处理完毕
                </el-col>
                <el-col :span="3">
                    你有11条新客诉
                </el-col>
            </el-row>
            <el-row :gutter="21" class="list-card" >
                <el-col :span="8"  v-for="i in 10" :key="i" >
                    <el-card :class="'processing'" @click.native="handleComplaint">
                        123465
                    </el-card>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-pagination
                        :current-page="50"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                activeSubTab:'first',
                form: {

                }
            }
        },
        methods:{
            add(){
                this.$emit('view', 'add' )
            },
            handleComplaint(){
                this.$emit('view', 'handle' )
            }
        }
    }

</script>
<style lang="less">
    @onhandleColor:#be0000;
    @onhandleBg:#ffdede;
    @processingColor:#dc6200;
    @processingBg:#ffeee1;
    @shiftColor:#3f5a04;
    @shiftBg:#dfedc0;
    @unsolvedColor:#d6bd00;
    @unsolvedBg:#fffad5;
    @workedOutColor:#be0000;
    .complain-list{
        padding: 30px 20px 20px 20px;
        .el-form-item{
            margin-bottom: 10px;
        }
        .list-body{
            margin-top: 25px;
        }
        .state-explain{
            margin-top: 30px;
            font-size: 12px;
            .onhandle{
                color:@onhandleColor ;
            }
            .processing{
                color:@processingColor ;
            }
            .shift{
                color:@shiftColor ;
            }
            .unsolved{
                color:@unsolvedColor ;
            }
        }
        .list-card{
            margin-top: 30px;
            .el-card{
                height: 253px;
                margin-bottom: 20px;
                cursor:pointer;
            }
            .onhandle{
                color:@onhandleColor ;
                background:@onhandleBg ;
                border: 1px solid @onhandleColor;
            }
            .processing{
                color:@processingColor ;
                background:@processingBg ;
                border: 1px solid @processingColor;
            }
            .shift{
                color:@shiftColor ;
                background: @shiftBg;
                border: 1px solid @shiftColor;
            }
            .unsolved{
                color:@unsolvedColor ;
                background:@unsolvedBg ;
                border: 1px solid @unsolvedColor;
            }
        }
    }
</style>