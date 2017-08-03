<template>
<div>
    <div>
        <component v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

        </component>
    </div>
</div>
</template>
<script>
    import list from 'views/tabs/suggest/list.vue'
    import add from 'views/tabs/suggest/add.vue'
    import edit from 'views/tabs/suggest/edit.vue'
    import check from 'views/tabs/suggest/check.vue'
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
                this.viewState = state;
                switch (state.type)
                {
                    case 'add':
                        this.view =add;
                        break;
                    case 'list':
                        this.view =list;
                        break;
                    case 'edit':
                        this.view =edit;
                        break;
                    case 'check':
                        this.view =check;
                        break;
                }
            }
        }
    }
</script>