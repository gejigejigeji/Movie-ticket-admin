import { Message } from 'element-ui';

export const megSuc = info => {
    Message({
        showClose: true,
        message: info,
        type: 'success'
    });
};

export const megErr = info => {
    Message({
        showClose: true,
        message: info,
        type: 'error'
    });
};