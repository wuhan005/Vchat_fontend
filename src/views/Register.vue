<template>
    <div>
        <el-row type="flex" class="" justify="space-around">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <div class="grid-content bg-purple-light">
                    <el-container>
                        <el-main>
                            <el-card shadow="always">

                                <img class="logo" src="@/assets/Vchat_logo.png"/>
                                <h2>新用户注册</h2>

                                <el-form ref="form" :model="regForm" label-width="80px">
                                    <el-form-item label="E-Mail">
                                        <el-input v-model="regForm.mail"></el-input>
                                    </el-form-item>

                                    <el-form-item label="昵称">
                                        <el-input v-model="regForm.nickname"></el-input>
                                    </el-form-item>

                                    <el-form-item label="密码">
                                        <el-input show-password v-model="regForm.password" ></el-input>
                                    </el-form-item>

                                    <el-form-item label="邀请码">
                                        <el-input v-model="regForm.inviteCode"></el-input>
                                    </el-form-item>


                                    <div class="button-right">
                                        <el-button type="primary" round @click="onReg">注册新账号</el-button>
                                        <el-button round @click="onBack">返回登录</el-button>
                                    </div>
                                </el-form>
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
        name: "Register",
        data(){
            return {
                regForm: {
                    mail: '',
                    nickname: '',
                    password: '',
                    inviteCode: ''
                }
            }
        },
        methods: {
            onBack: function(){
                this.$router.replace({path: '/login'})
            },

            onReg: function(){
                axios.post(
                    utils.baseURL + '/User/Register',
                    this.regForm,
                ).then((res) => {
                    // Check the callback
                    if(res.data.code !== 200){
                        this.$message.error(res.data.msg);
                    }else{
                        this.$message({
                            message: res.data.data,
                            type: 'success',
                            onClose:() => {
                                this.$router.replace({path: '/login'})
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