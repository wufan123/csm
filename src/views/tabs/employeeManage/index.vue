<template>
   <div>
      <list-component v-if="type==='list'" @setType="setPage"></list-component>
    <add-component v-if="type === 'add'" @setType="setPage"></add-component>
    <edit-component v-if="type === 'edit'" @setType="setPage"></edit-component>
   </div>
</template>
<<script>
import listComponent from './list.vue'
import AddComponent from './add.vue'
import editComponent from './edit.vue'
export default {
  data(){
    return{
      type:'list'
    }
  },
  components:{listComponent,AddComponent,editComponent},
  methods:{
    setPage(params){
      this.type = params
    }
  }
}
</script>
<style lang="less">

</style>


