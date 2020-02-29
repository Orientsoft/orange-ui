import React from "react";
import { Button, Divider, Popconfirm, message } from "antd";
import FormModal from "../../../components/formModal";
import "./advManage.scss";
import { getAdvList, addAdv, deleteAdv, editAdv } from "./service";

export default class Home extends React.Component {
  state = {
    visible: false,
    data: [],
    initData: {},
    formCfg: [
      {
        label: "跳转url",
        key: "content",
        rules: [{ required: true, message: "请输入跳转url!" }],
        type: "input"
      },
      {
        label: "广告图片",
        key: "pic",
        rules: [{ required: true, message: "请输入公司名称!" }],
        type: "upload"
      }
    ]
  };
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getAdvList(this.props.activeKey)
      .then(res => {
        if (res.status === 1) {
          this.setState({ data: res.data });
          return;
        }
        this.setState({ data: [] });
      })
      .catch(e => {
        console.log(e);
      });
  };
  showModal = () => {
    this.setState({
      visible: true,
      mode: "add",
      initData: {},
    });
  };
  showEdit = (row) => () => {
    this.setState({
      visible: true,
      mode: "edit",
      initData: row,
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
      mode: "",
      initData: {},
    });
  };
  editHandle = (value) => {
    editAdv(this.state.initData.id, value)
    .then((res) => {
      if(res.status === 1){
        this.onCancel();
        this.getPageData();
        return;
      }
      message.error('修改失败');
    })
    .catch((e) => {
      console.log(e);
    });
  }
  addHandle = (value) => {
    addAdv({
      ...value,
      location: this.props.activeKey,
      type: 'url',
    })
    .then((res) => {
      if(res.status === 1){
        this.onCancel();
        this.getPageData();
        return;
      }
      message.error('添加失败');
    })
    .catch((e) => {
      console.log(e);
    });
  }
  onSubmit = (value) => {
    console.log(value);
    if(!value.pic){
      message.error('请上传图片');
      return;
    }
    if(this.state.mode === 'add'){
      this.addHandle(value);
      return;
    }
    this.editHandle(value);
  };
  onConfirm = (id) => () => {
    deleteAdv(id)
    .then((res) => {
      if(res.status === 1){
        const data = this.state.data.filter(v => v.id !== id);
        this.setState({ data });
        return;
      }
      message.error('删除失败');
    })
    .catch((e) => {
      console.log(e);
    });
  }
  render() {
    return (
      <div className="adv-manage">
        <Button onClick={this.showModal} type="primary" >
          添加
        </Button>
        <Divider />
        {this.state.data.map(v => (
          <div className="adv-box" key={v.id}>
            <div className={`img-box ${this.props.vertical ? "wel" : "nor"}`}>
              <img src={v.pic} alt="" className={`${this.props.vertical ? "wel" : "nor"}`}/>
              <div className="action">
                <Button
                  type="primary"
                  style={{ background: "#48CBC7", marginRight: "8px" }}
                  onClick={this.showEdit(v)}
                >
                  编辑
                </Button>
                <Popconfirm title="确定删除?" okText="是" cancelText="否" onConfirm={this.onConfirm(v.id)}>
                  <Button type="danger" style={{ marginTop: "8px" }}>
                    删除
                  </Button>
                </Popconfirm>
              </div>
            </div>
            <div className="jump">
              跳转链接:<span><a href={v.content} target="_blank" rel="noopener noreferrer">详情</a></span>
            </div>
            <Divider />
          </div>
        ))}

        <FormModal
          title={this.state.mode === "add" ? "添加" : "修改"}
          visible={this.state.visible}
          formCfg={this.state.formCfg}
          initData={this.state.initData}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
