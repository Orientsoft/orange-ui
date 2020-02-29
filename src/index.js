// import 'babel-polyfill';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { PersistGate } from "redux-persist/integration/react";

import React from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import AppRouter from "./router";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { persistor } from "./store/store";

// // 初始化全局数据
// window.globalStore = {
//   lastActiveTime: Date.now()
// };

moment.locale("zh-cn");

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
