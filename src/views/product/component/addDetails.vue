<template>
    <el-dialog
            :visible.sync="visible"
            width="1400px">
        <div slot="title">新增详情</div>
        <el-form :inline="true" :model="pdf" :rules="rules" ref="form" label-position="right" label-width="100px" class="form">

<!--        <div class="productExplain">-->
<!--                <el-form-item label="产品名称：" prop="title">-->
<!--                    <el-input v-model="pdf.title" clearable placeholder="产品名称"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="所属分类：" prop="id">-->
<!--                    <el-select v-model="pdf.id"  clearable placeholder="所属分类">-->
<!--                        <el-option-->
<!--                                v-for=" a in optionCategory"-->
<!--                                :label="a.title"-->
<!--                                :value="(a.id).toString()"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="价格：" prop="price">-->
<!--                    <el-input v-model.number="pdf.price" type="number" clearable placeholder="产品名称"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="简要说明：">-->
<!--                    <el-input v-model="pdf.extra" clearable placeholder="产品名称"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="关键提示词：">-->
<!--                    <el-input v-model="pdf.tips" clearable placeholder="逗号分隔"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="发货地点：">-->
<!--                    <el-input v-model="pdf.sendAddress" clearable></el-input>-->
<!--                </el-form-item>-->

<!--        </div>-->

        <div class="addProductDetails">
            <div class="uploadDetailsWrapper">
                <div class="upload-main-image">
                    <h3>上传主图</h3>
                    <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :on-change="onMasterFile"
                            :on-remove="onMasterRemoveFile"
                            :auto-upload="false"
                            :file-list="masterFile"
                            list-type="picture">
                        <el-button  size="small" type="primary">选取文件</el-button>
                        <el-button slot="tip" style="margin-left: 10px;" size="small" type="success" @click="onSubmitMaster('master')">上传到服务器</el-button>
                    </el-upload>
                    <div class="prevideImgList">
                        <h5>点击图片复制链接到粘贴板</h5>
                        <div class="imgConItems" v-for="a in masterList" >
                            <img :src="a.url" v-clipboard:copy="a.url" v-clipboard:success="copyOver">
                            <i class="el-icon-delete deleteIcon" @click="deleteImg(a.key)"></i>
                        </div>
                    </div>
                </div>
                <div class="upload-main-image">
                    <h3>上传款式图</h3>
                    <el-upload
                            class="upload-demo"
                            action=""
                            multiple
                            :on-change="onStyleFile"
                            :on-remove="onStyleRemoveFile"
                            :auto-upload="false"
                            :file-list="styleFile"
                            list-type="picture">
                        <el-button  size="small" type="primary">选取文件</el-button>
                        <el-button slot="tip" style="margin-left: 10px;" size="small" type="success" @click="onSubmitMaster('style')">上传到服务器</el-button>
                    </el-upload>
                    <div class="prevideImgList">
                        <h5>点击图片复制链接到粘贴板</h5>
                        <div class="imgConItems" v-for="a in styleList">
                            <img :src="a.url"  v-clipboard:copy="a.url" v-clipboard:success="copyOver">
                            <i class="el-icon-delete deleteIcon" @click="deleteImg(a.key)"></i>
                        </div>
                    </div>
                </div>
                <div class="upload-main-image">
                    <h3>上传详情图</h3>
                    <el-upload
                            class="up,load-demo"
                            action=""
                            multiple
                            :on-change="onDetailsFile"
                            :on-remove="onDetailsRemoveFile"
                            :auto-upload="false"
                            list-type="picture"
                            :file-list="detailsFile">
                        <el-button size="small" type="primary">选取文件</el-button>
                        <el-button  slot="tip" style="margin-left: 10px;" size="small" type="success" @click="onSubmitMaster('details')">上传到服务器</el-button>
                    </el-upload>
                    <div class="prevideImgList">
                        <h5>点击图片复制链接到粘贴板</h5>
                        <div class="imgConItems" v-for="a in detailsList">
                            <img :src="a.url" v-clipboard:copy="a.url" v-clipboard:success="copyOver">
                            <i class="el-icon-delete deleteIcon" @click="deleteImg(a.key)"></i>
                        </div>
                    </div>
                </div>
            </div>



        </div>

            <div class="productStyle">
                <h4>添加款式</h4>
                <el-table
                        border
                        :data="pdf.style"
                        style="width: 100%">
                    <el-table-column
                            prop="url"
                            label="图片"
                            width="180">
                        <template slot-scope="scope">
                            <span>
                                <el-input v-model="scope.row.url" clearable placeholder="逗号分隔"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="200px"
                            label="名称/颜色">
                        <template slot-scope="scope">
                            <span>
                                <el-input v-model="scope.row.name" clearable placeholder="42皮鞋/XL上衣"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="200px"
                            label="价格">
                        <template slot-scope="scope">
                            <span>
                                <el-input v-model="scope.row.price" clearable placeholder="42皮鞋/XL上衣"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="尺寸">
                        <template slot-scope="scope">
                            <span>
                                <el-checkbox-group v-model="scope.row.size">
                                    <el-checkbox label="XXL"></el-checkbox>
                                    <el-checkbox label="XL"></el-checkbox>
                                    <el-checkbox label="L"></el-checkbox>
                                    <el-checkbox label="M"></el-checkbox>
                                    <el-checkbox label="S"></el-checkbox>
                                </el-checkbox-group>
                                <el-input v-model="scope.row.custom[b]" v-for="i,b in 5" clearable placeholder="自定义"></el-input>
                                {{scope.row.custom}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="100px"
                            label="操作">
                        <template slot-scope="scope">
                            <span>
                                <span class="blue" @click="deleteRow(scope.$index)">删除</span>
                            </span>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="addRow" @click="addRow">
                    <i class="el-icon-circle-plus"></i>
                </div>
                <quill-editor
                        id="toolbar"
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChange($event)">
                </quill-editor>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    import {
        getDetails,
        createDetails,
        getCategoryList,
        uploadProductDetails
    } from '@/api/product/product.js'

    import {
        getImageList,
        deleteFile} from '@/api/file/file.js'

    import {megSuc,megErr} from '@/utils/alert.js'
    import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
    import 'quill/dist/quill.snow.css'


    export default {
        name: "addDetails",
        props:['fatherData'],
        components: {
            quillEditor
        },
        data() {
            const asd = (rules, value, callback) => {
                if (value == '' ||value==null) {
                    callback('不能为空')
                }else{
                    callback();
                }
            };
            return{
                content:null,
                editorOption: {
                    placeholder: 'Compose an epic...',
                    readOnly: true,
                    theme: 'snow'
                },
                visible:false,
                masterFile: [],
                detailsFile: [],
                styleFile: [],
                form:{},
                imgList:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:''
                },
                masterList:[],
                detailsList:[],
                styleList:[],
                deleteForm:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    key :''
                },
                pdf:{
                    // title:'',
                    // price:null,
                    // extra:'',
                    // tips:'',
                    // sendAddress:'上海',
                    id:'',
                    productDetailsId:null,
                    master:[],
                    style:[
                        {
                            url:'http://baidu.com',
                            size:[],
                            custom:[],
                            name:'',
                            price:''

                        }
                    ],
                    details:null
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
        methods:{
            onSubmit() {
                let requestData = JSON.parse(JSON.stringify(this.pdf));


                requestData.style.map(a => {
                    a.productListId = requestData.id;
                    a.productDetailId = requestData.productDetailsId;
                    a.custom=a.custom.filter(b => {
                        return b && b.trim();
                    });
                    a.size=a.size.filter(b => {
                        return b && b.trim();
                    });
                });
                //
                requestData.style.map(a =>{
                    a.custom = a.custom.join(',');
                    a.size = a.size.join(',');
                });
                this.requestCreateDetails(requestData);
                // this.$refs.form.validate(vali=>{
                //     if (vali) {
                //
                //     }
                // })
            },
            onEditorChange(val) {
                this.pdf.details = val.html;
            },
            deleteRow(index) {
                this.pdf.style.splice(index,1)
            },
            addRow() {
                this.pdf.style.push({
                    url:'http://baidu.com',
                    size:[],
                    custom:[],
                    name:'',
                    price:''

                })
            },
            onStyleFile(file,fileList) {
                this.styleFile = fileList;
            },
            onStyleRemoveFile(file,fileList) {
                this.styleFile = fileList;
            },
            onMasterFile(file,fileList) {
                this.masterFile = fileList;
            },
            onMasterRemoveFile(file,fileList) {
                this.masterFile = fileList;
            },
            onDetailsFile(file,fileList) {
                this.detailsFile = fileList;
            },
            onDetailsRemoveFile(file,fileList) {
                this.detailsFile = fileList;
            },
            deleteImg(key) {
                this.deleteForm.key = key;
                this.requestDeleteObject(this.deleteForm,123)
            },
            copyOver() {
                megSuc('复制成功')
            },
            onSubmitMaster(val) {
                let resData = {...this.form};
                let files = [];
                resData.prefix = val;
                resData.position = val;
                if(!resData.imgDir) return;
                if(!resData.id) return;
                if (val == 'master') {
                    files=this.masterFile
                }else if(val =='details'){
                    files=this.detailsFile
                }else if (val == 'style') {
                    files=this.styleFile
                }
                this.requestUploadDetails(files,resData);
            },
            requestCreateDetails(requestData) {
               return createDetails(requestData)
                    .then(res=>{
                        megSuc('保存成功');
                    })
            },
            requestgetDetails(id) {
                return getDetails(id)
                    .then(res=>{
                        this.pdf.productDetailsId = res.data.id;
                        res.data.productStyle.map(a => {
                            a.custom = a.custom.split(',');
                            a.size = a.size.split(',')
                        });
                        this.pdf.style = res.data.productStyle;
                        this.content = res.data.details;

                    })
            },
            requestUploadDetails(files,data) {
                uploadProductDetails(files,data)
                    .then(res=>{
                        this.masterList = [];
                        this.styleList = [];
                        this.detailsList = [];
                        megSuc('上传成功');
                        this.requestImgList(this.imgList)
                    })
            },
            requestDeleteObject(requestData,id) {
                deleteFile({...requestData},id).then(res=>{
                    if (res.status == 200) {
                        this.masterList = [];
                        this.styleList = [];
                        this.detailsList = [];
                        megSuc('删除成功');
                        this.requestImgList(this.imgList)
                    }
                })
            },
            requestImgList(resData) {
                getImageList(resData)
                    .then(res=>{
                        let masterList = [],detailsList=[],styleList=[],master=[];
                        res.data.Contents.map(a => {

                            if (a.Key.indexOf('/master/') > 0) {
                                let name = a.Key.match(/(\w+\.(?:png|jpg|gif|bmp))$/)[0];
                                master.push(`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`);
                                masterList.push({
                                    name,
                                    url:`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                                    key:a.Key
                                })
                            }else if(a.Key.indexOf('/details/') > 0){
                                let name = a.Key.match(/(\w+\.(?:png|jpg|gif|bmp))$/);
                                detailsList.push({
                                    name,
                                    url:`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                                    key:a.Key
                                })
                            }else if(a.Key.indexOf('/style/') > 0){
                                styleList.push({
                                    name,
                                    url:`https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                                    key:a.Key
                                })
                            }
                        });
                        this.pdf.master = master.join(',');

                        this.masterList= masterList;
                        this.detailsList = detailsList;
                        this.styleList = styleList;
                        console.log(masterList,detailsList,styleList)
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
                    this.masterFile = [];
                    this.detailsFile = [];
                    this.styleFile = [];
                    this.content = this.fatherData.details;
                    this.form.id = this.fatherData.id;
                    this.pdf.id = this.fatherData.id;
                    this.form.imgDir = this.fatherData.imgDir;
                    this.imgList.prefix = `sku/${this.fatherData.imgDir}/`;
                    this.requestImgList({...this.imgList});
                    this.requestCategoryList();
                    this.requestgetDetails(this.fatherData.id)
                }
            }
        }
    }
</script>

<style lang="scss">
    .el-dialog__body {
        padding: 10px 0 80px 0;
        height: 900px;
        overflow-y: auto;
        background: #fff;
    }
    .form{
        padding: 10px;
    }
    .productExplain{
        .el-form-item{
            margin-right: 100px;
            margin-left: 40px;
        }
    }
    .addProductDetails {
        .uploadDetailsWrapper{
            display: block;
        }
        .upload-main-image {
            padding: 15px;
            background: #fff;
            border: 1px solid #F2F6FC;
            display: inline-block;
            width: 400px;
            margin-left: 30px;
            vertical-align: top;
            box-shadow: 0 0 10px rgba(0,0,0,.3);
        }
        .prevideImgList {
            margin: 30px 0 0 0;
            border-top: 5px solid #606266;
            .imgConItems{
                width: 81px;
                cursor: pointer;
                margin-right: 10px;
                position: relative;
                display: inline-block;
                img {
                    height: 100%;
                    width: 100%;
                }
                .deleteIcon {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    font-size: 15px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, .6);
                    color: #fff;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                }
            }

        }
        .el-upload-list{
            display: flex;
            flex-wrap: wrap;
        }
        .el-upload-list__item{
            width: 300px !important;
            display: inline-block;
        }

    }

    .productStyle{

        margin-top: 30px;
        .el-checkbox{
            width: 50px;
        }
        .el-input {
            height: 30px;
            width: 100px;
            vertical-align: middle;
            margin-right: 10px;
            input {
                height: 100%;
                width: 100%;
                padding-left: 5px;
                padding-right: 20px;
            }
            .el-input__suffix{

                vertical-align: middle;
                .el-input__icon{
                    line-height: 30px !important;
                    height: 30px;
                }
            }
        }

        .addRow {
            border: 1px dashed #ccc;
            padding: 5px 10px;
            font-size: 30px;
            border-radius: 5px;
            text-align: center;
            margin-top: 5px;
            cursor: pointer;
        }
        #toolbar{
            height: 400px;
            margin-top: 100px;
        }
    }

</style>
