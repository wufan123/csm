<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加职员">
                <el-input v-model="form.region" placeholder="活动区域">
                </el-input>
            </el-form-item>
            <el-form-item label="添加日期">
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
                <el-button type="success" v-on:click="add">新建</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                stripe

        >
            <el-table-column
                    prop="date"
                    label="序号"
            >
                <template scope="scope">
                    {{ scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="添加日期"
            >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="添加职员">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="问答数量">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="适用影院组">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)" class="t-info">编辑
                    </el-button>
                    <el-button type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)" class="t-danger">删除
                    </el-button>
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
    import addDialog from 'views/tabs/cinemaManage/add.vue'
    export default {
        components: {
            'add-dialog': addDialog,
        },
        data(){
            let tableData = []
            for (let i = 0; i < 20; i++) {
                tableData.push({
                    date: '23213',
                    name: '电影票太贵了',
                    address: '座位空调太冷'
                })
            }
            return {
                tableData: tableData,
                activeSubTab: 'first',
                form: {},
                dialogAdd: {
                    dialogVisible: false
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$alert('你确定要删除什么鬼么', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            add(){
                console.log('11111111')
                this.$emit('view', 'add' )
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>
<style lang='less'>
    .suggest-list {
        padding: 30px 20px 20px 20px;
        .pagination {
            margin-top: 30px;
        }
    }
</style>