<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选<label v-if="diableField=='hasFaq'">(不可选影院组表示已有FAQ)</label></el-checkbox>
        <br/>
        <el-checkbox-group v-model="checkedOptions" @change="handleCheckedChange">
            <el-checkbox v-for="(item,index) in groupOptions" :key="index" :label="item.id"
                         :disabled="item[diableField]&& firstValue.indexOf(item.id)==-1">
                {{item.name}}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    import platformFaqApi from 'api/platformFaqApi'
    export default {
        props: ['value', 'diableField'],
        data(){
            this.firstValue =[]
            for(let i =0;i<this.value.length;i++){
                this.firstValue.push(this.value[i])
            }
            return {
                groupOptions: [],
                checkAll: false,
                isIndeterminate: false,
                checkedOptions: this.value//用于提交表单
            }
        },
        methods: {
            fetchData(){
                cinemaApi.listCinemaGroup({}).then(res => {
                    this.groupOptions = res.resultData.content
                    this.handleCheckedChange(this.value)

                })
            }
            ,
            handleCheckAllChange(event) {
                if (event.target.checked) {
                    for (let i = 0; i < this.groupOptions.length; i++) {
                        if (this.firstValue.indexOf(this.groupOptions[i].id)>=0||!this.groupOptions[i][this.diableField]) {
                            this.checkedOptions.push(this.groupOptions[i].id)
                        }
                    }
                } else {
                    this.checkedOptions = []

                }
                this.$emit('input', this.checkedOptions)
                this.isIndeterminate = false;
            },
            handleCheckedChange() {
                this.checkAll = this.checkedOptions.length === this.groupOptions.length;
                this.isIndeterminate = this.checkedOptions.length > 0 && this.checkedOptions.length < this.groupOptions.length;
                this.$emit('input', this.checkedOptions)
            }
        }
    }
</script>