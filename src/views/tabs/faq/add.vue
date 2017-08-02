<template>
    <div class="tab-form add-form">
        <el-row class="tab-pane-title">
            新建客诉
        </el-row>
        <el-row>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="请选择适用影院组" required>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="来源影院" required>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
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
                            v-model="form.textarea">
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
            const cityOptions = ['上海', '北京', '广州', '深圳'];
            return {
                form: {},
                checkAll: true,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
            }
        },
        methods:{
            save(){
                this.$emit('view', 'list')
            },
            close(){
                this.$emit('view', 'list')
            },
            handleCheckAllChange(event) {
                this.checkedCities = event.target.checked ? this.cities : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>