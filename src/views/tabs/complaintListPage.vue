<template>
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
        }
    }
}
</script>
<style lang="less">

</style>