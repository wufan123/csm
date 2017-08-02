<template>
   <div>
      <list-component v-if="type==='list'" @setType="setPage"></list-component>
      <add-component v-if="type === 'add'" @setType="setPage"></add-component>
      <edit-component v-if="type === 'edit'" @setType="setPage" :dataObj="data"></edit-component>
   </div>
</template>
<<script>
import listComponent from './list.vue'
import AddComponent from './add.vue'
import editComponent from './edit.vue'
export default {
  data(){
    return{
      type:'list',
      data:[]
    }
  },
  components:{listComponent,AddComponent,editComponent},
  methods:{
    setPage(params){
      this.data = this.$util.isEmptyObject(params.data) ? {} : params.data;
      this.type = params.type
    }
  }
}
</script>
<style lang="less">

</style>


