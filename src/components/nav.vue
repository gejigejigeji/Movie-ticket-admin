<template>
    <el-row class="topNavMenu">
        <el-col class="menuCol">
            <el-tabs tab-position="left" v-model="active"  @tab-click="onToPage">
                 <el-tab-pane :label="a.name" v-for="a,b in menuList" :key="b" :name="`${b}`"></el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "topnav",
        props:['menuList'],
        data() {
            return{
                active:"0"
            }
        },
        methods:{
            onToPage(b) {
                this.$router.push({
                    path:this.menuList[this.active].url
                }).catch(e=>{})
            }
        }
    }
</script>

<style lang="scss">
    .topNavMenu{
        .el-tabs--left{
            height: 100%;
        }

        .el-tabs__content{
            display: none !important;
        }
        .menuCol{
            height: 100%;
        }
    }
</style>