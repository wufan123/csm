import httpApi from './httpApi'
const prefix = '/platformIndex';
const _WORK_ORDER = `${prefix}/workorderCountForm.do`;//客诉数量趋势数据
const _RESPOND = `${prefix}/averageRespondTime.do`;//平均响应时间趋势
const _COMPLETE = `${prefix}/averageCompleteTime.do`;//平均解决时间
const _COUNT = `${prefix}/workorderCount.do`;//存在客诉量， 待处理客诉量
const _STAR = `${prefix}/operationStar.do`;//运维之星数据
export default {
    workorderCountForm(params){
        return httpApi.postForm(_WORK_ORDER, params)
    },
    averageRespondTime(params){
        return httpApi.postForm(_RESPOND, params)
    },
    averageCompleteTime(params){
        return httpApi.postForm(_COMPLETE, params)
    },
    workorderCount(params){
        return httpApi.postForm(_COUNT, params)
    },
    operationStar(params){
        return httpApi.postForm(_STAR, params)
    },

}