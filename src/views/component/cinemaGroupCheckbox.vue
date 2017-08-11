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
            console.log(this.value)

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
                    this.handleCheckedChange(this.value)

                })
            },
            handleCheckAllChange(event) {
                if(event.target.checked)
                {
                    for(let i=0;i<this.groupOptions.length;i++){

                        this.checkedOptions.push(this.groupOptions[i].id)
                    }
                }else{
                    this.checkedOptions =[]

                }
                this.$emit('input', this.checkedOptions)
                this.isIndeterminate = false;
            },
            handleCheckedChange() {
                console.log(this.checkedOptions.length)
                this.checkAll =this.checkedOptions.length === this.groupOptions.length;
                this.isIndeterminate = this.checkedOptions.length > 0 && this.checkedOptions.length < this.groupOptions.length;
                this.$emit('input', this.checkedOptions)
            }
        }
    }
</script>