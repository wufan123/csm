import axios from 'axios'
import vueApp from '~/main'
let BASE_URL = _BASE_URL ? _BASE_URL : '';
let MOCK = _MOCK ? _MOCK : false;
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.post['accept'] = 'application/json, text/javascript, */*; q=0.01';
const preHandleError = (data) => {
    data = data ? data : {};
    if (data.message)
        vueApp.$message({
            message: data.message,
            type: 'error'
        })
};

axios.interceptors.response.use(function (response) {
    let data;
    try {
        data = JSON.parse(response.data);
    } catch (e) {
        data = response.data;
    }
    if (MOCK) {
        console.log(data) //如果是模拟数据,打印出模拟的数据
    }
    if (data.resultCode === '0') {
        return data;
    } else {
        preHandleError(data);
        return Promise.reject(data);
    }
}, function (error) {
    let data = error?error.data:'';
    preHandleError(data);
    return Promise.reject(data);
});

axios.postForm = (url, params) => {
    let form = new URLSearchParams();
    for (let i in params) {
        {
            if (params[i]||params[i]===0)
                form.append(i, params[i]);
        }
    }
    return axios.post(url, form);
};
export default axios