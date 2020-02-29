import { Modal, Tabs } from "antd";
import React from "react";
import ResetPassword from './resetPassword';
// import { getUserInfo } from "./service";


const { TabPane } = Tabs;

export default class My extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      visible: false,
      // data: {},
      editInfo: {},
      isGetCode: true,
      isDisabled: true,
      count: 60
    };
  }
  // componentDidUpdate(preProps) {
  //   if (this.props.visible !== preProps.visible && !preProps.visible) {
  //     getUserInfo()
  //       .then(res => {
  //         if (res.status === 1) {
  //           this.setState({ data: res.data });
  //         }
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }
  // }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    const { userData } = this.props;
    console.log('userData', userData);
    return (
      <Modal
        title="个人中心"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        footer={false}
        maskClosable={false}
      >
          {
              this.props.visible && (
                <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                style={{ minHeight: 400 }}
              >
                <TabPane tab="基本信息" key="1">
                  <div className="head-line">
                    手机号: <span>{userData.phone}</span>
                  </div>
                </TabPane>
                <TabPane tab="重置密码" key="2">
                  <ResetPassword />
                </TabPane>
              </Tabs>
              )
          }
      </Modal>
    );
  }
}
