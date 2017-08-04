<template>
    <div class="tab-form add-form">
        <el-row class="tab-pane-title">
            新建客诉
        </el-row>
        <el-row>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="请选择适用影院组" required>
                    <cinema-checkbox v-model="form.checkedOptions"></cinema-checkbox>
                </el-form-item>
                <el-form-item label="来源影院" required>
                    <el-input
                            type="textarea"
                            :rows="12"
                            placeholder="请输入内容"
                            v-model="form.textarea" disabled>
                    </el-input>
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
</template>
<script>
    export default {
        data(){
            return {
                form: {
                    cinemaGroupIds:[],
                },
            }
        },
        methods: {
            save(){
                console.log(this.form);
                return
                this.$emit('view', {
                    type:'list'
                })
            },
            close(){
                this.$emit('view', {
                    type:'list'
                })
            },
        }
    }
</script>