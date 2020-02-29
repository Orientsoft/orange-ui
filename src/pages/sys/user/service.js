import Fetch from '../../../utils/fetch';

export function getUserList(page) {
    return Fetch('get', `/user?page=${page}&limit=10`);
}
