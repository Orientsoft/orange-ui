import React from "react";
import { Modal } from "antd";
import "./checkModal.scss";

export default class CheckModal extends React.Component {
  render() {
    const { visible, onCancel, selectRow } = this.props;
    return (
      <Modal
        visible={visible}
        title="认证审核"
        onCancel={onCancel}
        onOk={this.onOk}
        footer={false}
        width={1024}
      >
        <div className='check-modal'>
          <ul>
            <li className='item'>
              <div className='title'>公司名称:</div>
              <div className='value'>{selectRow.name}</div>
            </li>
            <li className='item'>
              <div className='title'>组织机构代码:</div>
              <div className='value'>{selectRow.idcard}</div>
            </li>

            <li className='item'>
              <div className='title'>营业执照:</div>
              <div className='value'><img style={{ height: '400px' }} alt="" src={selectRow.doc && selectRow.doc[0]}/></div>
            </li>
            <li className='item'>
              <div className='title'>授权书:</div>
              <div className='value'><img style={{ height: '400px' }} alt="" src={selectRow.doc && selectRow.doc[1]}/></div>
            </li>
          </ul>
          </div>
      </Modal>
    );
  }
}
