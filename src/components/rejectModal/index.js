import React from "react";
import { Modal, Input, message } from "antd";

const { TextArea } = Input;

export default class Home extends React.Component {
  state = {
    value: ""
  };
  static defaultProps={
    handleOk: () => {}
  }
  componentDidUpdate(preProps){
    if (this.props.visible !== preProps.visible && !preProps.visible) {
        this.setState({ value: '' });
    }
  }
  onChange = e => {
      console.log(e);
    this.setState({ value: e.target.value });
  };
  handleOk = () => {
      if(!this.state.value){
          message.error('请填写');
          return;
      }
      this.props.handleOk(this.state.value);
  }
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
      >
        <TextArea rows={4} onChange={this.onChange} value={this.state.value} />
      </Modal>
    );
  }
}
