import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/employee';
const LIST_EMPLOYEE = `${prefix}/listUser.do`; //职员列表
const ADD_EMPLOYEE = `${prefix}/addCommonUser.do`;
const EDIT_EMPLOYEE = `${prefix}/saveCommonUser.do`;
const DELETE_EMPLOYEE = `${prefix}/del.do`;

export default {
    ListEmployee(params) {
        return httpApi.postForm(LIST_EMPLOYEE, params)
    },
    AddEmployee(params) {
        console.log('params', params)
        return httpApi.postForm(ADD_EMPLOYEE, params)
    }
}