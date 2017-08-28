<template>
    <div>
        <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dateStart"
                            :picker-options="dateStartOptions"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dateEnd"
                            :picker-options="dateEndOptions"></el-date-picker>
        </el-col>
    </div>
</template>
<script>
    export default {
        props: ['value'],
        watch: {
            dateStart:function (newValue) {//此处不能有=>
                this.value.createTimeStart =newValue
                this.$emit('input', this.value)
            },
            dateEnd:function (newValue) {//此处不能有=>
                this.value.createTimeEnd = newValue
                this.$emit('input', this.value)
            }
        },
        data(){
            return {
                dateStart: this.value ? this.value.createTimeStart : '',
                dateEnd: this.value ? this.value.createTimeEnd : '',
                dateStartOptions: {
                    disabledDate: time => {//限制日期范围
                        if (time.getTime() > Date.now()) {
                            return true
                        } else {
                            if (this.dateEnd instanceof Date) {
                                return time.getTime() > this.dateEnd.getTime();
                            } else {
                                return false;
                            }
                        }

                    }
                },
                dateEndOptions: {
                    disabledDate: time => {
                        if (time.getTime() > Date.now()) {
                            return true;
                        } else {
                            if (this.dateStart instanceof Date) {
                                return time.getTime() < this.dateStart.getTime();
                            } else {
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
</script>