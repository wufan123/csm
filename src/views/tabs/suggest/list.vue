<template>
    <div class="suggest-list">
        <el-form ref="form" :model="form" label-width="85px" :inline="true">
            <el-form-item label="影院组名称">
                <el-select v-model="form.cinemaGroupId" placeholder="全部" v-on:change="getCinemas()">
                    <group-options :showAll="true"></group-options>
                </el-select>
            </el-form-item>
            <el-form-item label="影院名称">
                <el-select v-model="form.cinemaName" placeholder="全部">
                    <cinema-options :showAll="true"  ref="cinemaOp"></cinema-options>
                </el-select>
            </el-form-item>
            <el-form-item label="建议日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="createTimeStart"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker ype="date" placeholder="选择日期" v-model="createTimeEnd"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="新建" value="1"></el-option>
                    <el-option label="不采纳" value="2"></el-option>
                    <el-option label="采纳" value="3"></el-option>
                    <el-option label="已经实现" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体途径">
                <el-select v-model="form.suggestSource" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="线下客人反馈" value="1"></el-option>
                    <el-option label="线上客人反馈" value="2"></el-option>
                    <el-option label="影城工作人员反馈" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="info" v-on:click="getList">查询</el-button>
                <el-button type="success" v-on:click="add">新建</el-button>
            </el-form-item>
            <el-form-item>
                <a href="">导出Excel</a>
            </el-form-item>
        </el-form>
        <el-table
                :data="this.pageDatas.content"
                stripe
        >
            <el-table-column
                    prop="orderNo"
                    label="建议编号"
            >
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
            >
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容">
            </el-table-column>
            <el-table-column
                    prop="cinemaName"
                    label="来源影院">
            </el-table-column>
            <el-table-column
                    prop="cinemaGroupName"
                    label="来源影院组">
            </el-table-column>
            <el-table-column
                    prop="serviceUserName"
                    label="录入人">
            </el-table-column>
            <el-table-column
                    prop="hasAttachName"
                    label="是否附件"
            >
            </el-table-column>
            <el-table-column
                    prop="statusName"
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    prop="suggestSourceName"
                    label="具体途径"
            >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="录入日期">
                <template scope="scope">
                    {{new Date(scope.row.createTime).format("yyyy-MM-dd hh:mm")}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template scope="scope">
                    <el-button type="text"
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)" class="t-info">编辑
                    </el-button>
                    <el-button v-if="scope.row.status!==1"
                               type="text"
                               size="mini"
                               @click="handleCheck(scope.$index, scope.row)" class="t-info">查看
                    </el-button>
                    <el-button v-if="scope.row.status===1"
                               type="text"
                               size="mini"
                               @click="handleDelete(scope.$index, scope.row)" class="t-danger">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination">
            <el-pagination
                    @size-change="pageSizeChange"
                    @current-change="pageCurrentChange"
                    :current-page="pageNumber"
                    :page-sizes="[20, 40, 60, 80]"
                    :page-size="this.form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.pageDatas.totalElements">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    import suggestApi from 'api/suggestApi'
    export default {
        data(){
            return {
                createTimeStart: '',
                createTimeEnd: '',
                pageNumber: 0,
                form: {
                    cinemaGroupId: '',
                    cinemaName: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    status: '',
                    suggestSource: '',
                    pageSize: 20,
                    pageNumber: 0
                },
                pageDatas: {
                    totalElements: 0
                }
            }
        },
        methods: {
            getCinemas(){
                this.form.cinemaName=''
                this.$refs.cinemaOp.getCinemas(this.form.cinemaGroupId);
            },
            handleEdit(index, row) {
                this.$emit('view', {
                    type: 'edit',
                    data: row
                })
            },
            handleDelete(index, row) {
                this.$alert('确定删除该条建议么', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action == 'confirm') {
                            suggestApi.delete({
                                id: row.id
                            }).then(res => {
                                this.pageDatas.content = this.pageDatas.content.filter(item => {
                                    return item.id !== row.id
                                })
                            })
                        }
                    }
                });
            },
            handleCheck(index, row){
                this.$emit('view', {
                    type: 'check',
                    data: row
                })
            },
            add(){
                this.$emit('view', {
                    type: 'add'
                })
            },
            pageCurrentChange(currentPage){
                this.form.pageNumber = currentPage - 1
                this.getList()
            },
            pageSizeChange(size){
                this.form.pageSize = size
                this.getList()
            },
            fetchData(){
                this.getList()
            },
            getList(){
                suggestApi.list(this.form).then(res => {
                    this.pageDatas = res.resultData
                })
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