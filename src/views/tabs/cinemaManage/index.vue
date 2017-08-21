<template>
   <div class="tab-content">
      <list-component v-if="type==='list'" @setType="setPage"></list-component>
   </div>
</template>
<<script>
import listComponent from './list.vue'
export default {
  data(){
    return{
      type:'list',
      data:[]
    }
  },
  components:{listComponent},
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


