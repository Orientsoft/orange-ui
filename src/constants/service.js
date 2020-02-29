import Fetch from '../utils/fetch';

export function getRegionTree(data) {
    return Fetch('/hjy/console/region/getRegionTree', data);
}
