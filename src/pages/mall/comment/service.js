import Fetch from '../../../utils/fetch';

export function getCommentList(page) {
    return Fetch('get', `/product/comment?page=${page}&limit=10`);
}

export function cancelCommentSpecial(data) {
    return Fetch('delete', '/comment/operator', data);
}