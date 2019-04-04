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

                                                    <el-tag type="success" v-if="status === 'online'">在线</el-tag>
                                                    <el-tag type="warning" v-if="status === 'wait'">
                                                        <i class="el-icon-loading"></i>
                                                        连接中...
                                                    </el-tag>
                                                    <el-tag type="info" v-if="status === 'outline'">离线</el-tag>

                                                </div>
                                            </div>

                                            <div class="line"></div>

                                            <h4 class="online-num">当前在线：{{userlist.length}}人</h4>

                                            <!-- 在线列表 -->
                                            <el-main class="online-list" v-if="userlist.length > 0">
                                                <el-menu-item class="list-item"  v-for="user in userlist">
                                                    <img :src="user.Avatar" class="list-avatar"/>
                                                    <span class="list-name">{{user.NickName}}</span>
                                                </el-menu-item>

                                            </el-main>

                                        </el-menu>

                                        <div class="line"></div>
                                        <img class="logo" src="@/assets/Vchat_logo.png"/>

                                    </el-col>

                                    <el-col  :xs="16" :sm="16" :md="17" :lg="18" :xl="18">
                                        <h2 class="chat-title">{{headerinfo}}</h2>

                                        <!-- 消息展示区 -->
                                        <el-main class="chat-content-area">

                                            <!-- 单条消息 -->
                                            <div v-for="msg in msgList">
                                                <div class="leftd" v-if="msg.sender.ID !== userinfo.ID">
                                                    <span class="leftd_h">
                                                        <img :src="msg.sender.Avatar" />
                                                    </span>


                                                    <div class="speech left">
                                                        <div class="chat-name">{{msg.sender.NickName}}</div>
                                                        <div v-html="msgFilter(msg.msg)">

                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="rightd" v-if="msg.sender.ID === userinfo.ID">
                                                        <span class="rightd_h">
                                                            <img :src="msg.sender.Avatar"/>
                                                        </span>
                                                    <div class="speech right" v-html="msgFilter(msg.msg)">
                                                    </div>
                                                </div>
                                            </div>

                                        </el-main>

                                        <div>
                                            <el-input class="inputText" v-model="inputMsg" placeholder="说点什么吧~" @keyup.enter.native="onSendMsg"></el-input>
                                            <el-button type="primary" class="submit" @click="onSendMsg" >发送</el-button>
                                        </div>
                                        <span class="footer">
                                            <b>支持 ubb 代码</b>
                                        </span>
                                        <br>
                                        <span class="footer">
                                            请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。
                                        </span>

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
                userinfo: JSON.parse(localStorage.getItem('userinfo')),
                userlist: [],
                status: 'wait',
                headerinfo: '',

                inputMsg: '',

                msgList: [],

                timer: null
            }
        },

        created(){
            this.initWebSocket()
            this.getInfoHeader()
        },

        mounted(){
            this.timer = setInterval( () => {
                this.onSend('heartbeat')
            }, 2000)
        },

        beforeDestroy() {
            clearInterval(this.timer);
        },

        methods:{
            // ubb2html
            ubb2html: function(argString){
                var tString = argString;
                if (this.isString(tString) && tString != '') {
                    tString = tString.replace(/&/g, '$amp;');
                    tString = tString.replace(/>/g, '&gt;');
                    tString = tString.replace(/</g, '&lt;');
                    tString = tString.replace(/\"/g, '&quot;');
                    tString = tString.replace(/&amp;#91;/g, '$#91;');
                    tString = tString.replace(/$amp;#93;/g, '$#93;');
                    tString = tString.replace(/\[br\]/g, '<br />');

                    tString = tString.replace(/\[1\](.*?)\[\/1\]/g, '<h1>$1</h1>');
                    tString = tString.replace(/\[2\](.*?)\[\/2\]/g, '<h2>$1</h2>');
                    tString = tString.replace(/\[3\](.*?)\[\/3\]/g, '<h3>$1</h3>');
                    tString = tString.replace(/\[4\](.*?)\[\/4\]/g, '<h4>$1</h4>');
                    tString = tString.replace(/\[5\](.*?)\[\/5\]/g, '<h5>$1</h5>');
                    tString = tString.replace(/\[6\](.*?)\[\/6\]/g, '<h6>$1</h6>');

                    tString = tString.replace(/\[p\](.*?)\[\/p\]/g, '<p>$1</p>');
                    tString = tString.replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>');
                    tString = tString.replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>');
                    tString = tString.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');
                    tString = tString.replace(/\[ol\](.*?)\[\/ol\]/g, '<ol>&1</ol>');
                    tString = tString.replace(/\[ul\](.*?)\[\/ul\]/g, '<ul>$1</ul>');
                    tString = tString.replace(/\[li\](.*?)\[\/li\]/g, '<li>$1</li>');
                    tString = tString.replace(/\[code\](.*?)\[\/code\]/g, '<div class="ubb_code">$1</div>');
                    tString = tString.replace(/\[quote\](.*?)\[\/quote\]/g, '<div class="ubb_quote">$1</div>');
                    tString = tString.replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<font style="color: $1">$2</font>');
                    tString = tString.replace(/\[hilitecolor=(.*)\](.*?)\[\/hilitecolor\]/g, '<font style="background-color: $1">$2</font>');
                    tString = tString.replace(/\[align=(.*)\](.*?)\[\/align\]/g, '<div style="text-align: $1">$2</div>');
                    tString = tString.replace(/\[url=(.*)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');
                    tString = tString.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" style="width:200px;"/>');
                }
                return tString;
            },

            isString: function (obj){
                return toString.call(obj) == '[object String]';
            },

            // Websocket
            initWebSocket(){
                // 尝试连接上 WS 服务器
                const wsURL = utils.wsURL

                this.websock = new WebSocket(wsURL + '?token=' + localStorage.getItem('token'))
                this.websock.onopen = this.onConnect
                this.websock.onerror = this.onError
                this.websock.onmessage = this.onMessage
                this.websock.onclose = this.onClose
            },

            onConnect(){
                this.status = 'online'
                this.$message({
                    message: '成功连接服务器！',
                    type: 'success'
                });
            },

            onError(){
                this.status = 'outline'
                this.$message.error('连接服务器失败！');
            },

            onMessage(e){ //数据接收
                const reciveData = JSON.parse(e.data);

                if(reciveData.code === 200){
                    if(reciveData.data.type === 'user_list'){
                        // 更新用户列表
                        this.userlist = reciveData.data.list
                    }else if(reciveData.data.type === 'disconnect'){
                        // 更新用户列表
                        this.userlist = reciveData.data.list
                    }else if(reciveData.data.type === 'message'){
                        // 收到新的信息
                        this.msgList.push({
                            msg: reciveData.data.msg,
                            sender: reciveData.data.from
                        })
                        this.scrollToBottom()
                    }
                }
            },

            onSend(type, data = null){//数据发送

                if(type === 'disconnect'){
                    const sendData = {
                        type: 'disconnect',
                        data: this.userinfo.ID
                    }

                    this.websock.send(JSON.stringify(sendData));

                    try{
                        this.websock.onclose()
                    }catch (e) {
                        console.log('close already')
                    }

                }else if(type === 'message'){
                    const sendData = {
                        type: 'message',
                        data: {
                            msg: data,
                            token: localStorage.getItem('token')
                        }
                    }

                    this.websock.send(JSON.stringify(sendData));
                }else if(type === 'heartbeat'){
                    const sendData = {
                        type: 'heartbeat',
                        data: {
                            msg: 'I am alive',
                            token: localStorage.getItem('token')
                        }
                    }

                    this.websock.send(JSON.stringify(sendData));
                }

            },

            onClose(e){  //关闭
                //console.log("connection closed (" + e.code + ")");
            },

            onSendMsg: function(){
                try{
                    if(this.inputMsg !== ''){
                        this.onSend('message', this.inputMsg)
                        this.inputMsg = ''
                    }
                }catch (e) {
                    console.log(e)
                }

            },

            scrollToBottom: function(){
                this.$nextTick(() => {
                    const container = this.$el.querySelector(".chat-content-area");
                    container.scrollTop = container.scrollHeight;
                })
            },

            getInfoHeader: function(){
                axios.get(utils.baseURL + '/Main/HeaderInfo')
                    .then((res) => {
                        if(res.data.code === 200){
                            this.headerinfo = res.data.data
                        }
                    })
            },

            msgFilter: function(msg){
                return this.ubb2html(msg)
            },

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
                            this.onSend('disconnect')

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

    .footer{
        font-size: 12px;
        text-align: center;
        padding: 10px;
        color: gray;
        margin-left: 15px;
    }

    .chat-content-area{
        height: 470px;
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

    .sendImage{
        width: 300px;
    }

    .chat-name{
        width: 100px;
    }


</style>