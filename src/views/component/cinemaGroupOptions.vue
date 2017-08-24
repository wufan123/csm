<template>
    <div>
        <el-option v-for="(item,index) in cinemaGroupOptions" :key="index" :label="item.name"
                   :value="item.id"></el-option>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    export default {
        props:['showAll','withPermissions'],
        data(){
            return{
                cinemaGroupOptions:[]
            }
        },
        methods:{
            fetchData(){
                cinemaApi.listCinemaGroup({withPermissions:this.withPermissions}).then(res => {
                    let ops =[]
                    if (this.showAll)
                    {
                        ops = ops.concat([{id: '', name: '全部'}])
                    }
                    ops = ops.concat(this.withPermissions?res.resultData:res.resultData.content);
                    this.cinemaGroupOptions = ops;
                })
            },
        }

    }
</script>