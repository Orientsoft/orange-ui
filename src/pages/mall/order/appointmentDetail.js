import React from "react";
import { Modal  } from "antd";
import "./index.scss";
import { renderTime } from '../../../utils/util';

export default class CheckModal extends React.Component {
  render() {
    const { visible, onCancel, detailData } = this.props;
    return (
      <Modal
        visible={visible}
        title="订单预约详情"
        onCancel={onCancel}
        footer={false}
        width={1024}
      >
        <div className='appointment-detail'>
          <ul>
            <li className='item'>
              <div className='title'>预约人:</div>
              <div className='value'>{detailData.name}</div>
            </li>
            <li className='item'>
              <div className='title'>预约时间:</div>
              <div className='value'>{renderTime(detailData.orderAt)}</div>
            </li>
            <li className='item'>
              <div className='title'>电话:</div>
              <div className='value'>{detailData.phone}</div>
            </li>
            
            <li className='item'>
              <div className='title'>医院:</div>
              <div className='value'>{detailData.hospitalName}</div>
            </li>
            <li className='item'>
              <div className='title'>详细地址:</div>
              <div className='value'>{detailData.address}</div>
            </li>
            <li className='item'>
              <div className='title'>备注:</div>
              <div className='value'>{detailData.remark}</div>
            </li>
          </ul>
          </div>
      </Modal>
    );
  }
}
