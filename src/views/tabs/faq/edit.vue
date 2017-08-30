<template>
    <div>
        <div class="tab-form">
            <el-row class="tab-pane-title">
                编辑FAQ
            </el-row>
            <el-row class="property">
                <el-col :span="6">
                    添加日期:{{new Date(form.createTime).format('yyyy-MM-dd hh:mm:ss')}}
                </el-col>
                <el-col :span="4">
                    添加职员:{{form.serviceUserName}}
                </el-col>
            </el-row>
            <el-row>
                <el-form ref="form" :model="form" label-width="140px" :rules="rules">
                    <el-form-item label="请选择适用影院组" prop="cinemaGroupIds" required>
                        <cinema-checkbox v-model="form.cinemaGroupIds" :diableField="'hasFaq'"></cinema-checkbox>
                    </el-form-item>
                    <el-form-item label="来源影院" required prop="content">
                        <div class="form-item-des">
                            <label class="t-danger">请注意:问题与答案请用换行分割,上下两个问题间使用";"分割,参考以下示例:</label><br/>
                            问:这是问题1标题<br/>
                            答:这是问题1的答案；<br/>
                            问:这是问题2标题<br/>
                            答:这是问题2的答案；<br/>
                        </div>
                        <el-input
                                type="textarea"
                                :rows="12"
                                placeholder="请输入内容"
                                v-model="form.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-button">
                        <el-button type="primary" v-on:click="save">保存</el-button>

                        <el-button v-on:click="close">关闭不保存</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
    import platformFaqApi from 'api/platformFaqApi'
    export default {
        props: {
            viewState: {
                type: Object,
            }
        },
        data(){
            let form = this.viewState.data;
            form.faqId = form.id //字段不同
            return {
                form: form,
                rules: {
                    cinemaGroupIds: [
                        {
                            validator: (rule, value, callback) => {
                                if (value.length <= 0) {
                                    callback(new Error('请选择适用影院'));
                                }
                                callback()
                            },trigger: 'change'
                        }
                    ],
                    content: [
                        {required: true, message: '请输入FAQ内容', trigger: 'blur'},
                        {max: 5000, message: '长度不超过5000个字符', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                let questionArray = value.split('；\n');
                                if (value.lastIndexOf('；') !== value.length - 1 || !questionArray.length > 0) {
                                    callback(new Error('FAQ内容格式有误,每对问答间以；结尾并换行，最后一对问答无需换行。'));
                                }
                                for (let i = 0; i < questionArray.length; i++) {
                                    let faqItem = questionArray[i].split(/[\r\n]/g);
                                    if (!faqItem || faqItem.length !== 2 || !faqItem[0] || !faqItem[1]) {
                                        callback(new Error(`在第${i+1}对问答处FAQ内容格式有误,问与答之间请回车换行，且只有一个问一个答。`));
                                    }
                                }
                                return callback();
                            }, trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        platformFaqApi.save(this.form).then(res => {
                            this.$emit('view', {
                                type: 'list'
                            })
                        })
                    } else {
                        return false;
                    }
                });
            },
            close(){
                this.$confirm('你确定要放弃吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: "你已放弃本次操作",
                        type: 'info'
                    })
                    this.$emit('view', {
                        type:'list'
                    })
                })
            },
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";
    .tab-form {
        .form-item-des {
            background: @color-base-bg;
            padding: 10px;
            color: @color-base-gray;
            margin-bottom: 10px;
        }
    }
</style>