<template>
    <div>
        <div>
            <component v-bind:is="view" v-on:view="changeViewState">

            </component>
        </div>
    </div>
</template>
<script>
    import list from 'views/tabs/faq/list.vue'
    import add from 'views/tabs/faq/add.vue'
    export default {
        data(){
            return {
                view:list,
            }
        },
        methods:{
            changeViewState(state){
                switch (state)
                {
                    case 'list':
                        this.view =list;
                        break;
                    case 'add':
                        this.view =add;
                        break;
                }
            }
        }
    }
</script>