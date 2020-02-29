import axios from "axios";
import React from "react";
import { Modal } from "antd";
import ReactDOM from "react-dom";
import { filterParams } from "./util";
import { baseUrl } from "../config/http";
import store from "../store/store";
import { updateActiveTimeAction, logoutAction } from "../store/action";

const lockStatus = {};

const second10 = 10000;
const minute1 = 60000;
const minute30 = 1800000; // 单位毫秒
// const minute30 = 60000;

function showLoginModal() {
  store.dispatch(logoutAction());
  ReactDOM.render(
    <Modal
      visible={true}
      footer={false}
      closable={false}
      bodyStyle={{ fontSize: "24px", textAlign: "center" }}
      width={300}
    >
      你的登录信息已过期
      <div>
        请重新<a href="/login">登录</a>
      </div>
    </Modal>,
    document.getElementById("no_login")
  );
}

function freshToken() {
  console.log('f1');
  if (lockStatus.lock) {
    return;
  }
  console.log('f2');
  lockStatus.lock = true;
  const { appStatus } = store.getState();
  setTimeout(() => {
    axios({
      method: "get",
      url: `${baseUrl}/refresh`,
      headers: {
        "content-Type": "application/json",
        // token: appStatus.token,
        AccessToken: appStatus.refresh_token
        // 'Cache-Control': 'no-cache',
      }
    })
      .then(res => {
        const { data } = res;
        console.log();
        if (data.status === 1) {
          store.dispatch(updateActiveTimeAction({ token: data.data.access_token, createTime: Date.now() }));
        }
        lockStatus.lock = false;
      })
      .catch(() => {
        lockStatus.lock = false;
      });
  }, second10);
}

// 从创建token开始，最早半个小时更新一次token
function tokenCheck(url) {
  return new Promise((resolve, reject) => {
    console.log(url);
    // 排除登录接口和退出接口
    if (url === "/login" || url === "/logout?channel=web" || url.indexOf('/code') !== -1) {
      return resolve();
    }
    const now = Date.now();
    const { appStatus } = store.getState();
    const passTick = now - appStatus.createTime;
    console.log("passTick", passTick);
    // 半个小时之内都不更新
    if (passTick < minute30){
      return resolve();
    }

    // 如果token现在过期了， 则说明在超过半小时没有进行操作，则提示登录
    if (passTick > ((appStatus.expir * 1000) - minute1)) {
      console.log('expir');
      showLoginModal();
      return reject();
    }
    resolve();
    freshToken();
  });
}

function Fetch(method, url, data) {
  const { appStatus } = store.getState();
  return new Promise(resolve => {
    tokenCheck(url)
      .then(() => {
        console.log('now');
        axios({
          method,
          url: `${baseUrl}${url}`,
          headers: {
            "content-Type": "application/json",
            // token: appStatus.token,
            AccessToken: appStatus.token
            // 'Cache-Control': 'no-cache',
          },
          data: filterParams(data)
        })
          .then(res => {
            const { data } = res;
            if (data.status === 3) {
              showLoginModal();
              return {};
            }
            resolve(data);
          })
          .catch(e => {
            console.log(e);
            resolve({});
          });
      })
      .catch(() => {
        resolve({});
      });
  });
}

export default Fetch;
