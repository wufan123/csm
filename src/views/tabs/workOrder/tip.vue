<template>
    <div class="news-tip">
        <span class="icon"></span><a>您有什么鬼什么鬼</a>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";
 .news-tip{
     height: 40px;
     width: 180px;
     background: @color-primary;
     line-height: 40px;
     color: @color-white;
     font-size: @size-small;
     text-align: center;
     display: inline-block;
     z-index: 1000;
     .icon{
         height: 30px;
         width: 30px;
         background: @color-base-bg;
         border-radius: 15px;
         position: absolute;
         top: 5px;
         left: 5px;
     }

 }
</style>