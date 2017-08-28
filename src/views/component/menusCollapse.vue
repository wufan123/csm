<template>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in topMenus" v-if="item.hierarchy==1&&item.enable" :key="item.id"
                          :name="index">
            <template slot="title">
                <el-checkbox  :indeterminate="item.isIndeterminate" v-model="item.check" @change="handleCheckChange(item)">{{item.name}}</el-checkbox>
            </template>
            <el-checkbox-group v-model="menuIds">
                <div class="line" v-if="item.enable">
                    <p>
                        <el-checkbox :label="item.id" :key="item.id" v-model="item.all"
                                     @change="handleCheckChange(item,index)">
                            <c-dot :count="item.hierarchy"></c-dot>
                            {{item.name}}
                        </el-checkbox>
                    </p>
                    <div class="line" v-for="subItem in item.children" :key="subItem.id" v-if="subItem.enable">
                        <p>
                            <el-checkbox :label="subItem.id" :key="subItem.id"
                                         @change="handleCheckChange(subItem,index)">
                                <c-dot :count="subItem.hierarchy"></c-dot>
                                {{subItem.name}}
                            </el-checkbox>
                        </p>
                        <div class="line" v-for="subsubItem in subItem.children" :key="subsubItem.id"
                             v-if="subsubItem.enable">
                            <p>
                                <el-checkbox :label="subsubItem.id" :key="subsubItem.id"
                                             @change="handleCheckChange(subsubItem,index)">
                                    <c-dot :count="subsubItem.hierarchy"></c-dot>
                                    {{subsubItem.name}}
                                </el-checkbox>
                            </p>
                        </div>
                    </div>
                </div>
            </el-checkbox-group>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
    import cDot from 'views/component/dot.vue'
    import menuApi from 'api/menuApi'
    export default {
        props: ['value'],
        data() {
            return {
                menuList: [],
                activeName: 0,
                menuIds: this.value,
                topMenus: [],
            }
        },
        watch: {
            value: function (newValue) {//此处不能有=>
                console.log('value')
                this.menuIds =newValue
                if (this.topMenus)//数值改变时，改变全选
                {
                    for (let i = 0; i < this.topMenus.length; i++) {
                        this.isAllcheck(i)
                    }
                }

            }
        },
        components: {'c-dot': cDot},
        methods: {
            fetchData(){
                this.getMenuList();
            },
            getMenuList() {
                menuApi.ListMenu({enable: true}).then(res => {
                    this.menuList = res.resultData.content
                    this.topMenus = this.menuList.filter(item => {
                        return item.hierarchy === 1;
                    })
                    if (!this.topMenus)
                        return
                    for (let i = 0; i < this.topMenus.length; i++) {
                        let topItem = this.topMenus[i];
                        topItem.allId = [topItem.id]
                        topItem.allId = topItem.allId.concat(this.getChildrenId(topItem.children))
                        this.isAllcheck(i)
                    }

                })
            },
            handleCheckChange(item, index){
                if (index || index == 0) {//index区分是不是一级菜单被选中
                    if (this.menuIds.indexOf(item.id) >= 0) {
                        this.pushChildrenId(item.children)
                        this.pushParentId(item.parentId)
                    } else {
                        this.removeChildrenId(item.children)
                    }
                } else {
                    if (item.check) {
                        this.menuIds.push(item.id)
                        this.pushChildrenId(item.children)
                    } else {
                        this.menuIds.remove(item.id)
                        this.removeChildrenId(item.children)
                    }
                }
                this.menuIds = this.menuIds.unique();
                this.$emit('input', this.menuIds)
            },
            pushParentId(parentId){
                if (!parentId)
                    return
                console.log(parentId)
                this.menuIds.push(parentId)
                for (let i = 0; i < this.menuList.length; i++) {
                    if (this.menuList[i].id === parentId) {
                        this.pushParentId(this.menuList[i].parentId)
                    }
                }
            },
            removeParentId(parentId){
                if (!parentId)
                    return
                this.menuIds.remove(parentId)
                for (let i = 0; i < this.menuList.length; i++) {
                    if (this.menuList[i].id === parentId) {
                        this.removeParentId(this.menuList[i].parentId)
                    }
                }

            },
            pushChildrenId(menus){
                if (!menus)
                    return
                for (let i = 0; i < menus.length; i++) {
                    this.menuIds.push(menus[i].id)
                    if (menus[i].children) {
                        this.pushChildrenId(menus[i].children)
                    }
                }
            },
            removeChildrenId(menus){
                if (!menus)
                    return
                for (let i = 0; i < menus.length; i++) {
                    this.menuIds.remove(menus[i].id)
                    if (menus[i].children) {
                        this.removeChildrenId(menus[i].children)
                    }
                }
            },
            isAllcheck(index){
                let topItem = this.topMenus[index]
                if (!topItem || !topItem.allId)
                    return
                let length =0
                for (let i = 0; i < topItem.allId.length; i++) {
                    if(this.menuIds.indexOf(topItem.allId[i])>=0){
                        length++
                    }
                }
                if(length===topItem.allId.length)
                {
                    topItem.isIndeterminate = false
                    topItem.check = true;
                }else if(length>0&&length<topItem.allId.length){
                    topItem.isIndeterminate = true
                }else {
                    topItem.isIndeterminate = false
                    topItem.check = false;
                }
//                this.$set(this.topMenus,index,topItem)
            },
            getChildrenId(children){
                if (!children)
                    return
                let ids = []
                for (let i = 0; i < children.length; i++) {
                    ids.push(children[i].id)
                    if (children[i].children) {
                        ids = ids.concat(this.getChildrenId(children[i].children))
                    }
                }
                return ids;
            }
        }
    }
</script>