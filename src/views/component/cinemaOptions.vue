<template>
    <div>
        <el-option v-for="(item,index) in cinemasOptions" :key="index" :label="item.name"
                   :value="item.id"></el-option>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    export default {
        props: ['showAll','withPermissions'],
        data(){
            return {
                cinemasOptions: []
            }
        },
        methods: {

            getCinemas(cinemaGroupId){
                let ops = [];
                let api;
                if(!cinemaGroupId&&this.withPermissions)
                {
                    api =cinemaApi.listCinemaByUser()
                }else{
                    api =cinemaApi.listCinema({
                        cinemaGroupId: cinemaGroupId,
                    })
                }
                api.then(res => {
                    if (this.showAll)
                    {
                        ops =ops.concat([{id: '', name: '全部'}])
                    }
                    ops = ops.concat(cinemaGroupId?res.resultData.content:res.resultData);
                    this.cinemasOptions = ops
                })
            },
            fetchData(){
                this.getCinemas('')
            }
        }

    }
</script>