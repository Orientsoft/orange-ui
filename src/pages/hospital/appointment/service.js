import Fetch from '../../../utils/fetch';

export function getAppointList(page = 1) {
    return Fetch('get', `/order/hospital?page=${page}&limit=10`);
}

export function orderRegister(data) {
    return Fetch('post', '/order/register', data);
}

export function orderCase(data) {
    return Fetch('post', '/order/case', data);
}
