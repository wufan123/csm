<template>
    <div>
        <el-option v-for="(item,index) in cinemasOptions" :key="index" :label="item.name"
                   :value="item.id"></el-option>
    </div>
</template>
<script>
    import cinemaApi from 'api/cinemaApi'
    export default {
        props: {
            showAll: {
                type: Boolean
            }
        },
        data(){
            return {
                cinemasOptions: []
            }
        },
        methods: {
            getCinemas(cinemaGroupId){
                let ops = [];
                cinemaApi.listCinema({
                    cinemaGroupId: cinemaGroupId
                }).then(res => {
                    if (this.showAll)
                    {
                        ops =ops.concat([{id: '', name: '全部'}])
                    }
                    ops = ops.concat(res.resultData.content);
                    this.cinemasOptions = ops
                })
            },
            fetchData(){
                this.getCinemas('')
            }
        }

    }
</script>