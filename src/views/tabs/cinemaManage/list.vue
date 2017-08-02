<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理人员">
                <el-input v-model="form.region" placeholder="活动区域">
                </el-input>
            </el-form-item>
            <el-form-item label="账号名称">
                <el-input v-model="form.region" placeholder="活动区域">
                </el-input>
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
                    label="管理人员姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="影院组名称">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="账号名">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="管理子账号数量">
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
        <add-dialog :dialogAdd="dialogAdd"></add-dialog>
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
                this.dialogAdd.dialogVisible =true
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