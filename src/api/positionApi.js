import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/position';
const LIST_POSITION = `${prefix}/listPosition.do`; //
const ADD_POSITION = `${prefix}/addPosition.do`

export default {
    ListPosition(params) {
        return httpApi.postForm(LIST_POSITION, params)
    },
    addPosition(params) {
        return httpApi.postForm(ADD_POSITION, params)
    }
}