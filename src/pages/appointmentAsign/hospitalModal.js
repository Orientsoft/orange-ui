import React from "react";
import { Modal, Table, message } from "antd";
import { getRowKey } from "../../utils/util";
import { getHospitalList } from './service';

const columns = [
  {
    title: "医院名",
    dataIndex: "name",
    key: "name",
    align: "center"
  }
];

export default class HospitalModal extends React.Component {
  static defaultProps = {
    handleOk: () => {

    }
  }
  state = {
    current: 1,
    total: 0,
    selectedRowKeys: [],
  };
  componentDidUpdate(preProps){
    if (this.props.visible !== preProps.visible && !preProps.visible) {
      this.setState({
        selectedRowKeys: [],
      });
      this.getPageData();
    }
  }
  getPageData = () => {
    getHospitalList(this.state.current)
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
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleOk = () => {
    if(this.state.selectedRowKeys.length === 0){
      message.error('请选择医院');
      return;
    }
    console.log(this.state.selectedRowKeys[0]);
    this.props.handleOk(this.state.selectedRowKeys[0]);
  }
  render() {
    const rowSelection = {
        type: 'radio',
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: this.onSelectChange,
    };
    return (
      <Modal
        title="请选择医院进行指派"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
      >
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={false}
          rowKey={getRowKey}
          size="small"
          rowSelection={rowSelection}
        />
        {/* <div className="clearfix">
          <Pagination
            current={this.state.current}
            total={this.state.total}
            onChange={this.onChangePage}
            style={{ float: "right", marginTop: "16px" }}
          />
        </div> */}
      </Modal>
    );
  }
}
