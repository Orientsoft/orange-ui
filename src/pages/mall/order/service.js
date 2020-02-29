import Fetch from '../../../utils/fetch';

export function getOrderList(page) {
    return Fetch('get', `/order/admin?page=${page}&limit=10`);
}

export function getOrderDetail(id) {
    return Fetch('get', `/order/appointment/${id}`);
}