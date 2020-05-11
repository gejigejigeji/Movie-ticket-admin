<template>
    <div class="wrap productList">
        <div class="list-group">

            <div class="list-items-first">
                <el-button type="primary" @click="addProduct">添加产品</el-button>

                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="序号"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="产品名称">
                    </el-table-column>
                    <el-table-column
                            prop="imgDir"
                            label="图片文件夹">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格">
                    </el-table-column>
                    <el-table-column
                            prop="extra"
                            label="简要说明">
                    </el-table-column>
                    <el-table-column
                            prop="createdAt"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column width="250px">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="onView(scope.row)">查看</el-button>
                            <el-button type="primary" @click="onAddDetails(scope.row)">添加详情</el-button>
                            <el-button type="primary" @click="onAddCover(scope.row)">添加封面</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="line"></div>
            <div class="list-items-last">
                <el-card class="box-card" v-for="a in masterList">
                    <div slot="header" class="clearfix">
                        <span>{{a.name}}</span>
                    </div>
                    <img :src="a.url" alt="">
                </el-card>
                <div class="product--details">
                    <div v-for="a in detailsList" class="detailImgWrap">
                        <img :src="a.url" alt="">
                    </div>
                </div>
            </div>

        </div>

        <addProduct ref="addProduct" @onRefreshProductList="onRefreshProductList"></addProduct>
        <addDetails ref="addDetails" :fatherData="addDetailsData"></addDetails>
        <addCover ref="addCover" :fatherData="addCoverData"></addCover>
    </div>
</template>

<script>
    import {
        getProductList,
        asd
    } from '@/api/product/product.js'

    import {
        getImageList,
        deleteFile} from '@/api/file/file.js'
    import addProduct from '@/views/product/component/addProduct.vue'
    import addDetails from '@/views/product/component/addDetails.vue'
    import addCover from '@/views/product/component/addCover.vue'
    export default {
        name: "product",
        data() {
            return{
                tableData:[],
                masterList:[],
                detailsList:[],
                addCoverData:null,
                addDetailsData:null,
                imgList:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:''
                },
                productId: ''
            }
        },
        components: {
            addProduct,addDetails,addCover
        },
        methods:{
            //设为封面
            onAddCover(row) {
                this.addCoverData = row;
                this.$refs.addCover.visible=true
            },
            onView(row) {
                this.productId = row.id;
                this.imgList.prefix = `sku/${row.imgDir}/`;
                this.requestImgList({...this.imgList});
            },
            onAddDetails(row) {
                this.addDetailsData = row;
                this.$refs.addDetails.visible = true;
            },
            onRefreshProductList() {
                this.requestProductList();
            },
            addProduct(row) {true
                this.$refs.addProduct.visible=true
            },
            requestProductList(resData) {
                return getProductList().then(res=>{
                    this.tableData = res.data;
                })

            },
            requestImgList(resData) {
                getImageList(resData)
                    .then(res=>{
                        let masterList = [],detailsList=[];
                        res.data.Contents.map(a => {
                            if (a.Key.indexOf('master') > 0) {
                                let name = a.Key.match(/(\w+\.(?:png|jpg|gif|bmp))$/)[0];
                                masterList.push({
                                    name,
                                    url:`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                                    key:a.Key
                                })
                            } else {
                                let name = a.Key.match(/(\w+\.(?:png|jpg|gif|bmp))$/);
                                detailsList.push({
                                    name,
                                    url:`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                                    key:a.Key
                                })
                            }
                        });
                        this.masterList = masterList;
                        this.detailsList = detailsList;
                    })
            }
        },
        created() {
            this.requestProductList();
        }
    }
</script>

<style lang="scss">
    .productList{
        .list-group {
            display: flex;
            height: 100%;


            .list-items-first {
                flex: 1;
                box-sizing: border-box;

                .el-button {
                    height: 30px;
                    font-size: 14px;
                    box-sizing: border-box;
                    padding: 5px 10px;
                    width: auto;
                }
            }

            .line {
                width: 10px;
                background: #0d3349;
                height: 100%;
            }
            .list-items-last {
                width: 460px;
                height: 100%;
                overflow-y: scroll;

                .box-card{
                    margin-left: 10px;
                    flex: 0 0 200px;
                    box-sizing: border-box;
                    display: inline-block;
                    margin-top: 10px;

                    .el-card__header{
                        padding: 10px;
                    }
                    .el-card__body {
                        width: 200px;
                        height: 200px;
                        padding: 10px;
                        box-sizing: border-box;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .clearfix{
                        display: flex;
                        align-items: center;
                        span {
                            flex: 1;
                        }

                    }
                }
            }
            .product--details {
                padding: 10px;
                .detailImgWrap{
                    position: relative;
                }
                .detailList-BTN {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    color: #fff;
                    background: rgba(0, 0, 0, .6);
                    border-radius: 50%;
                    right: 10px;
                    top: 10px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

</style>
