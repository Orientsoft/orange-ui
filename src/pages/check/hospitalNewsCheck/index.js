import React from "react";
import { Button, message } from "antd";
import ComTable from "../../../components/comTable";
import RejectModal from '../../../components/rejectModal';
import PreviewModal from "../../../components/previewModal";
import { getCheckNewsList, checkNews, getNewsInfo } from './service';

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      renderMode: '',
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      selectRow: {},
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getCheckNewsList(this.state.current)
      .then(res => {
        if (res.status === 1) {
          const dataSource = res.data.map(v => {
            if(v.operation){
              return { ...v, ...v.operation };
            }
            return v;
          });
          this.setState({ dataSource, total: res.total });
          return;
        }
        this.setState({ dataSource: [] });
      })
      .catch(e => {
        console.log(e);
      });
  };
  onChangePage = page => {
    this.setState({
      current: page,
    }, () => {
      this.getPageData();
    });
  };
  showRejectModal = (record) => () => {
    this.setState({ visible: true, selectRow: record });
  }
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onPassCheck = (id) => () => {
    checkNews({ id, status: 1, reason: '' })
    .then(res => {
      if (res.status === 1) {
        message.success('操作成功');
        this.getPageData();
        return;
      }
      message.error('操作失败');
    })
    .catch(e => {
      console.log(e);
    });
  }
  handleOk = (reason) => {
    checkNews({ id: this.state.selectRow.id, status: 0, reason })
    .then(res => {
      if (res.status === 1) {
        message.success('操作成功');
        this.onCancel();
        this.getPageData();
        return;
      }
      message.error('操作失败');
    })
    .catch(e => {
      console.log(e);
    });
  }
  showPreview = (url, renderMode) => () => {
    this.setState({ previewVisible: true, previewImage: url, renderMode });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  showContentPreview = (id, draft) => () => {
    this.setState({ previewVisible: true, renderMode: draft, });
    getNewsInfo(id)
    .then((res) => {
      if(res.status === 1){
        let previewImage = res.data.content;
        if(res.data.operation && res.data.operation.content){
          previewImage = res.data.operation.content;
        }
        this.setState({
          previewVisible: true,
          previewImage,
          renderMode: draft,
        });
        return;
      }
      this.setState({
        previewVisible: true,
        previewImage: '',
        renderMode: draft,
      });
    })
    .catch((e) => {
      console.log(e);
    })
  }
  render() {
    const columns = [
      {
        title: "医院",
        dataIndex: "hosp",
        key: "hosp",
        align: "center",
        render: (v) => {
          return v ? v.name : '';
        }
      },
      {
        title: "新闻标题",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "标签",
        dataIndex: "tag",
        key: "tag",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.join("、");
        }
      },
      {
        title: "简介",
        dataIndex: "desc",
        key: "desc",
        align: "center"
      },
      {
        title: "图片",
        dataIndex: "pic",
        key: "pic",
        align: "center",
        render: text => {
          return (
            <img
              onClick={this.showPreview(text)}
              src={text}
              alt=""
              style={{ height: "20px" }}
              className="canClick"
            />
          );
        }
      },
      {
        title: "新闻内容",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: (t, record) => {
          return (
            <span className="canClick" onClick={this.showContentPreview(record.id, 'draft')}>详情</span>
          );
        }
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 200,
        render: (v, record) => {
          return (
            <span>
              <Button type='primary' style={{ marginRight: '16px' }} onClick={this.onPassCheck(record.id)}>通过</Button>
              <Button type='danger' onClick={this.showRejectModal(record)}>驳回</Button>
            </span>
          );
        }
      }
    ];
    return (
      <div>
        <ComTable
          current={this.state.current}
          total={this.state.total}
          columns={columns}
          dataSource={this.state.dataSource}
          onChangePage={this.onChangePage}
        />
        <RejectModal
         title="请填写驳回原因"
        visible={this.state.visible}
        onCancel={this.onCancel}
        handleOk={this.handleOk} 
        />
                        <PreviewModal
          previewVisible={this.state.previewVisible}
          previewImage={this.state.previewImage}
          handleCancel={this.previewHandleCancel}
          renderMode={this.state.renderMode}
        />
      </div>
    );
  }
}
