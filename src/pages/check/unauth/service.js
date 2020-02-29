import Fetch from '../../../utils/fetch';

export function getUnauthUserList(page) {
    // return Fetch('get', `/user?page=${page}&limit=10`);
    return Fetch('get', `/user?page=${page}&limit=10&status=待审核`);
}

export function checkUnauthUser(id, data) {
    return Fetch('put', `/cert/${id}`, data);
}