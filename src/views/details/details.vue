<template>
    <div class="wrap addDetails">
        <div class="detailCon">

            <div class="detail-item-one">
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
            <div class="line"></div>
            <div class="detail-item">
                <div class="banner-list">
                    <div class="img-item"  v-for="a in list">
                        <img :src="a.url" alt="">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {megSuc,megErr} from '@/utils/alert.js'
    import {VueCropper} from 'vue-cropper';
    import {dataToFile} from '@/utils/files.js'
    import {
        uploadFile,
        getImageList,
        deleteFile} from '@/api/file/file.js'
    export default {
        name: "detailPage",
        components:{
            VueCropper
        },
        data() {
            return {
                option:{
                    img:'',
                    size:.5,
                    outputType:'jpeg'
                },
                list:[],
                fileName:'',
                form:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:'sku',
                },
                createForm:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:`sku/${Date.now()}`,
                },
            };
        },
        methods:{
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
                    let file = dataToFile(data, `${_this.fileName}.jpg`);
                    uploadFile(file,_this.createForm).then(res => {
                        if (res.status == 200) {
                            this.requestImgList(this.form)
                            megSuc('上传成功')
                        }
                    });
                })
            },
            requestImgList(requestdata) {
                getImageList({...requestdata}).then(res=>{
                    if (res.status == 200) {
                        this.list = [];
                        console.log(res.data)
                        res.data.Contents.splice(0,1);
                        let list = res.data.Contents;
                        list.map(a => {
                            a.url = `https://${res.data.Name}.cos.${res.data.headers['x-cos-bucket-region']}.myqcloud.com/${a.Key}`
                        });
                        this.list = list;
                    }

                })
            },
        },
        mounted(){
            this.requestImgList(this.form)
        }
    }
</script>

<style lang="scss">

    .addDetails{
        .detailCon {
            display: flex;
            justify-content: space-between;
            height: 100%;
            .line {
                height: 100%;
                width: 10px;
                background: #0d3349;
            }
            .detail-item-one{
                flex: 1;
                padding: 10px;
            }
            .detail-item{
                padding: 10px;
                width: 460px;
                .banner-list{
                    display: flex;
                    flex-wrap: wrap;
                    border-bottom: 5px solid #0d3349;

                    .img-item {
                        width: 200px;
                        height: 200px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        border: 1px solid #ccc;
                        margin-right: 20px;
                        img {
                            width: 100%;
                        }
                    }

                }
            }
        }
    }
</style>