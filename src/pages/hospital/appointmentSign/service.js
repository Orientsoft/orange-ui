import Fetch from '../../../utils/fetch';

export function getAppointList(page = 1) {
    return Fetch('get', `/appointment/hospital?page=${page}&limit=10`);
}