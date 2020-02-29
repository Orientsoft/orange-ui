import React from "react";
import { Tabs } from "antd";
import AdvManage from "./advManage";

const { TabPane } = Tabs;

export default class Home extends React.Component {
  state = {
    activeKey: 'start',
  }
  onChange = (key) => {
    this.setState({ activeKey: key });
  }
  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
          <TabPane tab="开机页广告" key="start">
            <AdvManage vertical activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="首页广告" key="home">
            <AdvManage  activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="健康广告" key="health">
            <AdvManage activeKey={this.state.activeKey} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
