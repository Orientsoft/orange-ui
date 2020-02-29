import React from "react";
import { Tabs } from "antd";
import LabelForm from "./labelForm";

const { TabPane } = Tabs;

export default class Home extends React.Component {
  state = {
    activeKey: '健康自诊',
  }
  onChange = (key) => {
    this.setState({ activeKey: key });
  }
  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
          <TabPane tab="健康自诊" key="健康自诊">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="常见疾病" key="常见疾病">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="健康商城" key="健康商城">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="医院" key="医院">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="名师讲堂" key="名师讲堂">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="营养餐" key="营养餐">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
          <TabPane tab="新闻" key="新闻">
            <LabelForm activeKey={this.state.activeKey} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
