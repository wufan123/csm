import httpApi from './httpApi'
const prefix = '/platformWorkorder';
const _LIST = `${prefix}/listWorkorder.do`;//工单列表
const _DETAIL= `${prefix}/detailForHandle.do`;//工单详细
const _SAVE = `${prefix}/saveWorkorder.do`;//保存工单
const _CREATE = `${prefix}/createWorkOrder.do`;//新建工单
const _EXPORT = `${prefix}/export.do`;//导出execl
const _IN_HANDLE = `${prefix}/workOrderhasInHandle.do`;//是否在沟通中
const _JOIN = `${prefix}/joinTeam`;//加入工单聊天群
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
    inHandle(params){
        return httpApi.postForm(_IN_HANDLE, params)
    },
    join(params){
        return httpApi.postForm(_JOIN, params)
    }
}