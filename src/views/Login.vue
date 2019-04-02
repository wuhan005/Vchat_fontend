<template>
    <div>
        <el-row type="flex" class="" justify="space-around">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <div class="grid-content bg-purple-light">
                    <el-container>
                        <el-main>
                            <el-card shadow="always">

                                <img class="logo" src="@/assets/Vchat_logo.png"/>
                                <h2>登录</h2>

                                <el-form ref="form" :model="loginForm" label-width="80px">
                                    <el-form-item label="E-Mail">
                                        <el-input v-model="loginForm.mail"></el-input>
                                    </el-form-item>

                                    <el-form-item label="密码">
                                        <el-input show-password v-model="loginForm.password"></el-input>
                                    </el-form-item>
                                </el-form>

                                <div class="button-right">
                                    <el-button type="primary" round @click="onLogin">登录</el-button>
                                    <el-button round @click="onReg">注册</el-button>
                                </div>
                            </el-card>
                            <div class="copyright">
                                <span>一个很小的在线聊天室 / Made with ❤️ by E99p1ant.</span>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import utils from '@/utils'
    import axios from "axios"

    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    mail: '',
                    password: ''
                }
            }
        },

        mounted() {
        },

        methods:{
            onReg: function(){
                this.$router.push({path: '/register'})
            },

            onLogin: function(){
                axios.post(
                    utils.baseURL + '/User/Login',
                    this.loginForm,
                ).then((res) => {
                    // Check the callback
                    if(res.data.code !== 200){
                        this.$message.error(res.data.msg);
                    }else{
                        localStorage.setItem('token', res.data.data.Token)
                        localStorage.setItem('userinfo', JSON.stringify(res.data.data.Userinfo))

                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                            onClose:() => {
                                this.$router.replace({path: '/chat'})
                            }
                        });

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .button-right{
        float:right;
        margin-bottom: 20px;
    }

    .logo{
        display: table-cell;
        margin: 0 auto;
        width: 200px;
    }

    .copyright{
        font-size: 12px;
        text-align: center;
        padding: 10px;
        color: gray;
    }
</style>