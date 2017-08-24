<template>
        <div class="tab-content">
            <component v-bind:is="view" v-on:view="changeViewState" ref="list">

            </component>
        </div>
</template>
<script>
    import list from 'views/tabs/cinemaManager/list.vue'
    export default {
        data(){
            return {
                viewState: {
                    type:'list'
                },
                view:list,
            }
        },
        methods:{
            changeViewState(state){
                this.viewState = state;
                switch (state.type)
                {
                    case 'list':
                        this.view =list;
                        break;
                }
            },
            fetchData(need){
                if (need) {
                    if (this.viewState.type == 'list') {
                        this.$refs.list.getList();
                    }
                }
            }
        }
    }
</script>