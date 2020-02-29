import React from "react";
import { Form, Row, Col, Input, Cascader, Select, DatePicker, Button, TreeSelect } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

class QueryForm extends React.Component {
  renderQueryItem = value => {
    const { getFieldDecorator } = this.props.form;
    switch (value.type) {
      case "treeSelect":
        return (
          <Col key={value.key} span={6}>
            <Form.Item label={value.label} colon={false}>
              {getFieldDecorator(value.key, {
                initialValue: [],
                rules: []
              })(
                <TreeSelect
                  treeData={value.selectOptions}
                  placeholder="请选择"
                  allowClear
                />
              )}
            </Form.Item>
          </Col>
        );
      case "cascader":
        return (
          <Col key={value.key} span={6}>
            <Form.Item label={value.label} colon={false}>
              {getFieldDecorator(value.key, {
                initialValue: [],
                rules: []
              })(
                <Cascader options={value.selectOptions} placeholder="请选择" />
              )}
            </Form.Item>
          </Col>
        );
      case "input":
        return (
          <Col key={value.key} span={6}>
            <Form.Item label={value.label} colon={false}>
              {getFieldDecorator(value.key, {
                rules: []
              })(<Input placeholder={value.placeholder} />)}
            </Form.Item>
          </Col>
        );
      case "select":
        return (
          <Col key={value.key} span={6}>
            <Form.Item label={value.label} colon={false}>
              {getFieldDecorator(value.key, {
                rules: []
              })(
                <Select allowClear placeholder="请选择">
                  {value.selectOptions.map(selectOption => (
                    <Option key={selectOption.value}>
                      {selectOption.text}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        );
      case 'rangePicker':
        return (
          <Col key={value.key} span={6}>
            <Form.Item label={value.label} colon={false}>
              {getFieldDecorator(value.key, {
                initialValue: value.initialValue ? value.initialValue : [],
                rules: []
              })(
                <RangePicker style={{ width: '105%' }}/>
              )}
            </Form.Item>
          </Col>
        );
      case 'datePicker':
        return (
          <Col key={value.key} span={6} colon={false}>
            <Form.Item label={value.label}>
              {getFieldDecorator(value.key, {
                rules: []
              })(
                <DatePicker />
              )}
            </Form.Item>
          </Col>
        );
      default:
    }
  };
  onSearch = () => {
    const queryParams = this.props.form.getFieldsValue();
    console.log(queryParams);
    this.props.onSearch(queryParams);
  }
  render() {
    return (
      <Form {...formItemLayout}>
        <Row type="flex" gutter={24}>
          {this.props.queryFormConfig.map(this.renderQueryItem)}
          <Col key='query' span={6}>
            <Button
              onClick={this.onSearch}
              icon="search"
              style={{ marginLeft: "8px" }}
              htmlType="submit"
              type="primary"
            >
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "query_form" })(QueryForm);
