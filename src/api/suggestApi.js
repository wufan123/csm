import httpApi from './httpApi'
import loginApi from 'api/loginApi'
const prefix = '/suggest';
const _LIST = `${prefix}/listSuggest.do`;//列表
const _DETAIL = `${prefix}/detail.do`;//详细
const _SAVE = `${prefix}/saveEdit.do`;//保存
const _CREATE = `${prefix}/createSuggest.do`;//新建
const _DELETE = `${prefix}/del.do`;//新建
const _EXPORT = `${prefix}/export.do`;//导出execl

export default {
    URL_DETAIL:_DETAIL,
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
        loginApi.hasPermisson(_EXPORT,()=>{
            let exportUrl =httpApi.defaults.baseURL+_EXPORT+'?'
            for(let i in params)
            {
                if(params[i]){
                    if(i!='pageSize'||i!='pageNumber'){
                        exportUrl+=i+"="+params[i]+'&'
                    }
                }
            }
            window.open(exportUrl);
        })
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}