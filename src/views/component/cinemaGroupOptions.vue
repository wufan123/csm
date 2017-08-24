<template>
    <div>
        <el-option v-for="(item,index) in cinemaGroupOptions" :key="index" :label="item.name"
                   :value="item.id"></el-option>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    export default {
        props:{
            showAll:{
                type:Boolean
            }

        },
        data(){
            return{
                cinemaGroupOptions:[]
            }
        },
        methods:{
            fetchData(){
                cinemaApi.listCinemaGroup({}).then(res => {
                    let ops =[]
                    if (this.showAll)
                    {
                        ops = ops.concat([{id: '', name: '全部'}])
                    }
                    ops = ops.concat(res.resultData.content);
                    this.cinemaGroupOptions = ops;
                })
            },
        }

    }
</script>