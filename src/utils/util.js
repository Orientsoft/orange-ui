import { message } from "antd";
import moment from "moment";
export function filterParams(params) {
  if (!params) {
    return {};
  }
  const result = {};
  const keys = Object.keys(params);
  keys.forEach(v => {
    if (params[v] === "" || params[v] === undefined || params[v] === null) {
      return;
    }
    if (v === 'menuArr') {
      result[v] = params[v];
      return;
    }
    if(v === 'businessNumber'){
      result[v] = params[v];
      return;
    }
    
    if (Array.isArray(params[v]) && !params[v].length) {
      return;
    }
    if (params[v] === "true") {
      result[v] = true;
      return;
    }
    if (params[v] === "false") {
      result[v] = false;
      return;
    }
    if (v === "phone" || v === "code") {
      result[v] = params[v];
      return;
    }
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (!isNaN(params[v]) && reg.test(params[v])) {
      result[v] = Number(params[v]);
      return;
    }
    if (v === "rangeTime") {
      result.startTime = params[v][0].format("YYYY-MM-DD HH:mm:ss");
      result.endTime = params[v][1].format("YYYY-MM-DD HH:mm:ss");
      return;
    }
    if (v === "rangeDate") {
      result.startTime = params[v][0].format("YYYY-MM-DD");
      result.endTime = params[v][1].format("YYYY-MM-DD");
      return;
    }
    if (v === "workEndTime") {
      result.workEndTime = params[v].format("HH:mm");
      return;
    }
    if (v === "workStartTime") {
      result.workStartTime = params[v].format("HH:mm");
      return;
    }
    if (v === "data") {
      result.data = filterParams(params[v]);
      return;
    }
    result[v] = params[v];
  });
  return result;
}

// export function setSession(name, value) {
//   var data = value;
//   if (typeof data !== "string") {
//     if (typeof data === "undefined") {
//       data = null;
//     } else {
//       data = JSON.stringify(data);
//     }
//   }
//   sessionStorage.setItem(name, data);
// }

// export function getSession(name) {
//   var data = sessionStorage.getItem(name);
//   try {
//     return JSON.parse(data);
//   } catch (e) {
//     return data;
//   }
// }

export function formatTree(src, key = 1) {
  const ret = src.filter(v => v.pid === key);
  const tmp = ret.map(v => {
    const next = {
      title: v.areaName,
      value: v.id,
      label: v.areaName
    };
    if (v.hierarchy >= 3) {
      next.children = [];
    } else {
      next.children = formatTree(src, v.id);
    }
    return next;
  });
  return tmp;
}

export function proTree(key, src, titleKey) {
  const ret = src.filter(v => v.pid === key);
  const tmp = ret.map(v => {
    const next = {
      ...v,
      title: v[titleKey || "name"],
      key: v.id
    };
    const nextRet = proTree(v.id, src, titleKey);
    if (nextRet.length) {
      next.children = nextRet;
    }
    return next;
  });
  return tmp;
}

export function beforeUpload(file) {
  console.log(file);
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("请上传 JPG/PNG图片!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("请上传小于2MB的图片!");
  }
  return isJpgOrPng && isLt2M;
}

export function getDayRange() {
  const time = new Date();
  const start = `${time.getFullYear()}-${time.getMonth() +
    1}-${time.getDate()} 00:00:00`;
  const end = `${time.getFullYear()}-${time.getMonth() +
    1}-${time.getDate()} 23:59:59`;
  return [moment(start), moment(end)];
}

export function getRowKey(record){
  return record.id;
}

export function renderTime(v){
  if(!v){
    return null;
  }
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
}