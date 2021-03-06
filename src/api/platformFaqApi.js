import httpApi from './httpApi'
const prefix = '/platformFaq';
const _LIST = `${prefix}/list.do`;//列表
const _DETAIL = `${prefix}/detail.do`;//详细
const _SAVE = `${prefix}/saveEdit.do`;//保存
const _CREATE = `${prefix}/createFaq.do`;//新建
const _DELETE = `${prefix}/del.do`;//新建
const _EXPORT = `${prefix}/export.do`;//导出execl
const _CHECK = `${prefix}/checkCinemaGrouphasFAQ.do`;//导出execl


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
    },
    check(params){
        return httpApi.postForm(_CHECK, params)
    },
    exportReport(params){
        let exportUrl =httpApi.defaults.baseURL+_EXPORT+'?'
        for(let i in params)
        {
            if(params[i]){
                if(i!='pageSize'||i!='pageNumber'){
                    exportUrl+=i+"="+params[i]+'&'
                }
            }
        }
        window.location.href =exportUrl;
    }
}