import httpApi from './httpApi'
const prefix = '/platformWorkorder';
const _LIST = `${prefix}/listWorkorder.do`;//工单列表
const _DETAIL = `${prefix}/detailForHandle.do`;//工单详细
const _SAVE = `${prefix}/saveWorkorder.do`;//保存工单
const _CREATE = `${prefix}/createWorkOrder.do`;//新建工单
const _EXPORT = `${prefix}/export.do`;//导出execl
const _IN_HANDLE = `${prefix}/workOrderhasInHandle.do`;//是否在沟通中
const _JOIN = `${prefix}/joinTeam`;//加入工单聊天群
const _CHAT_LIST = `${prefix}/communicateRecord/listCommunicateRecord.do`;//加入工单聊天群
const _COMMUNICATE = `/communicateWebsocket.ws`;//加入工单聊天群

export default {
    //工单常量
    STATUS_WAITING: 1,  //等待处理
    STATUS_HANDLEING: 2,//处理中
    STATUS_HANDLEING_TO_TECH: 3,//处理中转技术
    STATUS_NO_COMPLETE: 4,      //未解决
    STATUS_COMPLETE: 5,         //已解决
    STATUS_SCORE_COMPLETE: 6,    //评价完毕
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
    inHandle(params){
        return httpApi.postForm(_IN_HANDLE, params)
    },
    join(params){
        return httpApi.postForm(_JOIN, params)
    },
    chatList(params){
        return httpApi.postForm(_CHAT_LIST, params)
    },
    lock(id){
       return new WebSocket("ws://192.168.10.26:8080/"+_COMMUNICATE+'?workorderId='+id);
    }
}