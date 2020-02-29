import React from "react";
import { Table, Pagination, Button, message } from "antd";
import CheckModal from "./checkModal";
import { getUnauthUserList, checkUnauthUser } from "./service";
import RejectModal from "../../../components/rejectModal";

import { getRowKey } from "../../../utils/util";

const roleCfg = {
  1: "普通用户",
  2: "医院管理员",
  3: "医院收费员",
  4: "超级管理员"
};

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      visible: false,
      authVisible: false,
      current: 1,
      total: 0,
      dataSource: [],
      selectRow: {}
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getUnauthUserList(this.state.current)
      .then(res => {
        if (res.status === 1) {
          this.setState({ dataSource: res.data, total: res.total });
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

  openCheckModal = record => () => {
    this.setState({ authVisible: true, selectRow: record });
  };
  onCancel = () => {
    this.setState({ visible: false, authVisible: false, selectRow: {} });
  };

  showRejectModal = (record) => () => {
    this.setState({ visible: true, selectRow: record });
  }

  handleOk = v => {
    console.log("v", v);
    checkUnauthUser(this.state.selectRow.id, { status: 0, reason: v })
      .then(res => {
        if (res.status === 1) {
          message.success("操作成功");
          this.setState({ visible: false, selectRow: {} });
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
    checkUnauthUser(id, { status: 1, reason: "" })
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

  render() {
    const columns = [
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
        align: "center"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        align: "center"
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
        align: "center",
        render: v => {
          return v.map(value => roleCfg[value]).join("、");
        }
      },
      {
        title: "认证信息",
        dataIndex: "authInfo",
        key: "authInfo",
        align: "center",
        width: 100,
        render: (v, record) => {
          return (
            <div className='canClick' onClick={this.openCheckModal(record)}>
              详情
            </div>
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
        },
      }
    ];
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={false}
          rowKey={getRowKey}
          size="small"
        />
        <Pagination
          current={this.state.current}
          total={this.state.total}
          onChange={this.onChangePage}
          style={{ float: "right" }}
        />
        <RejectModal
         title="请填写驳回原因"
          visible={this.state.visible}
          onCancel={this.onCancel}
          handleOk={this.handleOk}
        />
        <CheckModal
          visible={this.state.authVisible}
          onCancel={this.onCancel}
          selectRow={this.state.selectRow} 
        />
      </div>
    );
  }
}
