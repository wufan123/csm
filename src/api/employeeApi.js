import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/employee';
const LIST_EMPLOYEE = `${prefix}/listUser.do`; //职员列表
const ADD_EMPLOYEE = `${prefix}/addCommonUser.do`;
const EDIT_EMPLOYEE = `${prefix}/saveCommonUser.do`;
const DELETE_EMPLOYEE = `${prefix}/del.do`;
const DETAIL = `${prefix}/detail.do`;

export default {
    URL_DETAIL:DETAIL,
    ListEmployee(params) {
        return httpApi.postForm(LIST_EMPLOYEE, params)
    },
    AddEmployee(params) {
        return httpApi.postForm(ADD_EMPLOYEE, params)
    },
    delEmployee(params) {
        return httpApi.postForm(DELETE_EMPLOYEE, params)
    },
    updateEmployee(params) {
        return httpApi.postForm(EDIT_EMPLOYEE, params)
    }
}