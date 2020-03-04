import React from "react";
import { Button, message, Tag } from "antd";
import ComTable from "../../../components/comTable";
import RejectModal from "../../../components/rejectModal";
import PreviewModal from "../../../components/previewModal";
import { getCheckHospitalList, passCheck, rejectCheck, getHospitalInfo } from "./service";

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      renderMode: ""
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getCheckHospitalList(this.state.current)
      .then(res => {
        if (res.status === 1) {
          const dataSource = res.data.map(v => {
            if (v.operation) {
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
    this.setState(
      {
        current: page
      },
      () => {
        this.getPageData();
      }
    );
  };
  showRejectModal = record => () => {
    this.setState({ visible: true, selectRow: record });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleOk = v => {
    console.log("v", v);
    rejectCheck({ id: this.state.selectRow.id, status: 0, reason: v })
      .then(res => {
        if (res.status === 1) {
          message.success("操作成功");
          this.onCancel();
          this.getPageData();
          return;
        }
        message.error("操作失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  onPassCheck = id => () => {
    passCheck({ id, status: 1, reason: "" })
      .then(res => {
        if (res.status === 1) {
          message.success("操作成功");
          this.getPageData();
          return;
        }
        message.error("操作失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  showContentPreview = (id, draft) => () => {
    this.setState({
      previewVisible: true,
      renderMode: draft,
    });
    getHospitalInfo(id)
    .then((res) => {
      if(res.status === 1){
        let previewImage = res.data.content;
        if(res.data.operation && res.data.operation.content){
          previewImage = res.data.operation.content;
        }
        console.log('previewImage', previewImage);
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
  showPreview = (url, draft) => () => {
    this.setState({
      previewVisible: true,
      previewImage: url,
      renderMode: draft
    });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  renderTag = v => {
    if (!v) {
      return null;
    }
    return (
      <div style={{ marginTop: "8px" }}>
        {v.map(value => {
          return (
            <div
              key={value}
              style={{ paddingLeft: "8px", marginBottom: "8px" }}
            >
              <Tag color="#108ee9">{value}</Tag>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const columns = [
      {
        title: "医院名称",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "医院简介",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: (text, record) => {
          return (
            <span
              className="canClick"
              onClick={this.showContentPreview(record.id, "draft")}
            >
              详情
            </span>
          );
        }
      },
      {
        title: "特色科室",
        dataIndex: "department",
        key: "department",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.join("、");
        }
      },
      {
        title: "联系电话",
        dataIndex: "phone",
        key: "phone",
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
        // render: v => {
        //   return this.renderTag(v);
        // }
        // render: v => {
        //   return (
        //     <Tooltip title={this.renderTag(v)} placement="bottom">
        //       <span className="canClick">详情</span>
        //     </Tooltip>
        //   );
        // }
      },
      {
        title: "医院logo",
        dataIndex: "logo",
        key: "logo",
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
        title: "医院大图",
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
        title: "详细地址",
        dataIndex: "address",
        key: "address",
        align: "center"
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
              <Button
                type="primary"
                style={{ marginRight: "16px" }}
                onClick={this.onPassCheck(record.id)}
              >
                通过
              </Button>
              <Button type="danger" onClick={this.showRejectModal(record)}>
                驳回
              </Button>
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
