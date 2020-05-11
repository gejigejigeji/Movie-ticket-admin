import axios from 'axios'
import {getCookie} from '@/utils/cookie.js'
import {megErr,megSuc} from '@/utils/alert.js'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_APIURL, // url = base url + request url
    headers:{
        token:getCookie('token'),
        'x-csrf-token': getCookie('csrfToken'),
    },

    timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        megErr(error.message);
        return Promise.reject(error)
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 20000 && res == undefined) {
            return Promise.reject('Error')
        } else {
            return res
        }
    },
    error => {
        megErr(error.message);
        return Promise.reject(error)
    }
);

export default service