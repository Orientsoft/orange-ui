import Fetch from '../../../utils/fetch';

export function getHospitalList(page) {
    return Fetch('get', `/hospital/admin?page=${page}&limit=10`);
}