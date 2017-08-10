import httpApi from './httpApi'
const prefix = '/communicateRecord';
const _LIST = `${prefix}/listCommunicateRecord.do`;//加入工单聊天群

export default {
    list(params){
        return httpApi.postForm(_LIST, params)
    },
    processData(data){
        data =data.filter(item=>{
            return item.type
        })
        for(let i in data)
        {
            try{
                data[i].custom = JSON.parse(data[i].custom)
            }catch (e)
            {
            }
            if(!data[i].custom)
            {
                data[i].custom={}
            }
        }
        return data
    }
}