
console.log('process.env.NODE_ENV', process.env.REACT_APP_PRODUCTION);
// let url = 'http://47.111.11.236:9003';
let url = 'http://testland.orientsoft.cn:7777/api/v1';

if (process.env.REACT_APP_PRODUCTION === 'true') {
    url = 'http://consoleapi.hjyinfo.com';
}

export const baseUrl = url;