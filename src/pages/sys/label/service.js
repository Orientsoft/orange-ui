import Fetch from '../../../utils/fetch';

export function getLabels(type) {
    return Fetch('get', `/tag?type=${type}`);
}

export function addLabels(data) {
    return Fetch('post', '/tag', data);
}

export function deleteLabels(id) {
    return Fetch('delete', `/tag/${id}`);
}