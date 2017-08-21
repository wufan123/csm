<template>
    <div class="tab-content">
        <list v-show="showList" v-on:view="changeViewState" :viewState="viewState"></list>
        <component v-show="!showList" v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

        </component>
    </div>
</template>
<script>
    import list from 'views/tabs/faq/list.vue'
    import add from 'views/tabs/faq/add.vue'
    import edit from 'views/tabs/faq/edit.vue'
    export default {
        components: {
            'list': list,
        },
        data(){
            return {
                view: '',
                viewState: {},
                showList:true
            }
        },
        methods: {
            changeViewState(state){
                this.viewState = state
                switch (state.type) {
                    case 'add':
                        this.view = add;
                        break;
                    case 'list':
                        this.view = '';
                        break;
                    case 'edit':
                        this.view = edit;
                        break;
                }
                if(state.type=='list'){
                    this.showList =true
                }else {
                    this.showList =false
                }
            }
        }
    }
</script>