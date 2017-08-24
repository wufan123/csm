<template>
    <div class="tab-content">
        <list v-show="!view" v-on:view="changeViewState" :viewState="viewState" ref="list"></list>
        <component v-if="view" v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

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
                viewState: {
                    type:'list'
                },
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
                        this.$refs.list.getList();
                        break;
                    case 'edit':
                        this.view = edit;
                        break;
                }
            },
            fetchData(need){
                if (need) {
                    if (this.viewState.type == 'list') {
                        console.log('1111')
                        this.$refs.list.getList();
                    }
                }
            }
        }
    }
</script>