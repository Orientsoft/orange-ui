import React from "react";
import { Layout, Menu, Icon, Dropdown, message, Tooltip } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import { apiGetMenu, getUserInfo } from "./service";

import { logout } from "./service";
import { proTree } from "../../utils/util";
import My from "./my";
import Navigate from "./navigate";
import ContentRoute from "./contentRoute";
import { addNav, changeKey, logoutAction } from "../../store/action";
import store from "../../store/store";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

function SubMenuTitle({ name, icon }) {
  if (name && name.length > 5) {
    return (
      <Tooltip title={name}>
        <span>
          <Icon type={icon ? icon : "user"} />
          <span>{name}</span>
        </span>
      </Tooltip>
    );
  }
  return (
    <span>
      <Icon type={icon ? icon : "user"} />
      <span>{name}</span>
    </span>
  );
}

export default class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      collapsed: false,
      menuConfig: [
        // { name: "首页", path: "/", component: "home", notCodeSplit: true } // 默认菜单为欢迎界面
      ],
      contentHeight: document.body.clientHeight - 120, // 112通过手动调试界面得出，包括导航栏高度，content的margin、padding
      openKeys: [],
      data: [],
      userData: {},
    };
  }

  componentDidMount() {
    getUserInfo()
    .then(res => {
      if (res.status === 1) {
        const menu = apiGetMenu(res.data.role);
        const menuConfig = proTree(0, menu);
        this.setState({ menuConfig, data: menu, userData: res.data });
      }
    })
    .catch(e => {
      console.log(e);
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  clickMenu = ({ key }) => {
    switch (key) {
      case "logout": {
        logout()
          .then(res => {
            store.dispatch(logoutAction());
            this.props.history.push("/login");
            // if (res.code === 0) {
            //   store.dispatch(logoutAction());
            //   this.props.history.push("/login");
            //   return;
            // }
            // message.error("退出失败");
          })
          .catch(e => {
            console.log(e);
            message.error("退出失败");
          });
        break;
      }
      case "me": {
        this.setState({ visible: true });
        break;
      }
      default:
    }
  };
  renderMenu = menuArray => {
    return menuArray.map(value => {
      if(value.notShow){
        return null;
      }
      if (value.children && value.children.length > 0) {
        return (
          <SubMenu
            key={value.id}
            title={<SubMenuTitle icon={value.icon} name={value.name} />}
          >
            {this.renderMenu(value.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={value.id}>
          {value.name.length > 7 ? (
            <Tooltip title={value.name}>
              <Link to={value.path} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Icon type={value.icon ? value.icon : "user"} />
                {value.name}
              </Link>
            </Tooltip>
          ) : (
            <Link to={value.path}>
              <Icon type={value.icon ? value.icon : "user"} />
              {value.name}
            </Link>
          )}
        </Menu.Item>
      );
    });
  };

  onOpenChange = openKeys => {
    // console.log('openKeys', openKeys);
    // this.setState({ openKeys });
    // return;
    switch (openKeys.length) {
      case 0: {
        // 全部闭合菜单
        this.setState({ openKeys });
        break;
      }
      case 1: {
        if (
          this.state.openKeys.length === 2 &&
          this.state.openKeys[1] === openKeys[0]
        ) {
          // 当打开多级菜单时，关闭最外层菜单，但是内层菜并没有关闭，openKeys中会有内层菜单key
          this.setState({ openKeys: [] });
        } else {
          // 打开第一个菜单
          this.setState({ openKeys });
        }
        break;
      }
      case 2: {
        //再次打开一个菜单, 区分打开的两个菜单是否同级
        const one = this.state.data.find(v => v.id === Number(openKeys[0]));
        const two = this.state.data.find(v => v.id === Number(openKeys[1]));
        // console.log(one, two);
        if (one.pid === two.pid) {
          // 同级菜单舍弃第一个
          this.setState({ openKeys: [openKeys[1]] });
        } else {
          //非同级菜单保留
          this.setState({ openKeys });
        }
        break;
      }
      case 3: {
        // 打开第三个菜单，区分第三个菜单和第二个菜单是否同级
        const two = this.state.data.find(v => v.id === Number(openKeys[1]));
        const three = this.state.data.find(v => v.id === Number(openKeys[2]));
        if (two.pid === three.pid) {
          // 同级菜单，第三个替换第二个
          this.setState({ openKeys: [openKeys[0], openKeys[2]] });
        } else {
          // 非同级菜单，第三替换前两个
          this.setState({ openKeys: [openKeys[2]] });
        }
        break;
      }
      default:
    }
  };
  onClickItem = value => {
    console.log("v", value, this.state.data);
    const item = this.state.data.find(v => v.id === Number(value.key));
    console.log(this.props, item);
    store.dispatch(addNav(item));
    store.dispatch(changeKey(item.id));
  };
  goIndex = () => {
    store.dispatch(changeKey('0'));
  }
  render() {
    const menu = (
      <Menu onClick={this.clickMenu}>
        <Menu.Item key="me">个人中心</Menu.Item>
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    );
    // console.log('open', this.state.openKeys);
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            position: "fixed",
            marginRight: "100px",
            height: "100%"
          }}
        >
          <Link to="/" onClick={this.goIndex}>
            <div className="bl-sys-title">
              {this.state.collapsed ? <Icon type="bank" /> : "管理后台"}
            </div>
          </Link>
          <div
            className="scroll-menu"
            style={{
              overflow: "hidden",
              overflowY: "scroll",
              height: this.state.contentHeight
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              onOpenChange={this.onOpenChange}
              openKeys={this.state.openKeys}
              onClick={this.onClickItem}
            >
              {this.renderMenu(this.state.menuConfig)}
            </Menu>
          </div>
        </Sider>
        {/* <Layout style={{ marginLeft: '190px', background: 'red' }}> */}
        <Header
          style={{
            background: "#fff",
            padding: "0 20px 0 0 ",
            position: "absolute",
            left: this.state.collapsed ? "72px" : "190px",
            right: 0,
            width: "100%",
            marginLeft: "10px",
            // zIndex: '10001',
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
            borderBottom: "1px solid #f6f6f6"
          }}
        >
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />

          {/* <div style={{  position: 'absolute', right: 0, display: "inline-block" }}> */}
            <Dropdown overlay={menu}>
              <span style={{ float: 'right', marginRight: '300px' }}>
                <Icon type="user" style={{ marginRight: "4px" }} />
              </span>
            </Dropdown>
          {/* </div> */}
        </Header>
        <div
          className="nav-bar"
          style={{
            position: "fixed",
            left: this.state.collapsed ? "82px" : "200px",
            top: "64px",
            right: 0,
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
            borderBottom: "1px solid #f6f6f6"
          }}
        >
          <Navigate {...this.props} />
        </div>
        <div
          style={{
            position: "fixed",
            left: this.state.collapsed ? "82px" : "200px",
            top: "106px",
            right: 0,
            background: "#FFF",
            overflow: "hidden",
            overflowY: "scroll",
            height: this.state.contentHeight,
            padding: "16px"
          }}
        >
          <ContentRoute menuConfig={this.state.menuConfig} />
        </div>
        {/* </Layout> */}
        <My visible={this.state.visible} handleCancel={this.handleCancel} userData={this.state.userData}/>
      </Layout>
    );
  }
}
