<template>
    <div class="tab-content">
        <list-component v-if="type==='list'" @setType="setPage" ref="list"></list-component>
    </div>
</template>
<
<script>
    import listComponent from './list.vue'
    export default {
        data(){
            return {
                type: 'list',
                data: []
            }
        },
        components: {listComponent},
        methods: {
            setPage(params){
                this.data = this.$util.isEmptyObject(params.data) ? {} : params.data;
                this.type = params.type
            },
            fetchData(need){
                if (need) {
                    if (this.type == 'list') {
                        this.$refs.list.searchSubmit();
                    }
                }
            }
        }
    }
</script>
<style lang="less">

</style>


