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
    preHandleIndexData(res,type){

        let newRes ={
            xAxisDate:[],
            xAxisWeek:[],
            data:[]
        }
        let getWeekDay =date=>{
            switch (date.getDay()){
                case 0:
                    return '周日';
                case 1:
                    return '周一';
                case 2:
                    return '周二';
                case 3:
                    return '周三';
                case 4:
                    return '周四';
                case 5:
                    return '周五';
                case 6:
                    return '周六';
                default:
                    return '';
            }
        }
        for(let i in res)
        {
            switch (type){
                case "workorder":
                    newRes.data.push(parseInt(res[i].workorderCount?res[i].workorderCount:'0'))
                    break
                case "complete":
                    newRes.data.push(parseInt(res[i].completeTime?res[i].completeTime:'0'))
                    break
                case "respond":
                    newRes.data.push(parseInt(res[i].respondTime?res[i].respondTime:'0'))
                    break
            }
            let date = new Date(res[i].workorderdate);
            newRes.xAxisDate.push(date.getMonth()+1+'-'+date.getDate())
            newRes.xAxisWeek.push(getWeekDay(date));

        }
        return newRes;
    }

}