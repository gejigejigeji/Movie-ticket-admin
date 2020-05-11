import axios from 'axios'
import {getCookie} from '@/utils/cookie.js'
import request from '@/utils/request'
export const uploadFile = (file,params) => {
    const param = new FormData();
    param.append("file", file);
    for (let a in params) {
        param.append(a, params[a]);
    }
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'x-csrf-token': getCookie('csrfToken'),
            "data":JSON.stringify(params)
        },
        method:'post',
    };
    return axios.post(process.env.VUE_APP_APIURL+"/banner/banner", param, config)
};


//获取某给存储桶下的图片列表
export function getImageList(params) {
    return request({
        url: '/file/file',
        method: 'get',
        params
    })
}
//删除存储桶某个对象
export function deleteFile(data,id) {
    return request({
        url: `/file/file/${id}/`,
        method: 'delete',
        data
    })
}

export function getPay(params,id) {
    return request({
        url: `/shoppingCart/shoppingCart/${id}`,
        method: 'get',
        params
    })
}