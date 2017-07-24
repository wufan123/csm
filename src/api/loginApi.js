import httpApi from './httpApi'

const prefix = '/serviceUser';

const LOGIN= `${prefix}/serviceLogin.do`;
const LOGOUt= `${prefix}/serviceLoginout.do`;

export default {
    login (params) {
        // return httpApi.get(LOGIN,{params:params})
        return httpApi.postForm(LOGIN,params)
    },
    logout(params){
        return httpApi.postForm(LOGOUt,params)
    }
}
