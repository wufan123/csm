<template>
    <div class="tab-form complaint">
        <chat :workorder="this.viewState.data" v-if="this.viewState.data||this.viewState.data.teamId"></chat>
        <el-row class="tab-pane-title">
            处理客诉
        </el-row>
        <el-row class="property">
            <el-col :span="4">
                客诉来源: {{viewState.data.orderSourceName}}
            </el-col>
            <el-col :span="4">
                客诉影院: {{viewState.data.cinemaName}}
            </el-col>
            <el-col :span="4">
                客诉影院组: {{viewState.data.cinemaGroupName}}
            </el-col>
            <el-col :span="4">
                客诉发起人: {{viewState.data.initiatorName}}
            </el-col>
            <el-col :span="6">
                客诉时间: {{new Date(viewState.data.createTime).format('yyyy-MM-dd hh-mm-ss')}}
            </el-col>
        </el-row>
        <el-row class="des">
            问题: {{viewState.data.content}}
        </el-row>
        <el-row>
            <el-form ref="form-a" :model="form" label-width="85px" label-position="right" :rules="rules">
                <el-form-item label="客诉类型" required prop="orderType">
                    <el-col :span="4">
                        <el-select v-model="form.orderType" placeholder="请选择">
                            <el-option label="查询" value="1"></el-option>
                            <el-option label="影票退款" value="2"></el-option>
                            <el-option label="卖品退款" value="3"></el-option>
                            <el-option label="套票退款" value="4"></el-option>
                            <el-option label="票券状态处理" value="5"></el-option>
                            <el-option label="密码重置" value="6"></el-option>
                            <el-option label="活动管理" value="7"></el-option>
                            <el-option label="影片排期刷新/删除" value="8"></el-option>
                            <el-option label="其他" value="9"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="20" v-if="form.orderType == '9'">
                        <el-input v-model="form.otherDetail" class="remark-input" placeholder="其他详情">

                        </el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form-b" :model="form" label-width="85px" :inline="true" :rules="rules">
                <el-form-item label="客诉等级" required prop="orderLevel">
                    <el-select v-model="form.orderLevel" placeholder="请选择">
                        <el-option label="一般" value="1"></el-option>
                        <el-option label="紧急" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bug等级" required prop="bugLevel">
                    <el-select v-model="form.bugLevel" placeholder="请选择">
                        <el-option label="致命" value="1"></el-option>
                        <el-option label="严重" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="次要" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bug类型" required prop="bugType">
                    <el-select v-model="form.bugType" placeholder="请选择">
                        <el-option label="功能" value="1"></el-option>
                        <el-option label="接口" value="2"></el-option>
                        <el-option label="逻辑" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="星号标记">
                    <el-radio class="radio" v-model="form.isStar" label="true">是</el-radio>
                    <el-radio class="radio" v-model="form.isStar" label="false">否</el-radio>
                </el-form-item>
            </el-form>
            <el-form ref="form-c" :model="form">
                <el-form-item label=" 运维备注">
                    <el-input v-model="form.operationRemark" class="remark-input"></el-input>
                </el-form-item>
                <el-form-item label=" 运维附件">
                    <qiniu-img v-model="form.workorderAttaches"></qiniu-img>
                </el-form-item>
                <el-form-item label="客诉状态">
                    <el-radio class="radio" v-model="form.status" label="2" :disabled="disableStatus">正在处理</el-radio>
                    <el-radio class="radio" v-model="form.status" label="3" :disabled="disableStatus">正在处理-转技术解决
                    </el-radio>
                    <el-radio class="radio" v-model="form.status" label="4" :disabled="disableStatus">未解决</el-radio>
                    <el-radio class="radio" v-model="form.status" label="5" :disabled="disableStatus">处理完毕</el-radio>
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button type="primary" v-on:click="save">
                        保存
                    </el-button>
                    <el-button v-on:click="close">
                        关闭不保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import workOrderApi from 'api/workOrderApi'
    import chat from './chat.vue'
    export default {
        components: {
            'chat': chat,
        },
        props: {
            viewState: {
                type: Object,
            }
        },
        data(){
            let viewData = this.viewState.data;
            if (viewData.status <= 2) {
                viewData.status = "2";
            }
            if (viewData.status >= 5) {
                viewData.status = '5';
            }
            this.disableStatus = this.viewState.data.status >= 5 ? true : false
            return {
                form: {
                    id: viewData.id,
                    orderType: viewData.orderType ? viewData.orderType.toString() : '',
                    orderLevel: viewData.orderLevel ? viewData.orderLevel.toString() : '',
                    bugLevel: viewData.bugLevel ? viewData.orderLevel.toString() : '',
                    bugType: viewData.bugType ? viewData.bugType.toString() : '',
                    status: viewData.status.toString(),
                    isStar: viewData.isStar.toString(),
                    operationRemark: viewData.operationRemark,
                    workorderAttaches: viewData.workorderAttaches ? viewData.workorderAttaches.split(',') : [],
                },
                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    orderType: [
                        {required: true, message: '请选择客诉类型', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                if (value == 9 && !this.form.otherDetail) {
                                    callback(new Error('请输入其他详情'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    orderLevel: [
                        {required: true, message: '请选择客诉等级', trigger: 'blur'}
                    ],
                    bugType: [
                        {required: true, message: '请选择bug类型', trigger: 'blur'}
                    ],
                    bugLevel: [
                        {required: true, message: '请选择bug等级', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            save(){
                let validA, validB = false;
                let validSave = () => {
                    console.log(validA, validB)
                    if (validA && validB) {
                        workOrderApi.save(this.form).then(res => {
                            this.$emit('view', {
                                type: 'list'
                            })
                        })
                    }
                }
                this.$refs['form-a'].validate((valid) => {
                    if (valid) {
                        validA = true
                        validSave()
                    } else {
                        return false;
                    }
                });
                this.$refs['form-b'].validate((valid) => {
                    if (valid) {
                        validB = true
                        validSave()
                    } else {
                        return false;
                    }
                });
            },
            close(){
                this.$emit('view', {
                    type: 'list'
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            fetchData(){
                workOrderApi.detail({
                    workorderId: this.form.id
                })
            }
        }
    }
</script>
<style lang="less">
    .remark-input {
        width: 80% !important;
    }
</style>