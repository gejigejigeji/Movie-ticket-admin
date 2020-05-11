import axios from 'axios'
import {getCookie} from '@/utils/cookie.js'
import request from '@/utils/request'
////////////////////////////产品列表/////////////////////////

//获取产品列表
export function getProductList(params) {
    return request({
        url: `/product/product`,
        method: 'get',
        params
    })
}

//获取产品分类
export function getCategoryList(params) {
    return request({
        url: `/product/category`,
        method: 'get',
        params
    })
}

//创建产品
export function createProduct(data) {
    return request({
        url: `/product/product`,
        method: 'post',
        data
    })
}
///////////////////////////产品封面////////////////////////////
export const uploadProductCover = (file,params) => {
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
    return axios.post(process.env.VUE_APP_APIURL+"/product/productCover", param, config)
};
//////////////////////产品详情/////////////////////

export const uploadProductDetails = (files,data) => {
    const param = new FormData();
    files.map((a, b) => {
        param.append(`file${b}`, a.raw);
    });
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'x-csrf-token': getCookie('csrfToken'),
            "data":JSON.stringify(data)
        },
        method:'post',
    };
    return axios.post(process.env.VUE_APP_APIURL+"/product/productDetails", param, config)
};


//创建产品详情
export function createDetails(data) {
    return request({
        url: `/product/productDetails/createProductDetails`,
        method: 'post',
        data
    })
}
//查找一条产品详情
export function getDetails(id,params) {
    return request({
        url: `/product/productDetails/${id}`,
        method: 'get',
        params
    })
}
export function asd(id,params) {
    return request({
        url: `/address/address/3`,
        method: 'put',
    })
}
///////////////////////////////////////PRODUCTSTYLE//////////////////////////////////////////

//获取产品详情列表
export function getProductDetailsList(params) {
    return request({
        url: `/product/productDetails`,
        method: 'get',
        params
    })
}
