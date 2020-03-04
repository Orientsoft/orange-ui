import React from "react";
import { Button, message } from "antd";
import ComTable from "../../components/comTable";
import HospitalModal from "./hospitalModal";
import { getAppointAdminList, appointAsign } from './service';

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
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
    getAppointAdminList(this.state.current)
    .then((res) => {
      if (res.status === 1) {
        this.setState({ dataSource: res.data, total: res.total });
        return;
      }
      this.setState({ dataSource: [] });
    })
    .catch((e) => {
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

  showHospital = (row) => () => {
    this.setState({ visible: true, selectRow: row });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = (id) => {
    console.log('id', id);
    appointAsign(this.state.selectRow.id, { id })
    .then((res) => {
      if (res.status === 1) {
        message.success('指派成功');
        this.setState({ visible: false, selectRow: {} });
        this.getPageData();
        return;
      }
      message.error(`指派失败:${res.message}`);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  render() {
    const columns = [
      {
        title: "预约人",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "预约内容",
        dataIndex: "content",
        key: "content",
        align: "center"
      },
      // {
      //   title: "门店",
      //   dataIndex: "hospital",
      //   key: "hospital",
      //   align: "center"
      // },
      {
        title: "联系电话",
        dataIndex: "phone",
        key: "phone",
        align: "center"
      },
    
      {
        title: "提交时间",
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center"
      },
      {
        title: "其他说明",
        dataIndex: "remark",
        key: "remark",
        align: "center"
      },
      {
        title: "指派医院",
        dataIndex: "hospName",
        key: "hospName",
        align: "center",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (v, record) => {
          return record.hospId ? '已指派' : '未指派';
        }
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (v, record) => {
          return (
            <Button type="primary" onClick={this.showHospital(record)}>
              指派
            </Button>
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
        <HospitalModal visible={this.state.visible} onCancel={this.onCancel} handleOk={this.handleOk}/>
      </div>
    );
  }
}
