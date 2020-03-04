import Fetch from '../../../utils/fetch';

export function getOrderList(page) {
    return Fetch('get', `/order/admin?page=${page}&limit=10`);
}

export function getOrderDetail(id) {
    return Fetch('get', `/order/appointment/${id}`);
}

export function getComment(id) {
    return Fetch('get', `/order/comment/${id}`);
}

export function answerComment(data) {
    return Fetch('post', '/comment/answer', data);
}

export function setCommentSpecial(data) {
    return Fetch('post', '/comment/operator', data);
}