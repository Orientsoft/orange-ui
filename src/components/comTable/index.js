import React from 'react';
import { Table, Pagination } from 'antd';
import { getRowKey } from '../../utils/util';

export default class Home extends React.Component {
    render(){
        const { columns, dataSource, current, total, onChangePage } = this.props;
        console.log('total', total);
        return (<div style={{ marginTop: '16px' }}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey={getRowKey}
          size="small"
        />
        <div className='clearfix'>
        <Pagination
          current={current}
          total={total}
          // pageSize={2}
          onChange={onChangePage}
          style={{ float: 'right', marginTop: '16px' }}
        />
        </div>
        </div>)
    }
}