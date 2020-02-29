import Fetch from '../../utils/fetch';

export function getAppointAdminList(page = 1) {
    return Fetch('get', `/appointment/admin?page=${page}&limit=1000`);
}

export function appointAsign(id, data) {
    return Fetch('put', `/appointment/${id}`, data);
}

export function getHospitalList(page = 1) {
    return Fetch('get', `/hospital?page=${page}&limit=10`);
}

