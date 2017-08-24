<template>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in portClassList" :key="item.id" :name="index">
            <template slot="title">
                <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.check"
                             @change="handleCheckChange(item)">{{item.name}}
                </el-checkbox>
            </template>
            <el-checkbox-group v-model="siteInterfaceIds">
                <div class="line" v-for="subItem in item.children" :key="subItem.id">
                    <p>
                        <el-checkbox :label="subItem.id" :key="subItem.id" @change="handleCheckChange()">{{subItem.interfaceName}}</el-checkbox>
                    </p>
                </div>
            </el-checkbox-group>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
    import portApi from 'api/siteInterfaceApi'
    export default {
        props: ['value'],
        data() {
            return {
                activeName: '',
                portClassList: [],
                portList: [],
                siteInterfaceIds: this.value
            }
        },
        watch: {
            value: function (newValue) {//此处 不能有=>
                this.siteInterfaceIds = newValue
                if (this.portClassList)//数值改变时，改变全选
                {
                    for (let i = 0; i < this.portClassList.length; i++) {
                        this.isAllcheck(i)
                    }
                }
            }
        },
        methods: {
            isAllcheck(index){
                let topItem = this.portClassList[index]
                if (!topItem || !topItem.children)
                    return
                let length =0
                for (let i = 0; i < topItem.children.length; i++) {
                    if ((this.siteInterfaceIds.indexOf(topItem.children[i].id) >= 0)) {
                        length++
                    }
                }
                if(length===topItem.children.length)
                {
                    topItem.isIndeterminate = false
                    topItem.check = true;
                }else if(length>0&&length<topItem.children.length){
                    topItem.isIndeterminate = true
                }else {
                    topItem.isIndeterminate = false
                    topItem.check = false;
                }
                this.$set(this.portClassList,index,topItem)

            },
            getPortClassList(){
                portApi.ListPortGroup({enable: true}).then(res => {
                    this.portClassList = res.resultData.content
                    this.getPortList()
                })
            },
            getPortList(){
                portApi.ListPort({enable: true}).then(res => {
                    this.portClassList && this.portClassList.forEach((subItem, subIndex) => {
                        this.portClassList[subIndex].children = []
//                        this.portClassList[subIndex].check =false
//                        this.portClassList[subIndex].isIndeterminate =false
                        res.resultData.content && res.resultData.content.forEach(item => {
                            this.portList = res.resultData.content
                            if (item.interfaceCategoryId == subItem.id) {
                                this.portClassList[subIndex].children.push(item)
                            }
                        })
                        console.log(subIndex)
                        this.isAllcheck(subIndex)
                    })
                })
            },
            handleCheckChange(item){
                console.log(item)
                if(item)
                {
                    if (item.check) {
                        item.children && item.children.forEach(item => {
                            this.siteInterfaceIds.push(item.id)
                        })
                    } else {
                        item.children && item.children.forEach(item => {
                            this.siteInterfaceIds.remove(item.id)
                        })
                    }

                }
                this.siteInterfaceIds = this.siteInterfaceIds.unique();
                this.$emit('input', this.siteInterfaceIds)
            },
            fetchData(){
                this.getPortClassList()
            }
        }
    }
</script>