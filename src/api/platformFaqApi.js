import httpApi from './httpApi'
const prefix = '/platformFaq';
const _LIST = `${prefix}/list.do`;//列表
const _DETAIL = `${prefix}/detail.do`;//详细
const _SAVE = `${prefix}/saveEdit.do`;//保存
const _CREATE = `${prefix}/createFaq.do`;//新建
const _DELETE = `${prefix}/del.do`;//新建


export default {
    list(params){
        return httpApi.postForm(_LIST, params)
    },
    detail(params){
        return httpApi.postForm(_DETAIL, params)
    },
    save(params){
        return httpApi.postForm(_SAVE, params)
    },
    create(params){
        return httpApi.postForm(_CREATE, params)
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}