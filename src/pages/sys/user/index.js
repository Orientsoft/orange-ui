import React from "react";
import { Table, Pagination } from "antd";
import { getRowKey } from "../../../utils/util";
import { getUserList } from "./service";

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
      current: 1,
      total: 0,
      dataSource: []
    };
  }

  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getUserList(this.state.current)
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
    this.setState({
      current: page,
    }, () => {
      this.getPageData();
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
          return v.map(value => roleCfg[value]).join('、')
        }
      },
      {
        title: "管理医院",
        dataIndex: "admin",
        key: "admin",
        align: "center",
        render: v => {
          return v ? v.join('、') : '';
        }
      },
      {
        title: "收费医院",
        dataIndex: "toolman",
        key: "toolman",
        align: "center",
        render: v => {
          return v ? v.join('、') : '';
        }
      },
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
        <div className="clearfix">
          <Pagination
            current={this.state.current}
            total={this.state.total}
            onChange={this.onChangePage}
            style={{ float: "right", marginTop: "16px" }}
          />
        </div>
      </div>
    );
  }
}
