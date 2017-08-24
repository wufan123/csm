<template>
    <div class="tab-content">
        <list v-show="!view" v-on:view="changeViewState" :viewState="viewState" ref="list"></list>
        <component v-if="view" v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

        </component>
    </div>
</template>
<script>
    import list from 'views/tabs/workOrder/list.vue'
    import add from 'views/tabs/workOrder/add.vue'
    import handle from 'views/tabs/workOrder/handle.vue'
    export default {
        components: {
            'list': list,
        },
        props: ['tabForm'],
        data(){
            return {
                viewState: {
                    tabForm: this.tabForm,
                    type: 'list'
                },
                view: ''
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
                        this.$refs.list.getWorkOrders();
                        break;
                    case 'handle':
                        this.view = handle;
                        break;
                }
            },
            fetchData(need){
                if (need) {
                    if (this.viewState.type == 'list') {
                        this.$refs.list.getWorkOrders();
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";

    .complaint {
        .des {
            background: #fffad5;
            color: #948200;
            margin-bottom: 20px;
            font-size: @size-medium;
            padding: 10px;
            line-height: 25px;
        }
        .el-input {
            width: auto;
        }
        .operateView {
            position: absolute;
        }
    }
</style>