<template>
    <div id="complaint-list">
        <component v-bind:is="view" v-on:view="changeViewState" :viewState="viewState">

        </component>
    </div>
</template>
<script>
    import list from 'views/tabs/workOrder/list.vue'
    import add from 'views/tabs/workOrder/add.vue'
    import handle from 'views/tabs/workOrder/handle.vue'
    export default {
        props:['tabForm'],
        data(){
            return {
                viewState: {
                    tabForm:this.tabForm
                },
                view:list
            }
        },
        methods: {
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
                    case 'handle':
                        this.view =handle;
                        break;
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
    }
</style>