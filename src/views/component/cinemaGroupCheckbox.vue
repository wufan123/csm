<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedOptions" @change="handleCheckedChange">
            <el-checkbox v-for="(item,index) in groupOptions" :key="index" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    export default {
        props: ['value'],
        data(){
            return{
                groupOptions:[],
                checkAll: false,
                isIndeterminate: false,
                checkedOptions:this.value
            }
        },
        methods:{
            fetchData(){
                cinemaApi.listCinemaGroup({}).then(res => {
                    this.groupOptions = res.resultData.content
                })
            },
            handleCheckAllChange(event) {
                if(event.target.checked)
                {
                    this.checkedOptions = [];
                    for(let i in this.groupOptions){
                        this.checkedOptions.push(this.groupOptions[i].id)
                    }
                }else {
                    this.checkedOptions = [];
                }
                this.$emit('input', this.checkedOptions)
                this.isIndeterminate = false;
            },
            handleCheckedChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.groupOptions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.groupOptions.length;
                this.$emit('input', this.checkedOptions)
            }
        }
    }
</script>