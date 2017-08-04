import httpApi from './httpApi'
import axios from 'axios'
const prefix = '/siteInterface';
const prefixG = '/siteInterfaceCategory';

const LIST_port = `${prefix}/list.do`; //
const ADD_port = `${prefix}/create.do`
const EDIT_port = `${prefix}/saveEdit.do`
const DEL_port = `${prefix}/delete.do`

const LIST_port_GROUP = `${prefixG}/list.do`; //
const ADD_port_GROUP = `${prefixG}/create.do`
const EDIT_port_GROU = `${prefixG}/save.do`
const DEL_port_GROU = `${prefixG}/del.do`
export default {
    ListPort(params) {
        return httpApi.postForm(LIST_port, params)
    },
    addPort(params) {
        return httpApi.postForm(ADD_port, params)
    },
    editPort(params) {
        return httpApi.postForm(EDIT_port, params)
    },
    delPort(params) {
        return httpApi.postForm(DEL_port, params)
    },
    ListPortGroup(params) {
        return httpApi.postForm(LIST_port_GROUP, params)
    },
    addPortGroup(params) {
        return httpApi.postForm(ADD_port_GROUP, params)
    },
    editPortGroup(params) {
        return httpApi.postForm(EDIT_port_GROU, params)
    },
    delPortGroup(params) {
        return httpApi.postForm(DEL_port_GROU, params)
    }
}