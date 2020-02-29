import React from "react";
import { Button, message } from "antd";
import ComTable from "../../../components/comTable";
import { getAppointList, orderRegister, orderCase } from './service';
import { renderTime } from '../../../utils/util';
import RejectModal from '../../../components/rejectModal';

const statusCfg = {
  2: '待挂号',
  3: '待使用',
  4: '待评价',
  5: '完成',
}

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
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
    getAppointList(this.state.current)
    .then((res) => {
      if (res.status === 1) {
        const dataSource = res.data.map(v => {
          return {
            ...v,
            productName: v.product ? v.product.name : '',
            appointmentName: v.appointment ? v.appointment.name : '',
            appointmentPhone: v.appointment ? v.appointment.phone : '',
            appointmentOrderAt: v.appointment ? v.appointment.orderAt : '',
            appointmentRemark: v.appointment ? v.appointment.remark : '',
          };
        });
        this.setState({ dataSource, total: res.total });
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
  onOrderRegister = (id) => ()=> {
    orderRegister({ id })
    .then((res) => {
      if(res.status === 1){
        message.success('挂号成功');
        this.getPageData();
        return;
      }
      message.error(`挂号失败:${res.message}`);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  onCancel = () => {
    this.setState({ visible: false, selectRow: {} });
  }
  showCaseModal = (record) => () => {
    this.setState({ visible: true, selectRow: record });
  }
  handleOk = (v) => {
    orderCase({ id: this.state.selectRow.id, content: v })
    .then((res) => {
      if(res.status === 1){
        this.onCancel();
        this.getPageData();
        return;
      }
      message.error('提交失败');
    })
    .catch((e) => {
      console.log(e);
    });
  }
  render() {
    const columns = [
      {
        title: "产品",
        dataIndex: "productName",
        key: "productName",
        align: "center",
      },
      {
        title: "名字",
        dataIndex: "appointmentName",
        key: "appointmentName",
        align: "center",

      },
      {
        title: "电话",
        dataIndex: "appointmentPhone",
        key: "appointmentPhone",
        align: "center",
      },
      {
        title: "其他说明",
        dataIndex: "appointmentRemark",
        key: "appointmentRemark",
        align: "center"
      },
      {
        title: "预约时间",
        dataIndex: "appointmentOrderAt",
        key: "appointmentOrderAt",
        align: "center",
        render: renderTime,
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (v) => {
          return statusCfg[v]
        },
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
              <Button disabled={record.status === 3} type="primary" style={{ marginRight: "16px" }} onClick={this.onOrderRegister(record.id)}>
                挂号
              </Button>
              <Button type="primary" onClick={this.showCaseModal(record)}>
              填报病例
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
        title='请填写病例'
        visible={this.state.visible}
        onCancel={this.onCancel}
        handleOk={this.handleOk} 
        />
      </div>
    );
  }
}
