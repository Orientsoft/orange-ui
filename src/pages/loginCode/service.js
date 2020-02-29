import Fetch from '../../utils/fetch';

export function login(data) {
    return Fetch('post', '/login', data);
}

export function getCode(phone) {
    return Fetch('get', `/code?phone=${phone}&event=login`);
}