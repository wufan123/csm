<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
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
            <el-form-item label="客诉状态">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客诉处理人">
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
            <el-form-item>
                <el-button type="info">查询</el-button>
            </el-form-item>
            <el-form-item>
                <a href="">导出Excel</a>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                stripe
        >
            <el-table-column
                    prop="date"
                    label="客诉编号"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="客诉来源"
            >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="发起人">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="客诉影院">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="影院组">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="处理人">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="客诉状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="发起时间">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="解决时间">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="客诉类型">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="其他详情">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="客诉评价">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="客诉等级">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="bug等级">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="bug类型">
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination">
            <el-pagination
                    :current-page="50"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    export default {
        data(){
            let tableData =[]
            for(let i =0; i<20;i++){
                tableData.push({
                    date:'23213',
                    name:'电影票太贵了',
                    address:'座位空调太冷'
                })
            }
            return {
                tableData:tableData,
                activeSubTab: 'first',
                form: {}
            }
        },
        methods:{
            handleEdit(index, row) {
                console.log(index, row);
                this.$emit('view', 'check')
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            add(){
                this.$emit('view', 'add' )
            }
        }
    }
</script>
<style lang='less'>
    .suggest-list{
        padding: 30px 20px 20px 20px;
        .pagination{
            margin-top: 30px;
        }
    }
</style>