<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.cinemaGroupId"  placeholder="全部" v-on:change="getCinemas()">
                    <group-options :showAll="true"></group-options>
                </el-select>
            </el-form-item>
            <el-form-item label="影院名称">
                <el-select v-model="form.cinemaName" placeholder="全部">
                    <cinema-options :showAll="true" :cinemaGroupId="form.cinemaGroupId" ref="cinemaOp"></cinema-options>
                </el-select>
            </el-form-item>
            <el-form-item label="建议日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createTimeStart"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="createTimeEnd"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体途径">
                <el-select v-model="form.suggestSource" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="info">查询</el-button>
                <el-button type="success" v-on:click="add">新建</el-button>
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
                    label="建议编号"
                   >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="标题"
                    >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="内容">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="来源影院">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="来源影院组">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="录入人">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="是否附件">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="具体途径">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="录入日期">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template scope="scope">
                    <el-button type="text"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)" class="t-info">编辑</el-button>
                    <el-button type="text"
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)" class="t-danger">删除</el-button>
                </template>
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
            return {
                tableData:tableData,
                activeSubTab: 'first',
                createTimeStart:'',
                createTimeEnd:'',
                form: {
                    cinemaGroupId:'',
                    cinemaName:'',
                    createTimeStart:'',
                    createTimeEnd:'',
                    status:'',
                    suggestSource:'',
                    pageSize:20,
                    pageNumber:0
                }
            }
        },
        methods:{
            getCinemas(){
              this.$refs.cinemaOp.getCinemas();
            },
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