<template>
    <div class="chat">
        <div class="news-tip" v-show="!isWindowShow" v-on:click="showChatWindow">
            <img class="icon" :src="userDetail.headImageLink?userDetail.headImageLink:' '"/><span
                v-if="workorder.status< 5">您有<label class="unread">{{unread < 99 ? unread : '99+'}}</label>条未读信息</span>
            <span v-if="workorder.status>=5">查看沟通记录</span>
        </div>
        <div class="chat-window" v-show="isWindowShow">
            <el-row class="chat-header">
                沟通记录<span v-on:click="isWindowShow=false">一</span>
            </el-row>
            <div class="chat-des">
                来自:{{workorder.cinemaGroupName}} {{workorder.cinemaName}} 账号:{{workorder.initiatorLoginName}} 姓名:{{workorder.initiatorName}}
            </div>
            <div class="chat-body" ref="chatBody">
                <div v-for="(item,index) in chatRec" :key="index"
                     :class="item.custom.identity==1?'chat-rec-right':'chat-rec-left'">
                    <img class="get-avatar" :src="item.custom.identity==1?item.custom.headImgUrl:' '"/>
                    <div class="content">
                        <span class="time">{{formateDate(item.time)}}</span><br/>
                        <div class="message"><img :src="item.url" @click="showImg(item.url)"/>{{item.text}}</div>
                    </div>
                </div>
            </div>
            <div class="chat-input-box" v-if="workorder.status<5">
                <el-input class="chat-input" v-model="textMessage" type="textarea" :rows="6"
                          @keyup.native.shift.enter.prevent="sendtxt(textMessage,textMessage.length)"
                          placeholder="请输入回复">
                </el-input>
                <div class="chat-button">
                    <el-upload
                            class="send-img"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :beforeUpload="sendFile"
                    >
                        <i class="el-icon-picture"></i>
                    </el-upload>
                    <el-button class="send-text" size="small" type="info" v-on:click="sendtxt(textMessage)">
                        发送(shift+enter)
                    </el-button>
                </div>
            </div>
            <div class="chat-score" v-if="workorder.status>=5">
                <i class="el-icon-check"></i> 该客诉已经解决，评价为：{{workorder.scoreName}}
            </div>
        </div>
        <el-dialog v-model="dialogVisible" size="small">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import chatApi from 'api/chatApi'
    export default {
        props: {
            workorder: {
                required: true
            }
        },
        data(){
            return {
                chatRec: [],
                textMessage: '',
                isWindowShow: this.workorder.unread > 0 ? true : false,
                unread: this.workorder.unread ? this.workorder.unread : 0,
                dialogVisible: false,
                dialogImageUrl: '',
                userDetail: {
                    headImageLink: ''
                }
            }
        },
        watch: {
            isWindowShow: function (newValue) {
                this.unread = 0;
                if (newValue)
                    window._nim.resetSessionUnread(this.workorder.sessionId)
            }
        },
        methods: {
            showImg(url){
                this.dialogVisible = true
                this.dialogImageUrl = url
            },
            formateDate(time){
                let now = new Date()
                let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                let formDate = new Date(time)
                return formDate.getTime() < today.getTime() ? formDate.format("yyyy-MM-dd hh:mm:ss") : formDate.format("hh:mm:ss")
            },
            showChatWindow(){
                this.isWindowShow = true;

                this.updateMessageUI();
            },
            viewReady(){
                window._nim.onMsg = this.onMsg
                this.userDetail = this.$storage.getItem(this.$storage.KEY_USER_DETAIL);
                console.log(this.userDetail)
                if (this.isWindowShow) {
                    window._nim.resetSessionUnread(this.workorder.sessionId)
                }
            },
            onMsg(msg){
                if (this.workorder.teamId != msg.to)
                    return
                if (!this.isWindowShow) {
                    this.unread++;
                }
                if (msg.file)
                    msg.url = msg.file.url
                this.chatRec.push(msg)
                this.updateMessageUI()
            },
            updateMessageUI(){
                let vm = this
                setTimeout(function () {
                    if (vm.$refs.chatBody)
                        vm.$refs.chatBody.scrollTop = vm.$refs.chatBody.scrollHeight
                }, 300);
            },
            sendFile(file){
                let vm = this
                let reader = new FileReader()
                let dataUrl;
                reader.onerror = () => {
                    console.log("出错")
                }
                this.userDetail = this.$storage.getItem(this.$storage.KEY_USER_DETAIL);
                let custom = {
                    identity: 1,
                    headImgUrl: this.userDetail ? this.userDetail.headImageLink : ''
                }
                reader.onload = function () {
                    dataUrl = this.result;
                    this.userDetail = vm.$storage.getItem(vm.$storage.KEY_USER_DETAIL);
                    let custom = {
                        identity: 1,
                        headImgUrl: this.userDetail ? this.userDetail.headImageLink : ''
                    }
                    window._nim.sendFile({
                        scene: 'team',
                        to: vm.workorder.teamId,
                        custom: JSON.stringify(custom),
                        type: 'image',
                        dataURL: dataUrl,
                        beginupload: function (upload) {
                            // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
                            // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
                        },
                        uploadprogress: function (obj) {
                            /*console.log('文件总大小: ' + obj.total + 'bytes');
                             console.log('已经上传的大小: ' + obj.loaded + 'bytes');
                             console.log('上传进度: ' + obj.percentage);
                             console.log('上传进度文本: ' + obj.percentageText);*/
                        },
                        uploaddone: function (error, file) {
                            /*console.log(error);
                             console.log(file);
                             console.log('上传' + (!error?'成功':'失败'));*/

                        },
                        beforesend: function (msg) {
                            /*console.log('正在发送p2p image消息, id=' + msg.idClient);*/
                        },
                        done: (error, msg) => {
                            msg.url = dataUrl;
                            vm.sendMsgDone(error, msg)
                        }
                    });
                }
                reader.readAsDataURL(file);
                return false// 统一返回false,不触发element upload 的上传事件
            },
            sendtxt(textMessage){
                if(!textMessage||!textMessage.replace(/(\n*$)/g, ""))
                    return
                this.userDetail = this.$storage.getItem(this.$storage.KEY_USER_DETAIL);
                let custom = {
                    identity: 1,
                    headImgUrl: this.userDetail ? this.userDetail.headImageLink : ''
                }
                window._nim.sendText({
                    scene: 'team',
                    to: this.workorder.teamId,
                    text: textMessage,
                    done: this.sendMsgDone,
                    custom: JSON.stringify(custom)
                });
                this.textMessage = ''
            },
            sendMsgDone(error, msg){
                if (!error) {
                    console.log("发送成功", msg)
                    msg.custom = JSON.parse(msg.custom)
                    this.chatRec.push(msg)
                    this.updateMessageUI(msg)
                } else {
                    this.$message({
                        message: error.message,
                        type: 'error'
                    })
                    if (msg.type = "text") {
                        this.textMessage = msg.type

                    }
                }
            },
            fetchData(){
                chatApi.list({
                    workorderId: this.workorder.id
                }).then(res => {
                    this.chatRec = chatApi.processData(res.resultData)
                    this.updateMessageUI()
                })
            }
        },
        destroyed(){
            console.log('销毁chat')
            window._nim.onMsg = null
            if (this.isWindowShow) {
                window._nim.resetSessionUnread(this.workorder.sessionId)
            }
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";

    .chat {
        .news-tip {
            z-index: 1000;
            height: 40px;
            width: 180px;
            background: @color-primary;
            line-height: 40px;
            color: @color-white;
            font-size: @size-small;
            text-align: center;
            display: inline-block;
            z-index: 1000;
            top: 400px;
            right: 0px;
            position: fixed;
            cursor: pointer;
            .unread {
                color: @color-sub-primary;
            }
            .icon {
                height: 30px;
                width: 30px;
                background: url("~assets/image/workorder/send_avart.png") center;
                background-size: contain;
                border-radius: 15px;
                position: absolute;
                top: 5px;
                left: 5px;
            }

        }
        .chat-window {
            z-index: 1000;
            top: 100px;
            right: 20px;
            position: fixed;
            width: 330px;
            height: 620px;
            background: #fffdf1;
            font-size: 12px;
            border: 1px solid @color-base-bg;
            .chat-header {
                background: @color-primary;
                color: @color-sub-primary;
                padding: 13px;
                span {
                    float: right;
                }
            }
            .chat-des {
                color: @color-base-gray;
                text-align: center;
                margin-top: 10px;
            }
            .chat-score {
                text-align: center;
                position: absolute;
                bottom: 0;
                width: 330px;
                height: 40px;
                line-height: 40px;
                color: #3f5a04;
                background: #dfedc0;
                font-size: @size-medium;
            }
            .chat-body {
                padding: 0 21px;
                height: 414px;
                overflow-y: auto;
                .get-avatar {
                    display: inline-block;
                    height: 42px;
                    width: 42px;
                    border-radius: 21px;
                }
                .content {
                    width: 186px;
                    display: table;
                    .time {
                        color: @color-base-gray;
                    }
                    .message {
                        display: inline-block;
                        background: #fffad5;
                        border-radius: 15px;
                        padding: 10px;
                        position: relative;
                        img {
                            max-width: 186px;
                        }
                    }
                }
                .chat-rec-left {
                    margin: 20px 0px;
                    .get-avatar {
                        background: url("~assets/image/workorder/get_avart.png") center;
                        background-size: contain;
                        float: left;
                        margin-right: 10px;
                    }
                }
                .chat-rec-right {
                    margin: 20px 0px;
                    .get-avatar {
                        float: right;
                        background: url("~assets/image/workorder/send_avart.png") center;
                        margin-left: 10px;
                        background-size: contain;
                    }
                    .content {
                        float: right;
                        text-align: right;
                        .message {
                            text-align: left;
                            background: #ebf7d1;
                        }
                    }
                }
            }
            .chat-input-box {
                background: @color-white;
                height: 170px;
                width: 330px;
                border: 1px solid @color-base-bg;
                .chat-input {
                    width: 330px;
                    .el-textarea__inner {
                        border: none;
                    }
                }
                .chat-button {
                    padding: 10px;
                    .send-text {
                        float: right;
                    }
                    .send-img {
                        float: left;
                        font-size: 22px;
                        color: @color-base-gray;
                    }
                }

            }

        }
    }
</style>