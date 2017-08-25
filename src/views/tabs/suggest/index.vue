<template>
    <div class="tab-content">
        <list v-show="!view" v-on:view="changeViewState" :viewState="viewState" ref="list"></list>
        <component v-if="view" v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

        </component>
    </div>
</template>
<script>
    import list from 'views/tabs/suggest/list.vue'
    import add from 'views/tabs/suggest/add.vue'
    import edit from 'views/tabs/suggest/edit.vue'
    import check from 'views/tabs/suggest/check.vue'
    export default {
        components: {
            'list': list,
        },
        data(){
            return {
                viewState: {
                    type:'list'
                },
                view: '',
                dialogImageUrl: ''
            }
        },
        methods: {
            changeViewState(state){
                this.viewState = state;
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
                    case 'check':
                        this.view = check;
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