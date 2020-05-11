<template>
    <el-dialog
            :visible.sync="visible"
            width="1210px">
        <div slot="title">设置封面</div>
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

           <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="visible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="onSubmit">确 定</el-button>-->
          <!--</span>-->
    </el-dialog>
</template>

<script>
    import {megSuc,megErr} from '@/utils/alert.js'
    import {VueCropper} from 'vue-cropper';
    import {dataToFile} from '@/utils/files.js'
    import {
        uploadFile,
        deleteFile} from '@/api/file/file.js'
    import {
        uploadProductCover
    } from '@/api/product/product.js'
    export default {
        name: "addCover",
        components: {
            VueCropper
        },
        props:['fatherData'],
        data() {
            return{
                visible:false,
                option:{
                    img:'',
                    size:.5,
                    outputType:'jpeg'
                },
                createForm:{
                    bucket:'wx-1253787870',
                    region:'ap-shanghai',
                    prefix:'',
                    id:''
                },
                fileName:''
            }
        },
        methods: {
            onSubmit() {

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
                    uploadProductCover(file,_this.createForm).then(res => {
                        if (res.status == 200) {
                            // this.requestImgList(this.form);
                            megSuc('上传成功')
                        }
                    });
                })
            }

        },
        watch:{
            visible(val) {
                if (val) {
                    this.createForm.prefix = `productList/${this.fatherData.coverDir}`;
                    this.createForm.id = this.fatherData.id;
                    this.option.img=''
                }

            }
        }
    }
</script>

<style scoped>

</style>
