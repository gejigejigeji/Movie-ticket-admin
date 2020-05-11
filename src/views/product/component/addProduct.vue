<template>
    <el-dialog
            class="addProductContainer"
            title="提示"
            width="1400px"
            :visible.sync="visible">
        <div>
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
                <el-form-item label="产品名称：" prop="title">
                    <el-input v-model="form.title" clearable placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="所属分类：" prop="id">
                    <el-select v-model="form.id"  clearable placeholder="所属分类">
                        <el-option
                                v-for=" a in optionCategory"
                                :label="a.title"
                                :value="(a.id).toString()"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格：" prop="price">
                    <el-input v-model.number="form.price" type="number" clearable placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="简要说明：">
                    <el-input v-model="form.extra" clearable placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="关键提示词：">
                    <el-input v-model="form.tips" clearable placeholder="逗号分隔"></el-input>
                </el-form-item>
                <el-form-item label="发货地点：">
                    <el-input v-model="form.sendAddress" clearable></el-input>
                </el-form-item>


            </el-form>
        </div>




        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    import {megSuc,megErr} from '@/utils/alert.js'
    import {city} from '@/utils/city.js'


    import {
        getCategoryList,
        createProduct
    } from '@/api/product/product.js'
    export default {
        name: "addProduct",
        props:[],
        data() {
            const asd = (rules, value, callback) => {
                if (value == '' ||value==null) {
                    callback('不能为空')
                }else{
                    callback();
                }
            };
            return{
                visible:false,
                row:null,
                form:{
                    title:'',
                    id:'',
                    price:null,
                    extra:'',
                    tips:'',
                    sendAddress:'上海',
                    masterFile:[],              //
                },
                rules:{
                    title:[
                        {required:true,message:'不能为空',tigger:['blur','change']}
                    ],
                    id:[
                        {required:true,message:'不能为空',tigger:['blur','change']},
                    ],
                    price:[
                        {validator:asd,required:true,tigger:['blur','change']},
                    ],
                    extra:[
                        {required:true,message:'不能为空',tigger:['blur','change']},
                    ],

                },
                optionCategory:[]
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(vali=>{
                    if (vali) {
                        this.requestCreateProduct({...this.form});
                    }
                })

            },
            requestCreateProduct(requestData) {
                return createProduct(requestData)
                    .then(res=>{
                        megSuc('创建成功');
                        this.$refs.form.resetFields();
                        this.$emit('onRefreshProductList')
                    })

            },
            requestCategoryList(requestData) {
                return getCategoryList(requestData)
                    .then(res=>{
                        this.optionCategory = res.data;
                    })

            }
        },
        watch:{
            visible(val) {
                if (val) {
                    this.requestCategoryList();
                }
            }
        }
    }
</script>

<style lang="scss">
    .addProductContainer{
        .el-form-item__content{
                width:200px;
        }

    }

</style>
