<template>
    <div id="complaint-list">
       <!-- <complaint-list v-if="viewState == 'list'" v-on:view="changeViewState"></complaint-list>
        <complaint-add v-if="viewState == 'add'" v-on:view="changeViewState"></complaint-add>
        <complaint-edit v-if="viewState == 'edit'" v-on:view="changeViewState"></complaint-edit>
        <complaint-handle v-if="viewState == 'handle'" v-on:view="changeViewState"></complaint-handle>-->
        <component v-bind:is="view" v-on:view="changeViewState">

        </component>
    </div>
</template>
<script>
    import list from 'views/tabs/complaintList/list.vue'
    import add from 'views/tabs/complaintList/add.vue'
    import edit from 'views/tabs/complaintList/edit.vue'
    import handle from 'views/tabs/complaintList/handle.vue'
    export default {
        components: {
            'complaint-list': list,
            'complaint-add': add,
            'complaint-edit': edit,
            'complaint-handle': handle,
        },
        data(){
            return {
                viewState: 'list',
                view:list
            }
        },
        methods: {
            changeViewState(state){
                this.viewState = state
                switch (state)
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
        .property {
            font-size: @size-small;
            color: @color-base-gray;
            margin-bottom: 14px;
        }
        .des {
            background: #fffad5;
            color: #948200;
            margin-bottom: 20px;
            font-size: @size-medium;
            padding: 10px;
        }
        .el-input {
            width: auto;
        }
    }
</style>