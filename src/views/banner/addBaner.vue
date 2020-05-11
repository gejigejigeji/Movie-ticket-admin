<template>
    <div class="addBannerContainer">
        <div class="first">
            <VueCropper
                    style=" height: 500px;"
                    ref="cropper"
                    enlarge="2"
                    centerBox
                    :info="true"
                    autoCrop
                    autoCropWidth="300"
                    autoCropHeight="300"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType">
            </VueCropper>
            <el-upload
                    :show-file-list="false"
                    :multiple="false"
                    action=""
                    :on-change="onChange"
                    :auto-upload="false"
                    ref="upload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </div>
        <div class="last">
            <el-card class="box-card" v-for="a,b in list" :key="b">
                <div slot="header" class="clearfix">
                    <span><a :href="a.url" target="_blank">{{a.url}}</a></span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="onDelete(b)">删除</el-button>
                </div>
                <div class="imgCon">
                    <img :src="a.url"/>
                </div>
            </el-card>
        </div>

        </div>
</template>

<script>
    import {megSuc,megErr} from '@/utils/alert.js'
    import {VueCropper} from 'vue-cropper';
    import {dataToFile} from '@/utils/files.js'
    import {
        getPay,
        uploadFile,
        getImageList,
        deleteFile} from '@/api/file/file.js'

    export default {
        name: "addBaner",
        components:{
            VueCropper
        },
        data() {
            return{
                option:{
                    img:'',
                    size:.5,
                    outputType:'jpeg'
                },
                fileName:'',
                form:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:'banner'
                },
                list: {},

                createForm:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:'banner'
                },
                deleteForm:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    key :''
                }
            }
        },
        mounted() {
            let form = {
                address: "11112",
                count: 1,
                cover: "wx-1253787870.cos.ap-shanghai.myqcloud.com/productList/COVER829eea01-f739-11e9-87fb-97e10c897194/cover.jpeg",
                price: "3213",
                productListId: 1,
                region: "北京市,北京市,东城区",
                size: "XL",
                styleId: 1,
                styleName: "大的",
                title: "我的滑板鞋时尚时尚最时尚的",
                userId: 3
            };
            getPay(form,form.productListId);

           this.requestImgList(this.form)
        },
        methods:{
            onDelete(e) {
                this.deleteForm.key = this.list[e].Key;
                this.requestDeleteObject(this.deleteForm,123)

            },
            requestDeleteObject(requestData,id) {
                deleteFile({...requestData},id).then(res=>{
                    if (res.status == 200) {
                        this.list = [];
                        megSuc('删除成功');
                        this.requestImgList(this.form)
                    }
                    console.log(res);
                })
            },
            requestImgList(requestdata) {
                getImageList({...requestdata}).then(res=>{
                    if (res.status == 200) {
                        this.list = [];
                        res.data.Contents.splice(0,1);
                        let list = res.data.Contents;
                        list.map(a => {
                            a.url = `https://${res.data.Name}.cos.${res.data.headers['x-cos-bucket-region']}.myqcloud.com/${a.Key}`
                        });
                        this.list = list;
                    }

                })
            },
            onChange(file) {
                let _this = this;
                this.fileName = file.name.split('.')[0];

                if(file.raw) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file.raw);
                    reader.onload = function (e) {
                        _this.option.img = this.result
                    };
                }
            },
            submitUpload() {
                const _this = this;
                this.$refs.cropper.getCropData((data) => {
                    let file = dataToFile(data, `${_this.fileName}.jpeg`);
                    uploadFile(file,_this.createForm).then(res => {
                        if (res.status == 200) {
                            this.requestImgList(this.form)
                            megSuc('上传成功')
                        }
                    });
                })
            }

        }
    }
</script>

<style lang="scss">
    .addBannerContainer {
        box-sizing: border-box;
        display: flex;
        align-items: start;

        .first{
            width: 800px;
        }
        .last {
            flex: 1;
            margin-left: 10px;
            border-left: #0d3349 15px solid;
            padding-left: 10px;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
        }
        .clearfix{
            color: #409EFF;
        }
        .box-card{
            margin-bottom: 20px;
        }
        .imgCon{
            img{
                width: 200px;
            }
        }

    }

</style>