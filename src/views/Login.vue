<template>
    <div>
        <el-row type="flex" class="" justify="space-around">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="8">
                <div class="grid-content bg-purple-light">
                    <el-container>
                        <el-main>
                            <el-card shadow="always">

                                <img class="logo" src="@/assets/Vchat_logo.png"/>
                                <h2>登录</h2>

                                <el-form ref="form" label-width="80px">
                                    <el-form-item label="E-Mail">
                                        <el-input></el-input>
                                    </el-form-item>

                                    <el-form-item label="密码">
                                        <el-input></el-input>
                                    </el-form-item>
                                </el-form>

                                <div class="button-right">
                                    <el-button type="primary" round>登录</el-button>
                                    <el-button round>注册</el-button>
                                </div>
                            </el-card>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        mounted() {
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
</style>