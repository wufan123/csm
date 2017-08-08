<template>
    <div class="chat-window">
        <el-row class="chat-header">
            沟通记录<span>一</span>
        </el-row>
        <el-row class="chat-body">
            <div class="chat-des">来自xxxx影院组 xx影城 账号xxxx 姓名 xx</div>
            <div class="chat-rec-left">
                <div class="get-avatar"></div>
                <div class="content">
                    <span class="time">2016-10-17 10</span><br/>
                    <div class="message">这是聊天内容</div>
                </div>
            </div>
            <div class="chat-rec-right">
                <div class="get-avatar"></div>
                <div class="content">
                    <span class="time">2016-10-17 10</span><br/>
                    <div class="message">这是聊天内容</div>
                </div>
            </div>
        </el-row>
        <el-row class="chat-input-box">
            <el-input class="chat-input" type="textarea" :rows="6">

            </el-input>
            <div class="chat-button">
                <el-upload
                        class="send-img"
                        action="https://jsonplaceholder.typicode.com/posts/"
                >
                    <el-button size="small" type="info">发送图片</el-button>
                </el-upload>
                <el-button class="send-text" size="small" type="info">发送</el-button>
            </div>


        </el-row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                userDetail: this.$storage.getItem(this.$storage.KEY_USER_DETAIL)
            }
        },
        methods: {
            viewReady(){
                this.nim = new NIM({
                 appKey: this.userDetail.appKey,
                 account: this.userDetail.accid,
                 token: this.userDetail.token,
                 onconnect: this.onConnect,
                 onwillreconnect: this.onWillReconnect,
                 onerror: this.onError,
                 onmsg: this.onMsg
                 })
            },
            onConnect(){
                console.log('IM链接成功！')
            },
            onWillReconnect(){

            },
            onError(){

            },
            onMsg(){

            }
        }
    }
</script>
<style lang="less">
    @import "~style/base-variables";
    .chat-window {
        width: 330px;
        height: 620px;
        background: #fffdf1;
        z-index: 1000;
        font-size: 12px;
        border: 1px solid @color-base-bg;
        .chat-header {
            background: @color-primary;
            color: @color-sub-primary;
            padding: 13px;
            span {
                float: right;
                cursor: pointer;
            }
        }
        .chat-body {
            padding: 10px 21px;
            height: 414px;
            .chat-des {
                color: @color-base-gray;
                text-align: center;
            }
            .get-avatar {
                display: inline-block;
                height: 42px;
                width: 42px;
                border-radius:21px;
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
                    .message{
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
                .el-textarea__inner{
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
                }
            }

        }

    }
</style>