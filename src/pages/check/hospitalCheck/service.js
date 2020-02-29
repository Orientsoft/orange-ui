import Fetch from '../../../utils/fetch';

export function getCheckHospitalList(page) {
    return Fetch('get', `/hospital/operation?page=${page}&limit=10`);
}

export function passCheck(data) {
    return Fetch('put', '/hospital/check', data);
}

export function rejectCheck(data) {
    return Fetch('put', '/hospital/check', data);
}