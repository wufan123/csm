import httpApi from './httpApi'
const prefix = '/serviceUser';

const _LOGIN = `${prefix}/serviceLogin.do`;
const _LOGOUt = `${prefix}/serviceLoginout.do`;

export default {
    _LOGIN: _LOGIN,
    _LOGOUt: _LOGOUt,
    login (params) {
        return httpApi.postForm(_LOGIN, params)
    },
    logout(params){
        return httpApi.postForm(_LOGOUt, params)
    }
    ,
    reSortMenus(menus){//将原先的菜单列表转换成三维数组
        let array1 = [];
        let array2 = [];
        let array3 = [];
        for (let i in menus) {
            if (menus[i].hierarchy === 1) {
                array1.push(menus[i])
            }
            if (menus[i].hierarchy === 2) {
                array2.push(menus[i])
            }
            if (menus[i].hierarchy === 3) {
                array3.push(menus[i])
            }
        }
        for(let i in array2)
        {
            array2[i].childMenus =[];
            for(let j in array3)
            {
                if(array2[i].id ===array3[j].parentId)
                {
                    array2[i].childMenus.push(array3[j])
                }
            }
        }
        for(let i in array1)
        {
            array1[i].childMenus =[];
            for(let j in array2)
            {
                if(array1[i].id ===array2[j].parentId)
                {
                    array1[i].childMenus.push(array2[j])
                }
            }
        }

        return array1;
    }
}
