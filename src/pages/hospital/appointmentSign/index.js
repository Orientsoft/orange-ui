import React from "react";
import ComTable from "../../../components/comTable";
import { getAppointList } from './service';
import { renderTime } from '../../../utils/util';

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getAppointList(this.state.current)
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

  render() {
    const columns = [
      {
        title: "名字",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
        align: "center"
      },
      {
        title: "其他说明",
        dataIndex: "remark",
        key: "remark",
        align: "center"
      },
      {
        title: "预约时间",
        dataIndex: "orderAt",
        key: "orderAt",
        align: "center",
        render: renderTime,
      },
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

      </div>
    );
  }
}
