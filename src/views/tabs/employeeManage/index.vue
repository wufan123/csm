<template>
    <div class="tab-content">
        <list-component v-show="type==='list'" @setType="setPage" ref="list"></list-component>
        <add-component v-if="type === 'add'" @setType="setPage"></add-component>
        <edit-component v-if="type === 'edit'" @setType="setPage" :dataObj="data"></edit-component>
    </div>
</template>
<
<script>
    import listComponent from './list.vue'
    import AddComponent from './add.vue'
    import editComponent from './edit.vue'
    export default {
        data(){
            return {
                type: 'list',
                data: []
            }
        },
        components: {listComponent, AddComponent, editComponent},
        methods: {
            setPage(params){
                this.data = this.$util.isEmptyObject(params.data) ? {} : params.data;
                this.type = params.type
                if (params.type == 'list') {
                    this.$refs.list.searchSubmit();
                }
            },
            fetchData(){
                if (this.type == 'list') {
                    this.$refs.list.searchSubmit();
                }
            }
        }
    }
</script>
<style lang="less">

</style>


