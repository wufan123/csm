<template>
    <i class="dot-style">
        <i class="dot" v-for="(item,index) in this.count" :key="item" v-bind:class="count==(index+1)?'active':''" > </i>
    </i>
</template>
<script>
export default {
  props:{
      count:Number
  }

}
</script>
<style lang="less" scoped>
    @import "~style/base-variables";
    .dot-style{position: relative; bottom: -3px;
        i.dot{width: 15px;height: 15px;border-radius: 50%;background: #ccc;margin-right: 5px;}
        i.active{background: @color-info;}
    }
</style>

