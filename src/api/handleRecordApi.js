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
        loginApi.info().then(res=>{
            let siteInterfaces =res.resultData.siteInterfaces
            if(siteInterfaces){
                for(let i=0;i<siteInterfaces.length;i++)
                {
                    if(siteInterfaces[i].url ==_EXPORT)
                    {
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
                        return
                    }
                }
            }
            window._vue.$message({
                message: "无相关数据或操作接口权限",
                type: 'error'
            })
        })
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}