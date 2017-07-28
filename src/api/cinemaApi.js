import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/cinema';
const _CINEMA_GROUP = `${prefix}/listCinemaGroup.do`;//影院组列表
const _CINEMA = `${prefix}/listCinema.do`;//影院列表

export default {
    _CINEMA_GROUP:_CINEMA_GROUP,
    _CINEMA:_CINEMA,
    listCinemaGroup(params){
        return httpApi.postForm(_CINEMA_GROUP, params)
    },
    listCinema(params){
        return httpApi.postForm(_CINEMA, params)
    }
}