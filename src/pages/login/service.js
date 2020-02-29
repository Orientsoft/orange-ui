import Fetch from '../../utils/fetch';

export function login(data) {
    return Fetch('post', '/login', data);
}