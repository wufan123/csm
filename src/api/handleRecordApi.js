import httpApi from './httpApi'
import loginApi from 'api/loginApi'
const prefix = '/workorderHandleRecord';
const _LIST = `${prefix}/listRecord.do`;//列表
const _EXPORT = `${prefix}/export.do`;//导出execl

export default {
    list(params){
        return httpApi.postForm(_LIST, params)
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