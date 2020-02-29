import Fetch from '../../utils/fetch';

export function getLabelList(type) {
    return Fetch('get', `/tag?type=${type}`);
}

export function getArticleList(type, page) {
    return Fetch('get', `/${type}?page=${page}&limit=10`);
}

export function addArticleList(type, data) {
    return Fetch('post', `/${type}`, data);
}

export function editArticleList(type, id, data) {
    return Fetch('put', `/${type}/${id}`, data);
}

export function deleteArticleList(type, id) {
    return Fetch('delete', `/${type}/${id}`);
}

export function getPlatformNewsList(page) {
    return Fetch('get', `/news?page=${page}&limit=10`);
}

export function getHospitalNewsList(page) {
    return Fetch('get', `/news/hospital?page=${page}&limit=10`);
}

export function getHospitalList() {
    return Fetch('get', '/hospital/hospitalAdmin?page=1&limit=1000');
}

export function addNews(data) {
    return Fetch('post', '/news', data);
}

export function editNews(id, data) {
    return Fetch('put', `/news/${id}`, data);
}

export function deleteNews(id) {
    return Fetch('delete', `/news/${id}`);
}