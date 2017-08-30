import httpApi from './httpApi'
const prefix = '/cinemaManager';
const _LIST = `${prefix}/listManager.do`;//列表
const _DETAIL = `${prefix}/detail.do`;//详细
const _SAVE = `${prefix}/saveManagerEdit.do`;//保存
const _CREATE = `${prefix}/addManager.do`;//新建
const _DELETE = `${prefix}/deleteManager.do`;//新建

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
        return httpApi.postForm(_EXPORT, params)
    },
    delete(params){
        return httpApi.postForm(_DELETE, params)
    }
}