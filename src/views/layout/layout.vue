<template>
    <div class="wrap">
        <div class="top">asds</div>
        <div class="content">
            <topNav class="left-menu" :menuList="menuList"></topNav>
            <router-view id="child-router-view"></router-view>
        </div>
    </div>

</template>

<script>
    import topNav from '@/components/nav.vue'
    export default {
        name: "layout",
        data() {
            return{
                menuList:[
                    {
                        name:'banner图片管理',url:'/admin/banner'
                    },
                    {
                        name:'产品列表',url:'/admin/product'
                    },
                    {
                        name:'产品款式',url:'/admin/productStyle'
                    },
                ]
            }
        },
        components:{
            topNav
        }
    }
</script>

<style scoped>
    .top{
        background: #0d3349;
        height: 50px;
        color: #fff;
        display: flex;
        align-items: center;
    }
    .content {
        box-sizing: border-box;
        height: 100vh;
        width: 100%;
        display: flex;
        overflow: hidden;
    }
    .left-menu {
        width: 150px;
    }
    #child-router-view {
        height: calc(100vh - 50px);
        flex: 1;
        overflow-y: auto;
        box-sizing: border-box;
    }
</style>
