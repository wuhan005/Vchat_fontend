<template>
    <div>
        <el-row type="flex" class="" justify="space-around">
            <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                <div class="grid-content bg-purple-light">
                    <el-container>
                        <el-main>

                            <el-card shadow="always">

                                <el-row>

                                    <el-col :span="5">
                                        <el-menu default-active="1">
                                            <div class="avatar-area">
                                                <img :src="userinfo.Avatar" class="avatar"/>
                                                <div class="avatar-name">{{userinfo.NickName.slice(0, 12)}}
                                                    <div class="avatar-mail">{{userinfo.Email}}</div>
                                                </div>

                                            </div>

                                            <div class="line"></div>

                                            <h4>当前在线</h4>
                                            <div></div>

                                            <el-menu-item class="list-item">
                                                <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" class="list-avatar"/>
                                                <span class="list-name">Li4n0</span>
                                            </el-menu-item>

                                            <el-menu-item class="list-item">
                                                <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" class="list-avatar"/>
                                                <span class="list-name">Li4n0</span>
                                            </el-menu-item>

                                            <el-menu-item class="list-item">
                                                <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" class="list-avatar"/>
                                                <span class="list-name">Li4n0</span>
                                            </el-menu-item>


                                        </el-menu>

                                        <div class="line"></div>
                                        <img class="logo" src="@/assets/Vchat_logo.png"/>

                                    </el-col>

                                    <el-col :span="18">
                                        <h2 class="chat-title">这里是管理员可以设置的公告</h2>
                                    </el-col>

                                </el-row>

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
    export default {
        name: "Chat",
        data(){
            return{
                'userinfo': JSON.parse(localStorage.getItem('userinfo'))
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
        width: 100px;
    }

    .copyright{
        font-size: 12px;
        text-align: center;
        padding: 10px;
        color: gray;
    }

    .avatar{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        max-width: 100%;
        height: auto;
        box-sizing: border-box;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    }

    .avatar-name{
        font-size: 18px;
        padding-left: 15px;
    }

    .avatar-mail{
        font-size: 8px;
        color: gray;
    }

    .avatar-area{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        list-style: none;
        align-items: center;
    }


    .list-item{
        margin-bottom: 10px;
    }

    .list-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        max-width: 100%;
        height: auto;
        box-sizing: border-box;
        border: darkgray solid 1px;
    }

    .list-name{
        margin-left: 10px;
        color: black;
    }

    .chat-title{
        margin-left: 25px;
    }

    .line{
        margin-top: 10px;
        margin-bottom: 10px;
        height: 3px;
        width: 95%;
        background-color: gray;
        opacity: 0.2;
    }
</style>