import React from "react";
import {
  Modal,
  Input,
  Button,
  Popconfirm,
  message,
  Divider,
  List
} from "antd";
import { getToolmanList, addToolman, deleteToolman } from "./service";

export default class ToolmanModal extends React.Component {
  state = {
    data: []
  };
  componentDidUpdate(preProps) {
    if (this.props.visible !== preProps.visible && !preProps.visible) {
      this.getPageData();
    }
  }
  getPageData = () => {
    getToolmanList()
      .then(res => {
        if (res.status === 1) {
          this.setState({ data: res.data });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  confirm = phone => () => {
    deleteToolman({ phone })
      .then(res => {
        if (res.status === 1) {
          const data = this.state.data.filter(v => v.phone !== phone);
          this.setState({ data });
          return;
        }
        message.error("删除失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  onChange = e => {
    this.value = e.target.value;
  };
  addLabel = () => {
    if (!this.value) {
      message.error("请输入手机号");
      return;
    }
    addToolman({
      phone: this.value
    })
      .then(res => {
        if (res.status === 1) {
          this.getPageData();
          return;
        }
        message.error(`添加失败:${res.message}`);
      })
      .catch(e => {
        console.log(e);
      });
  };
  renderItem = item => {
    const extra = (
      <Popconfirm
        title="确定删除?"
        onConfirm={this.confirm(item.phone)}
        okText="确定"
        cancelText="取消"
      >
        <Button type="danger">删除</Button>
      </Popconfirm>
    );
    return (
      <List.Item key={item.phone} extra={extra}>
        {item.phone}
      </List.Item>
    );
  };
  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title="添加收费员"
        onCancel={onCancel}
        footer={false}
        bodyStyle={{ minHeight: "400px" }}
      >
        <div style={{ marginBottom: "16px" }}>
          <Input
            onChange={this.onChange}
            placeholder="请输入手机号"
            style={{ width: "260px", marginRight: "16px" }}
          />
          <Button type="primary" onClick={this.addLabel}>
            添加
          </Button>
        </div>
        <Divider />
        <List
          bordered
          dataSource={this.state.data}
          renderItem={this.renderItem}
        />
        {/* {this.state.data.map(v => (
          <Popconfirm
            key={v.id}
            title="确定删除?"
            onConfirm={this.confirm(v.phone)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" style={{ marginRight: "8px" }}>
              {v.phone}
              <Icon type="close-circle" />
            </Button>
          </Popconfirm>
        ))} */}
      </Modal>
    );
  }
}
