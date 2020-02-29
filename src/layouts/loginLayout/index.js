import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import './index.scss';
// import logo from '../../assets/logo.png';
import Login from '../../pages/login';
import LoginCode from '../../pages/loginCode';

class LoginLayout extends React.Component {
    state ={
        isCodeLogin: false,
    }
    changeLoginWay = () => {
        this.setState({
            isCodeLogin: !this.state.isCodeLogin,
        });
    }
    render() {
        console.log('this.props.appStatus', this.props.appStatus);
        if (this.props.appStatus.isAuth) {
            return <Redirect
                to={{
                    pathname: "/"
                }}
            />
        }
        return (
            <div className='login-container'>
                <div className='login-content'>
                    <div className='top'>
                        <div className='header'>
                            {/* <img alt="logo" className='logo' src={logo} /> */}
                            <span className='login-title'>后台管理系统</span>
                        </div>
                        <div className='desc'></div>
                    </div>
                    {
                        this.state.isCodeLogin ? <LoginCode { ...this.props } /> : <Login { ...this.props } />
                    }
                    <div className='login-way'>
                      <div className='text-value' >
                        <span className='canClick' onClick={this.changeLoginWay}>{this.state.isCodeLogin ? '账号密码登录':'验证码登录'}</span>
                     </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        appStatus: state.appStatus,
    };
  };

  export default connect(mapStateToProps)(LoginLayout);