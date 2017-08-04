import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/position';
const LIST_POSITION = `${prefix}/listPosition.do`; //
const ADD_POSITION = `${prefix}/addPosition.do`
const EDIT_POSITION = `${prefix}/saveEditPosition.do`
const DEL_POSITION = `${prefix}/del.do`
export default {
    ListPosition(params) {
        return httpApi.postForm(LIST_POSITION, params)
    },
    addPosition(params) {
        return httpApi.postForm(ADD_POSITION, params)
    },
    editPosition(params) {
        return httpApi.postForm(EDIT_POSITION, params)
    },
    delPosition(params) {
        return httpApi.postForm(DEL_POSITION, params)
    }
}