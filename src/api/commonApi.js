import httpApi from './httpApi'
import axios from 'axios'
const GET_TOKEN = '/qiniu/getToken.do'; //获取最新token
const CHANGE_HEAD = '/serviceUser/changeHeadImg.do' //更新头像信息
const CHANGE_PASSWORD = '/serviceUser/changePassword' //修改密码

export default {
    getToken() {
        return httpApi.postForm(GET_TOKEN)
    },
    updateAvatar(params) {
        return httpApi.postForm(CHANGE_HEAD, params)
    },
    updatepassword(params) {
        return httpApi.postForm(CHANGE_PASSWORD, params)
    }
}