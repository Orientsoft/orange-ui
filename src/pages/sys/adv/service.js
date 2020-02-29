import Fetch from '../../../utils/fetch';

export function getAdvList(type) {
    return Fetch('get', `/adv?location=${type}`);
}


export function addAdv(data) {
    return Fetch('post', '/adv', data);
}


export function editAdv(id, data) {
    return Fetch('put', `/adv/${id}`, data);
}

export function deleteAdv(id) {
    return Fetch('delete', `/adv/${id}`);
}