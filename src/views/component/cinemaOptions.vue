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
            cinemaGroupId: {
                required: true
            },
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
            getCinemas(){
                if(!this.cinemaGroupId)
                    return
                cinemaApi.listCinema({
                    cinemaGroupId: this.cinemaGroupId
                }).then(res => {
                    console.log(this.cinemaGroupId+ " ")
                    let ops = []
                    if (this.showAll)
                    {
                        ops =ops.concat([{id: '', name: '全部'}])
                    }
                    ops = ops.concat(res.resultData.content);
                    this.cinemasOptions = ops
                })
            }
            ,
            fetchData(){
                this.getCinemas()
            },
        }

    }
</script>