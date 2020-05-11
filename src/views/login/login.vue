<template>
    <div class="wrap login-view">
        <div class="login">
            <el-row>
                <el-col>
                    <el-form :model="form" :rules="form.rules" ref="form" label-width="100px" class="form">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="30天免登录">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="form.keepLogin"></el-switch>
                        </el-form-item>
                        <el-form-item label-width="200px">
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import {megSuc,megErr} from '@/utils/alert.js'
    import {getUserInfo} from '@/api/user/user.js'
    export default {
        name: "login",
        data() {
            return{
                form:{
                    username:'',
                    password:'',
                    keepLogin:1,

                    rules: {
                        username:[
                            { required: true, message: '账号不能为空', trigger: ['blur' ,'change']},
                            { min: 3, max:20, message: '长度在 5 到 20 个字符', trigger: ['blur' ,'change'] }
                        ],
                        password:[
                            { required: true, message: '密码不能为空', trigger: ['blur' ,'change']},
                            { min: 5, max:20, message: '长度在 5 到 20 个字符', trigger: ['blur' ,'change'] }
                        ],
                    }
                }
            }
        },
        methods: {
            onSubmit() {

                this.$refs.form.validate(vali=>{
                    if (vali) {
                        let requestData = {...this.form};
                        delete requestData.rules
                        getUserInfo({...requestData}).then(res => {
                            if (res.data.token==null) {
                                this.$store.dispatch('setToken', null);
                                megErr('账号或密码错误')
                            }else{
                                this.$store.dispatch('setToken', res.data.token);
                                megSuc('登录成功');
                                this.$router.push({
                                    path:'/admin'
                                });
                            }
                        });
                    }
                })

            }
        },

    }
</script>

<style lang="scss">
.login-view{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .login {
        flex:1;
        .form {
            width: 400px;
            margin: 0 auto;
            padding: 50px 60px 10px 20px;
            border: 1px solid #E4E7ED;
            border-radius: 10px;
            background: #fefefe;

            .el-form-item {

                .el-form-item__content{
                }
            }
        }
    }

}
</style>