import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/position';
const LIST_POSITION = `${prefix}/listPosition.do`; //

export default {
    ListPosition(params) {
        return httpApi.postForm(LIST_POSITION, params)
    }
}