import React from "react";
import { Input, Button, Popconfirm, Icon, message, Divider } from "antd";
import { getLabels, addLabels, deleteLabels } from "./service";

export default class Label extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getLabels(this.props.activeKey)
      .then(res => {
        if (res.status === 1) {
          this.setState({
            data: res.data
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  confirm = (id) => () => {
    deleteLabels(id)
    .then((res) => {
      if (res.status === 1) {
        const data = this.state.data.filter(v => v.id !== id);
        this.setState({ data });
        return;
      }
      message.error("删除失败");
    })
    .catch((e) => {
      console.log(e);
    });
  };
  onChange = e => {
    this.value = e.target.value;
  };
  addLabel = () => {
    if (!this.value) {
      message.error("请输入标签内容");
      return;
    }
    addLabels({
      name: this.value,
      type: this.props.activeKey
    })
      .then(res => {
        if (res.status === 1) {
          this.getPageData();
          return;
        }
        message.error("添加失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Input
            onChange={this.onChange}
            placeholder="请输入标签"
            style={{ width: "260px", marginRight: "16px" }}
          />
          <Button type="primary" onClick={this.addLabel}>
            添加
          </Button>
        </div>
        <Divider></Divider>
        {this.state.data.map(v => (
          <Popconfirm
            key={v.id}
            title="确定删除?"
            onConfirm={this.confirm(v.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" style={{ marginRight: "8px" }}>
              {v.name}
              <Icon type="close-circle" />
            </Button>
          </Popconfirm>
        ))}
      </div>
    );
  }
}
