<template>
    <div>
        <el-row type="flex" class="" justify="space-around">
            <el-col :xs="24" :sm="23" :md="21" :lg="22" :xl="20">
                <div class="grid-content bg-purple-light">
                    <el-container>
                        <el-main>

                            <el-card shadow="always">

                                <el-row>

                                    <el-col :xs="8" :sm="8" :md="7" :lg="5" :xl="5">
                                        <el-menu default-active="1">
                                            <div class="avatar-area" @click="onLogout">
                                                <img :src="userinfo.Avatar" class="avatar"/>
                                                <div class="avatar-name">{{userinfo.NickName.slice(0, 12)}}
                                                    <div class="avatar-mail">{{userinfo.Email}}</div>
                                                </div>
                                            </div>

                                            <div class="line"></div>

                                            <h4 class="online-num">当前在线</h4>

                                            <!-- 在线列表 -->
                                            <el-main class="online-list">
                                                <el-menu-item class="list-item">
                                                    <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" class="list-avatar"/>
                                                    <span class="list-name">Li4n0</span>
                                                </el-menu-item>

                                            </el-main>

                                        </el-menu>

                                        <div class="line"></div>
                                        <img class="logo" src="@/assets/Vchat_logo.png"/>

                                    </el-col>

                                    <el-col  :xs="16" :sm="16" :md="17" :lg="18" :xl="18">
                                        <h2 class="chat-title">这里是管理员可以设置的公告</h2>

                                        <!-- 消息展示区 -->
                                        <el-main class="chat-content-area">

                                            <div class="leftd">
                                                <span class="leftd_h">
                                                    <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" />
                                                </span>

                                                <div class="speech left" ng-class="speech left">
                                                    <div class="chat-name">Li4n0</div>
                                                    这个聊天室真牛逼，我来日一下。
                                                </div>
                                            </div>


                                            <div class="rightd">
                                                    <span class="rightd_h">
                                                        <img :src="userinfo.Avatar"/>
                                                    </span>
                                                <div class="speech right" ng-class="speech left">
                                                    放心，你日不动的
                                                </div>
                                            </div>

                                            <div class="leftd">
                                                <span class="leftd_h">
                                                    <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" />
                                                </span>

                                                <div class="speech left" ng-class="speech left">
                                                    <div class="chat-name">Li4n0</div>
                                                    。。。。你等着
                                                </div>
                                            </div>

                                            <div class="leftd">
                                                <span class="leftd_h">
                                                    <img src="https://cdn.github.red/wp-content/uploads/2019/01/Li4n0.jpg" />
                                                </span>

                                                <div class="speech left" ng-class="speech left">
                                                    <div class="chat-name">Li4n0</div>
                                                    OK，getshell
                                                </div>
                                            </div>

                                            <div class="rightd">
                                                    <span class="rightd_h">
                                                        <img :src="userinfo.Avatar"/>
                                                    </span>
                                                <div class="speech right" ng-class="speech left">
                                                    卧槽？！
                                                </div>
                                            </div>
                                            <div class="rightd">
                                                    <span class="rightd_h">
                                                        <img :src="userinfo.Avatar"/>
                                                    </span>
                                                <div class="speech right" ng-class="speech left">
                                                    Li4n0 牛逼！
                                                </div>
                                            </div>


                                        </el-main>

                                        <div>
                                            <el-input class="inputText" v-model="input" placeholder="说点什么吧~"></el-input>
                                            <el-button type="primary" class="submit">发送</el-button>
                                        </div>

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
    import '@/assets/chatbox.css'
    import utils from '@/utils'
    import axios from "axios"

    export default {
        name: "Chat",
        data(){
            return{
                'userinfo': JSON.parse(localStorage.getItem('userinfo'))
            }
        },

        methods:{
            onLogout: function(){
                this.$confirm('你确定要登出吗？')
                    .then(_ => {
                        axios.get(
                            utils.baseURL + '/User/Logout',
                            {
                                headers:{
                                    'Authorization': localStorage.getItem('token')
                                }
                            }
                        ).then((res) => {
                            localStorage.removeItem('userinfo')
                            localStorage.removeItem('token')

                            this.$router.replace({
                                path: '/login',
                            })
                        })
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>

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

    .chat-content-area{
        height: 550px;
    }

    .online-list{
        height: 420px;
    }

    .online-num{
        margin-bottom: 10px;
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

    .inputText{
        margin-left: 25px;
        width: 80%;
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