<template>
    <div>
        <div>
            <component v-bind:is="view" v-on:view="changeViewState">

            </component>
        </div>
    </div>
</template>
<script>
    import list from 'views/tabs/cinemaManager/list.vue'
    export default {
        data(){
            return {
                view:list,
            }
        },
        methods:{
            changeViewState(state){
                switch (state.type)
                {
                    case 'list':
                        this.view =list;
                        break;
                }
            }
        }
    }
</script>