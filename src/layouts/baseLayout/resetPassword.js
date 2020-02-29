import { Form, Input, Button, message, Row, Col } from "antd";
import React from "react";
import { getCode } from './service';
import { resetPassword } from './service';

class ResetPassword extends React.Component {
  state = {
    isDisabled: true,
    isGetCode: true,
    count: 60,
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        resetPassword(values)
        .then((res) => {
            this.props.form.resetFields();
            this.setState({
                isDisabled: true,
                isGetCode: true,
                count: 60,
            });
            if (res.status === 1) {
                message.success('重置成功');
                return;
            }
            message.error('重置失败');
        })
        .catch((e) => {
            console.log(e);
        });
      }
    });
  };
  onBlur = (e) => {
    this.props.form.validateFields(['phone'], (err, values) => {
      if (err) {
        this.setState({ isDisabled: true });
        return;
      }
      this.setState({ isDisabled: false });
    });
  }
  onChange = (e) => {
    if (!e.target.value) {
      return;
    }
    const  re = /^1\d{10}$/;
    if(re.test(e.target.value)){
      if (this.state.isDisabled) {
        this.setState({ isDisabled: false });
      }
      return;
    }
    if(!this.state.isDisabled){
      this.setState({ isDisabled: true });
    }
  }
  onGetCode = () => {
    const phone = this.props.form.getFieldValue('phone');
    console.log('phone', phone);
    this.setState({ isGetCode: false });
    this.countIndex = setInterval(() => {
      const now = this.state.count - 1;
      this.setState({
        count: now,
      }, () => {
        if(this.state.count === 0){
          clearInterval(this.countIndex);
          this.setState({ count: 60, isGetCode: true });
        }
      });
    }, 1000);
    getCode(phone)
    .then((res) => {
      if(res.status === 1){
        message.success('验证码已发送');
        return;
      }
      message.error(res.message);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <Form onSubmit={this.handleSubmit}>
         <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入你的新密码!" }, { pattern: /^[a-zA-Z0-9]{6,10}$/, message: '请输入6-10位数字字母' }]
            })(
              <Input
                placeholder="新密码"
                style={{ width: "320px", height: "40px" }}
                size="large"
                onBlur={this.onBlur}
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入你的手机号!" }, { pattern: /^1\d{10}$/,message: '请输入11位手机号'},]
            })(
              <Input
                placeholder="你的手机号"
                style={{ width: "320px", height: "40px" }}
                size="large"
                onBlur={this.onBlur}
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Row type='flex'>
              <Col span={16}>
                {getFieldDecorator("code", {
                  rules: [{ required: true, message: "请输入验证码!" }]
                })(<Input style={{ height: "40px" }} placeholder="验证码" />)}
              </Col>
              <Col span={8}>
                {
                  this.state.isGetCode ? <Button disabled={this.state.isDisabled} style={{ height: "40px" }} onClick={this.onGetCode}>获取验证码</Button> : <span className='sms-timer'>{this.state.count}s</span>
                }
                
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

export default Form.create({ name: "rest_password" })(ResetPassword);
