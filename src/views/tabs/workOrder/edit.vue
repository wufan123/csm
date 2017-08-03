<template>
    <div class="tab-form complaint">
        <el-row class="tab-pane-title">
            编辑客诉
        </el-row>
        <el-row class="property">
            <el-col :span="4">
                客诉来源:自建
            </el-col >
            <el-col :span="4">
                客诉影院:仓山万达店
            </el-col>
            <el-col :span="4">
                客诉影院组:万达影院组
            </el-col>
            <el-col :span="4">
                客诉发起人:李易峰
            </el-col>
            <el-col :span="6">
                客诉时间:2616-10-10 10:10:10
            </el-col>
        </el-row>
        <el-row class="des">
            问题：有个客人要退票，订单...
        </el-row>
        <el-row>
            <el-form ref="form" :model="form" label-width="85px" >
                <el-form-item label="客诉类型"  required>
                    <el-col :span="6">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="15">
                        &nbsp
                    </el-col>
                    <el-col :span="3" class="">
                        查看沟通记录
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="85px" :inline="true">
                <el-form-item label="客诉等级"  required>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bug等级"  required>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bug类型"  required>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="星号标记">
                    <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio" label="2">否</el-radio>
                </el-form-item>
            </el-form >
            <el-form ref="form" :model="form">
                <el-form-item label="运维备注">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="运维附件">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="客诉状态">
                    <el-radio class="radio" v-model="radio2" label="1">正在处理</el-radio>
                    <el-radio class="radio" v-model="radio2" label="2">正在处理-转技术解决</el-radio>
                    <el-radio class="radio" v-model="radio2" label="3">未解决</el-radio>
                    <el-radio class="radio" v-model="radio2" label="4">处理完毕</el-radio>
                </el-form-item>
                <el-form-item class="form-button" >
                    <el-button type="primary">
                        保存
                    </el-button>
                    <el-button>
                        关闭不保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form:{},
                radio:1,
                radio2:1,
                dialogImageUrl:'',
                dialogVisible:''
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        }
    }
</script>
