import { Form, Icon, Input, Button, message } from 'antd';
import React from 'react';
// import md5 from 'blueimp-md5';
import './index.css';
import { login } from './service';
import store from '../../store/store';
import { loginAction } from '../../store/action';


class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                login({
                    phone: values.phone,
                    // password: md5(values.password),
                    password: values.password,
                    channel: 'web',
                })
                .then((res) => {
                    if(res.status === 1){
                      store.dispatch(loginAction(res.data));
                      return;
                    }
                    message.error(`登录失败:${res.message}`);
                })
                .catch((e) => {
                    console.log(e);
                    message.error(`登录失败`);
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-box'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input
                                style={{  width: '320px', height: '40px' }}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="手机号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                            style={{  width: '320px', height: '40px' }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {/* <a className="login-form-forgot" href="/">忘记密码</a> */}
                        <Button size='large' type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);