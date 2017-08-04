import httpApi from './httpApi'
const prefix = '/workorderHandleRecord';
const _LIST = `${prefix}/listRecord.do`;//列表
const _EXPORT = `${prefix}/export.do`;//导出execl

export default {
    list(params){
        return httpApi.postForm(_LIST, params)
    },
    exportReport(params){
        return httpApi.postForm(_EXPORT, params)
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}