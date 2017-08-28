import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/cinema';
const _CINEMA_GROUP = `${prefix}/listCinemaGroup.do`; //影院组列表
const ADD_CINEMA_GROUP = `${prefix}/addCinemaGroup.do`
const DET_CINEMA_GROUP = `${prefix}/deleteCinemaGroup.do`
const EDIT_CINEMA_GROUP = `${prefix}/saveCinemaGroupEdit.do`

const _CINEMA = `${prefix}/listCinema.do`; //影院列表
const DEL_CINEMA = `${prefix}/deleteCinema.do`
const ADD_CINEMA = `${prefix}/addCinema.do`
const EDIT_CINEMA = `${prefix}/saveCinemaEdit.do`
const LIST_BY_USER = `${prefix}/listCinemaByUser.do`


export default {
    _CINEMA_GROUP: _CINEMA_GROUP,
    _CINEMA: _CINEMA,
    listCinemaGroup(params) {
        return httpApi.postForm(_CINEMA_GROUP, params)
    },
    addCinemaGroup(params) {
        return httpApi.postForm(ADD_CINEMA_GROUP, params)
    },
    editCinemaGroup(params) {
        return httpApi.postForm(EDIT_CINEMA_GROUP, params)
    },
    delCinemaGroup(params) {
        return httpApi.postForm(DET_CINEMA_GROUP, params)
    },
    listCinema(params) {
        return httpApi.postForm(_CINEMA, params)
    },
    listCinemaByUser(){
        return httpApi.postForm(LIST_BY_USER)
    },
    delCinema(params) {
        return httpApi.postForm(DEL_CINEMA, params)
    },
    addCinema(params) {
        return httpApi.postForm(ADD_CINEMA, params)
    },
    editCinema(params) {
        return httpApi.postForm(EDIT_CINEMA, params)
    }
}