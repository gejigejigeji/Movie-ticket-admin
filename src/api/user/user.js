import request from '@/utils/request'


export function getUserInfo(params) {
    return request({
        url: '/login',
        method: 'get',
        params
    })
}