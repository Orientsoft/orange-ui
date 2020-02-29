import Fetch from '../../../utils/fetch';

export function getCheckNewsList(page) {
    return Fetch('get', `/news/operation?page=${page}&limit=10`);
}

export function checkNews(data) {
    return Fetch('put', '/news/check', data);
}