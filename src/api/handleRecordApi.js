import httpApi from './httpApi'
const prefix = '/workorderHandleRecord';
const _LIST = `${prefix}/listRecord.do`;//列表
const _EXPORT = `${prefix}/export.do`;//导出execl

export default {
    list(params){
        return httpApi.postForm(_LIST, params)
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
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}