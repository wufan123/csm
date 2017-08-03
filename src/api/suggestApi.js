import httpApi from './httpApi'
const prefix = '/suggest';
const _LIST = `${prefix}/listSuggest.do`;//列表
const _DETAIL = `${prefix}/detail.do`;//详细
const _SAVE = `${prefix}/saveEdit.do`;//保存工单
const _CREATE = `${prefix}/createSuggest.do`;//新建工单
const _DELETE = `${prefix}/del.do`;//新建工单
const _EXPORT = `${prefix}/export.do`;//导出execl

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
    exportReport(params){
        return httpApi.postForm(_EXPORT, params)
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}