<template>
    <div>
        <div class="tab-form complaint">
            <chat :workorder="this.viewState.data" v-if="this.viewState.data&&this.viewState.data.teamId"
                  ref="chat"></chat>
            <el-row class="tab-pane-title">
                处理客诉
            </el-row>
            <el-row class="property">
                <el-col :span="4">
                    客诉来源: {{viewState.data ? viewState.data.orderSourceName : ''}}
                </el-col>
                <el-col :span="4">
                    客诉影院: {{viewState.data ? viewState.data.cinemaName : ''}}
                </el-col>
                <el-col :span="4">
                    客诉影院组: {{viewState.data ? viewState.data.cinemaGroupName : ''}}
                </el-col>
                <el-col :span="4">
                    客诉发起人: {{viewState.data ? viewState.data.initiatorName : ''}}
                </el-col>
                <el-col :span="6">
                    客诉时间: {{new Date(viewState.data ? viewState.data.createTime : '').format('yyyy-MM-dd hh:mm:ss')}}
                </el-col>
            </el-row>
            <el-row class="des">
                <i class="el-icon-warning"></i> 问题: {{viewState.data ? viewState.data.content : ''}}
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
                            <el-input v-model="form.otherDetail" class="remark-input" placeholder="其他详情"
                                      :maxlength="50">

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
                        <el-input v-model="form.operationRemark" class="remark-input" :maxlength="80"></el-input>
                    </el-form-item>
                    <el-form-item label=" 运维附件">
                        <qiniu-img v-model="form.workorderAttaches"></qiniu-img>
                    </el-form-item>
                    <el-form-item label="客诉状态">
                        <el-radio class="radio" v-model="form.status" label="2" :disabled="disableStatus">正在处理
                        </el-radio>
                        <el-radio class="radio" v-model="form.status" label="3" :disabled="disableStatus">正在处理-转技术解决
                        </el-radio>
                        <el-radio class="radio" v-model="form.status" label="4" :disabled="disableStatus">未解决</el-radio>
                        <el-radio class="radio" v-model="form.status" label="5" :disabled="disableStatus">处理完毕
                        </el-radio>
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
            return {
                form: {
                    id: this.viewState.data.id,
                    orderType: '',
                    orderLevel: '',
                    bugLevel: '',
                    bugType: '',
                    status: '',
                    isStar: '',
                    operationRemark: '',
                    workorderAttaches: [],
                    otherDetail: ''
                },
                disableStatus: true,
                dialogImageUrl: '',
                dialogVisible: false,
                lock: '',
                rules: {
                    orderType: [
                        {required: true, message: '请选择客诉类型', trigger: 'change'},
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
                        {required: true, message: '请选择客诉等级', trigger: 'change'}
                    ],
                    bugType: [
                        {required: true, message: '请选择bug类型', trigger: 'change'}
                    ],
                    bugLevel: [
                        {required: true, message: '请选择bug等级', trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            save(){
                let validA, validB = false;
                let validSave = () => {
                    if (validA && validB) {
                        workOrderApi.save(this.form).then(res => {
                            this.sendOrderChageNotify();
                            if (this.viewState.data.status != res.resultData.status && res.resultData.status < 5) {
                                if (this.$refs.chat)
                                    this.$refs.chat.sendtxt(`您的问题已变为${res.resultData.statusName}状态`)
                            }
                            this.$message({
                                message: `客诉处理成功，当前状态为${res.resultData.statusName}`,
                                type: 'info'
                            })
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
            sendOrderChageNotify(){
                if (this.viewState.data.teamId) {
                    window._nim.sendCustomSysMsg({
                        scene: 'team',
                        to: this.viewState.data.teamId,
                        content: JSON.stringify({type: 'workorderChange'}),
                        sendToOnlineUsersOnly: true,
                        apnsText: '',
                        done: (error, msg) => {
                            console.log('发送' + msg.scene + '自定义系统通知' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
                        }
                    });
                }
            },
            close(){
                this.$confirm('你确定放弃处理该客诉订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: "你放弃了处理客诉订单",
                        type: 'info'
                    })
                    this.$emit('view', {
                        type: 'list'
                    })
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
                }).then(res => {
                    if (this.viewState.data.status == '1')//判断原来的status 是不是等待处理
                    {
                        this.sendOrderChageNotify();
                        if (this.$refs.chat)
                            this.$refs.chat.sendtxt(`您好，最美运维${this.userDetail.fullName}为您服务，请稍等`)
                    }
                    let viewData = res.resultData
                    let status;
                    if (viewData.status <= 2) {
                        status = "2";
                    }
                    else if (viewData.status >= 5) {
                        status = '5';
                    } else {
                        status = viewData.status.toString()
                    }
                    this.disableStatus = viewData.status >= 5 ? true : false
                    this.form = {
                        id: viewData.id,
                        orderType: viewData.orderType ? viewData.orderType.toString() : '',
                        orderLevel: viewData.orderLevel ? viewData.orderLevel.toString() : '',
                        bugLevel: viewData.bugLevel ? viewData.orderLevel.toString() : '',
                        bugType: viewData.bugType ? viewData.bugType.toString() : '',
                        status: status,
                        isStar: viewData.isStar.toString(),
                        operationRemark: viewData.operationRemark,
                        workorderAttaches: viewData.workorderAttaches ? viewData.workorderAttaches.split(',') : [],
                        otherDetail: viewData.otherDetail
                    }
                })
            },
            viewReady(){
                this.lock = workOrderApi.lock(this.form.id);
                this.userDetail = this.$storage.getItem(this.$storage.KEY_USER_DETAIL)
                this.lock.onopen = evt => {
                    console.log('websocket已连接')
                };
                this.lock.onerror = evt => {
                    console.log('websocket连接错误')
                };
                this.lock.onclose = evt => {
                    console.log('断开websocket连接')
                };
            }
        },
        destroyed(){
            if (this.lock)
                this.lock.close();
        }
    }
</script>
<style lang="less">
    .remark-input {
        width: 80% !important;
    }
</style>