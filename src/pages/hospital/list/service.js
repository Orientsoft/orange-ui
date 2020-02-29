import Fetch from '../../../utils/fetch';

export function getHospitalList(page) {
    return Fetch('get', `/hospital/hospitalAdmin?page=${page}&limit=10`);
}

export function editHospital(id, data) {
    return Fetch('put', `/hospital/${id}`, data);
}

export function getLabelList() {
    return Fetch('get', '/tag?type=医院');
}

export function getToolmanList() {
    return Fetch('get', '/hospital/toolman');
}

export function addToolman(data) {
    return Fetch('post', '/hospital/toolman', data);
}

export function deleteToolman(data) {
    return Fetch('delete', '/hospital/toolman', data);
}