<template>
    <div>
        <div class="page position">
            <div class="p-title">编辑岗位</div>
            <div class="h20"></div>
            <div class="content addForm">
                <el-form :rules="rules" ref="position" :model="position" label-width="100px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="岗位名称" required prop="positionName">
                                <el-input v-model="position.positionName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="职员状态" prop="enable">
                                <el-radio class="radio" v-model="position.enable" label="true">正常</el-radio>
                                <el-radio class="radio" v-model="position.enable" label="false">停用</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="菜单权限" required prop="menuIds">
                                <menus-collapse v-model="position.menuIds"></menus-collapse>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="接口权限">
                                <el-collapse v-model="activeName2" accordion>
                                    <el-collapse-item v-for="(item,index) in portClassList" :key="item.id" :name="index">
                                        <template slot="title">
                                            <el-checkbox v-model="checkAll2[index]"
                                                         @change="handleCheckAllChange2(item.id)">{{item.name}}
                                            </el-checkbox>
                                        </template>
                                        <el-checkbox-group v-model="position.siteInterfaceIds">
                                            <div class="line" v-for="subItem in item.children" :key="subItem.id">
                                                <p>
                                                    <el-checkbox :label="subItem.id" :key="subItem.id">
                                                        {{subItem.interfaceName}}
                                                    </el-checkbox>
                                                </p>
                                            </div>

                                        </el-checkbox-group>
                                    </el-collapse-item>

                                </el-collapse>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="h10"></div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('position')">保存</el-button>
                        <el-button type="primary" :plain="true" @click="closeFn()">关闭不保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import positionApi from 'api/positionApi'
    import portApi from 'api/siteInterfaceApi'
    import loginApi from 'api/loginApi'
    import menusCollapse from 'views/component/menusCollapse.vue'
    export default {
        data() {
            return {
                checkAll: [],
                checkAll2: [],
                menuList: [],
                activeName2: '',
                portClassList: [],
                portList: [],
                position: {
                    menuIds: [],
                    siteInterfaceIds: [],
                    positionName: '',
                    enable: 'true'
                },
                rules: {
                    positionName: [{required: true, message: '请输入岗位名称', trigger: 'blur'}, {
                        min: 2,
                        max: 8,
                        message: '长度在 3 到 8 个字符',
                        trigger: 'blur'
                    }],
                    menuIds: [{type: 'array', required: true, message: '请至少选择一个菜单权限', trigger: 'change'}]
                }
            }
        },
        props: {
            dataObj: Object
        },
        components: {'menus-collapse': menusCollapse},
        methods: {
            getPortClassList() {
                portApi.ListPortGroup({enable: true}).then(res => {
                    this.portClassList = res.resultData.content;
                    this.getPortList()
                })
            },
            getPortList() {
                portApi.ListPort({enable: true}).then(res => {
                    this.portClassList && this.portClassList.forEach((subItem, subIndex) => {
                        this.portClassList[subIndex].children = [];
                        res.resultData.content && res.resultData.content.forEach(item => {
                            this.portList = res.resultData.content;
                            if (item.interfaceCategoryId == subItem.id) {
                                this.portClassList[subIndex].children.push(item)
                            }
                        })
                    })
                })
            },
            submitForm(position) {
                this.$refs[position].validate((valid) => {
                    if (valid) {
                        this.position.positionId = this.dataObj.id;
                        positionApi.editPosition(this.position).then(res => {
                            this.$emit('setType', {
                                type: 'list'
                            })
                        })
                    } else {

                    }
                })
            },
            handleCheckAllChange2(id) {
                console.log('id', id, this.portList);
                let arr = this.position.siteInterfaceIds;
                let arr2 = this.position.siteInterfaceIds;
                if (!event.target.checked) {
                    this.portList && this.portList.forEach(item => {
                        if (item.interfaceCategoryId == id) {
                            arr2.remove(item.id);
                        }
                    })
                } else {
                    this.portList && this.portList.forEach(item => {
                        if (item.interfaceCategoryId == id) {
                            arr.push(item.id)
                        }
                    })
                }
                arr = arr.unique();
                arr2 = arr2.unique();
                console.log('arr', arr);
                console.log('arr2', arr2);
                this.position.siteInterfaceIds = event.target.checked ? arr : arr2;
            },
            closeFn() {
                this.$emit('setType', {
                    type: 'list'
                })
            },
            fetchData(){
                var brr = [];
                var brr2 = [];
                positionApi.detailPostion({ positionId: this.dataObj.id }).then(res => {
                    this.position.enable = res.resultData.enable.toString();
                    this.position.positionName = res.resultData.positionName;
                    res.resultData.menuList && res.resultData.menuList.forEach(item => {
                        if(item.enable){
                            brr.push(item.id)
                        }
                    });
                    res.resultData.siteInterfaces && res.resultData.siteInterfaces.forEach(item => {
                        if(item.enable){
                            brr2.push(item.id)
                        }
                    });
                    this.position.menuIds =brr;
                    this.position.siteInterfaceIds = brr2;
                });
                this.getPortClassList()
            }
        }
    }
</script>
<style lang="less">
    .position {
        .el-collapse {
            border: 0;
        }
        .el-collapse-item {
            border: 1px solid rgb(236, 223, 223);
            margin-bottom: 10px;
        }
        .el-collapse-item__content {
            padding: 0;
            .line {
                background: #fff;
                border-top: 1px solid rgb(236, 223, 223);
                &:first-child {
                    border: 0;
                }
            }
            p {
                padding: 10px 35px;
                display: block;
            }
        }
    }
</style>