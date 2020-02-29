import Fetch from '../../../utils/fetch';

export function getProductList(page) {
    return Fetch('get', `/product?page=${page}&limit=10`);
}
export function addProduct(data) {
    return Fetch('post', '/product', data);
}

export function deleteProduct(id) {
    return Fetch('delete', `/product/${id}`);
}

export function editProduct(id, data) {
    return Fetch('put', `/product/${id}`, data);
}

export function getAllHospital() {
    return Fetch('get', '/hospital?page=1&limit=1000');
}

export function getLabelList() {
    return Fetch('get', '/tag?type=健康商城');
}
