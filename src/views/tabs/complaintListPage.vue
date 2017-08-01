<template>
<<<<<<< HEAD
    <el-form ref="form" :model="form" label-width="74px" inline="true">
        <el-form-item label="客诉类型">
            <el-select v-model="form.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="影院组名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="影院名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客诉日期">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="客诉等级">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客诉来源">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客诉状态">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否星标">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            form: {}
=======
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
>>>>>>> 358c334f2eb478ce201e9e57bf6364c6dd7f43a9
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