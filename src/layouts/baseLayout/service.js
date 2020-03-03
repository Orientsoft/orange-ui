import Fetch from '../../utils/fetch';

export function getUserInfo() {
    return Fetch('get', '/user/me');
}

export function resetPassword(data) {
    return Fetch('post', '/resetpasswd', data);
}

export function getCode(phone) {
    return Fetch('get', `/code?phone=${phone}&event=reset`);
}

export function logout() {
    return Fetch('get', '/logout?channel=web');
}

export function apiGetMenu(role = []){
   const menu = [
        {
            id: 1,
            pid: 0,
            name: '商城管理',
            path: '/mall',
            component: 'mall',
            auth: 4,
        },
        {
            id: 2,
            pid: 1,
            name: '产品管理',
            path: '/mall/product',
            component: 'mall/product',
            auth: 4,
        },
        {
            id: 3,
            pid: 1,
            name: '订单列表',
            path: '/mall/order',
            component: 'mall/order',
            auth: 4,
        },
        {
            id: 101,
            pid: 1,
            name: '评论管理',
            path: '/mall/comment',
            component: 'mall/comment',
            auth: 4,
        },
        {
            id: 4,
            pid: 0,
            name: '审核管理',
            path: '/check',
            component: 'check',
            auth: 4,
        },
        {
            id: 5,
            name: '待认证用户',
            pid: 4,
            path: '/check/unauth',
            component: 'check/unauth',
            auth: 4,
        },
        {
            id: 6,
            pid: 4,
            name: '医院审核',
            path: '/check/hospitalCheck',
            component: 'check/hospitalCheck',
            auth: 4,
        },
        {
            id: 7,
            pid: 4,
            name: '医院新闻审核',
            path: '/check/hospitalNewsCheck',
            component: 'check/hospitalNewsCheck',
            auth: 4,
        },
        {
            id: 8,
            pid: 0,
            name: '文章管理',
            path: '/article',
            component: 'article',
            auth: 4,
        },
        {
            id: 9,
            pid: 8,
            name: '名师讲堂',
            path: '/article/class',
            component: 'article/class',
            auth: 4,
        },
        {
            id: 10,
            pid: 8,
            name: '健康自诊',
            path: '/article/diagnosis',
            component: 'article/diagnosis',
            auth: 4,
        },
        {
            id: 11,
            pid: 8,
            name: '常见疾病',
            path: '/article/disease',
            component: 'article/disease',
            auth: 4,
        },
        {
            id: 12,
            pid: 8,
            name: '营养餐',
            path: '/article/meal',
            component: 'article/meal',
            auth: 4,
        },
        {
            id: 13,
            pid: 8,
            name: '平台新闻',
            path: '/article/platformNews',
            component: 'article/platformNews',
            auth: 4,
        },
        {
            id: 14,
            pid: 0,
            name: '精准预约指派',
            path: '/appointmentAsign',
            component: 'appointmentAsign',
            auth: 4,
        },

        {
            id: 15,
            pid: 0,
            name: '系统管理',
            path: '/sys',
            component: 'sys',
            auth: 4,
        },
        {
            id: 16,
            pid: 15,
            name: '医院管理',
            path: '/sys/hospitalList',
            component: 'sys/hospitalList',
            auth: 4,
        },
        {
            id: 17,
            pid: 15,
            name: '用户管理',
            path: '/sys/user',
            component: 'sys/user',
            auth: 4,
        },
        {
            id: 18,
            pid: 15,
            name: '标签管理',
            path: '/sys/label',
            component: 'sys/label',
            auth: 4,
        },
        {
            id: 19,
            pid: 15,
            name: '广告管理',
            path: '/sys/adv',
            component: 'sys/adv',
            auth: 4,
        },
        {
            id: 20,
            pid: 0,
            name: '医院管理',
            path: '/hospital',
            component: 'hospital',
            auth: 2,
        },
        {
            id: 21,
            pid: 20,
            name: '医院信息',
            path: '/hospital/list',
            component: 'hospital/list',
            auth: 2,
        },
        {
            id: 22,
            pid: 20,
            name: '医院新闻',
            path: '/hospital/hospitalNews',
            component: 'hospital/hospitalNews',
            auth: 2,
        },

        {
            id: 23,
            pid: 20,
            name: '精准预约',
            path: '/hospital/appointmentSign',
            component: 'hospital/appointmentSign',
            auth: 2,
        },
        {
            id: 24,
            pid: 0,
            name: '预约订单',
            path: '/hospitalAppointment',
            component: 'hospitalAppointment',
            auth: 3,
        },
    ];
    const ret = menu.filter(v => {
        return role.includes(v.auth);
    })
    return ret;
}