<template>
    <div>
        <div>
            <component v-bind:is="view" v-on:view="changeViewState">

            </component>
        </div>
    </div>
</template>
<script>
    import list from 'views/tabs/cinemaManage/list.vue'
    export default {
        data(){
            return {
                viewState: 'list',
                view:list,
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods:{
            changeViewState(state){
                switch (state)
                {
                    case 'list':
                        this.view =list;
                        break;
                }
            }
        }
    }
</script>