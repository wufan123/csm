import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/menu';
const LIST_MENU = `${prefix}/list.do`; //
const ADD_MENU = `${prefix}/create.do`;
const EDIT_MENU = `${prefix}/saveEdit.do`;
const DELETE_MENU = `${prefix}/delete.do`;
const ENABLE_MENU = `${prefix}/enable.do`;

export default {
    ListMenu(params) {
        return httpApi.postForm(LIST_MENU, params)
    },
    AddMenu(params) {
        return httpApi.postForm(ADD_MENU, params)
    },
    delMenu(params) {
        return httpApi.postForm(DELETE_MENU, params)
    },
    updateMenu(params) {
        return httpApi.postForm(EDIT_MENU, params)
    },
    enableMenu(params) {
        return httpApi.postForm(ENABLE_MENU, params)
    }
}