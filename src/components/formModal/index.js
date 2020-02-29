import 'braft-editor/dist/index.css'
import React from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Icon,
  Cascader,
  TimePicker,
  message,
  TreeSelect,
  Button,
  Popconfirm,
} from "antd";
import BraftEditor from 'braft-editor'
import { beforeUpload } from "../../utils/util";
import { baseUrl } from "../../config/http";
import store from '../../store/store';

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

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const fieldNamesCfg = { label: "label", value: "value", children: "children" };
// const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ];

export default Form.create({ name: "form_modal" })(
  class FormModal extends React.Component {
    static defaultProps = {
      initKeys: [],
    }
    state = {
      otherValues: {}
    };
    componentDidUpdate(preProps) {
      if (this.props.visible !== preProps.visible && !preProps.visible) {
        const tmp = {};
        const { initKeys } = this.props;
        for( let i = 0; i < initKeys.length; i += 1){
          tmp[initKeys[i]] = this.props.initData[initKeys[i]];
        }
        this.setState({ otherValues: { 
          latitude: this.props.initData.latitude,
          longitude: this.props.initData.longitude,
          pic: this.props.initData.pic,
          ...tmp,
        } });
        this.mapInit2();
      }
    }
    mapInit2 = () => {
      setTimeout(() => {
        const mapNode = document.getElementById("map-containerpoi");
        if (!mapNode) {
          console.log("not find");
          return;
        }
        // eslint-disable-next-line
        var map = new AMap.Map('map-containerpoi', {
          zoom: 10
        });
        // eslint-disable-next-line
        AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) => {

          var poiPicker = new PoiPicker({
              //city:'北京',
              input: 'pickerInput1'
          });
  
          //初始化poiPicker
           // eslint-disable-next-line
          var marker = new AMap.Marker();
          poiPicker.on('poiPicked', (poiResult) => {
            console.log(poiResult.item.location);
            marker.setMap(map);
            marker.setPosition(poiResult.item.location);
            // const name = poiResult.item.name;
            this.setState({
              otherValues: {
                ...this.state.otherValues,
                longitude: poiResult.item.location.lng,
                latitude: poiResult.item.location.lat,
                // address: name
              }
            });
          })
        });
      });
    }
    handleChange = key => info => {
      console.log("info", info);
      if (info.file.status === "done") {
        if (info.file.response.status === 1) {
          message.success("上传成功");
          this.setState({
            otherValues: {
              ...this.state.otherValues,
              [key]: info.file.response.data[0]
            }
          });
        } else {
          message.error("上传失败");
        }
      }
      if (info.file.status === "error ") {
        message.error("上传失败");
      }
    };

    onCreate = () => {
      const { form } = this.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log(values, this.state.otherValues);
        console.log(this.state.otherValues);
        this.props.onSubmit({ ...values, ...this.state.otherValues });
      });
    };
    onChange = e => {
      this.value = e.target.value;
    };
    addLabel = (key) => ()=> {
      if (!this.value) {
        message.error("请输入内容");
        return;
      }
  
      const tmp = this.state.otherValues[key] ? this.state.otherValues[key].slice() : [];
      tmp.push(this.value);
      this.setState({
        otherValues: {
          ...this.state.otherValues,
          [key]: tmp,
        },
      });
    }
    confirm = (content, key) => () => {
      // const 
      const tmp = this.state.otherValues[key].filter(v => v !== content);
      this.setState({
        otherValues: {
          ...this.state.otherValues,
          [key]: tmp,
        },
      });
    }
    renderFormItem = value => {
      const { appStatus } = store.getState();
      const { getFieldDecorator } = this.props.form;
      switch (value.type) {
        case "timePicker":
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(<TimePicker format="HH:mm" />)}
            </Form.Item>
          );
        case "input":
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(<Input />)}
            </Form.Item>
          );
        case "treeSelect":
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(
                <TreeSelect
                  treeData={value.selectOptions}
                  placeholder="请选择"
                  allowClear
                />
              )}
            </Form.Item>
          );
        case "select":
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(
                <Select placeholder="请选择">
                  {value.selectOptions.map(selectOption => (
                    <Option key={selectOption.value} value={selectOption.value}>
                      {selectOption.text}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          );
        case "cascader": {
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(
                <Cascader
                  fieldNames={value.fieldNames || fieldNamesCfg}
                  options={value.selectOptions}
                  placeholder="请选择"
                />
              )}
            </Form.Item>
          );
        }
        case "upload": {
          return (
            <Form.Item required key={value.key} label={value.label}>
              <Upload
                className="avatar-uploader"
                action={`${baseUrl}/upload`}
                onChange={this.handleChange(value.key)}
                headers={{ AccessToken: appStatus.token, }}
                showUploadList={false}
                beforeUpload={beforeUpload}
                listType="picture-card"
              >
                {this.state.otherValues[value.key] ? <img
                alt=""
                src={this.state.otherValues[value.key]}
                style={{  width: '100%' }}
              /> : uploadButton}
              </Upload>
            </Form.Item>
          );
        }
        case "multipleSelect":
          return (
            <Form.Item key={value.key} label={value.label}>
              {getFieldDecorator(value.key, {
                rules: value.rules,
                initialValue: this.props.initData[value.key]
              })(
                <Select mode="multiple" placeholder="请选择">
                  {value.selectOptions.map(selectOption => (
                    <Option key={selectOption.value} value={selectOption.value}>
                      {selectOption.text}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          );

            case "longitudelatitudepoi":
              return (
                <div key="longitudelatitudepoi" style={{ marginTop: '16px', marginBottom: '16px', }}>
                  <Form.Item label="经纬度">
                    {this.state.otherValues.longitude} ,
                    {this.state.otherValues.latitude}
                  </Form.Item>
                  {/* {this.state.otherValues.address && (
                    <Form.Item label="地址">
                      {this.state.otherValues.address}
                    </Form.Item>
                  )} */}
                  <div id="map-containerpoi"></div>
                  <div id="pickerBox">
                      <input id="pickerInput1" placeholder="输入关键字选取地点" />
                  </div>
                </div>
              );
              case "braftEditor": 
              return (
                <Form.Item  key={value.key} label={value.label}>
                {getFieldDecorator(value.key, {
                  initialValue: BraftEditor.createEditorState(this.props.initData[value.key]),
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                      if (value.isEmpty()) {
                        callback('请输入正文内容')
                      } else {
                        callback()
                      }
                    }
                  }],
                })(
                  <BraftEditor
                    className="my-editor"
                    // controls={controls}
                    placeholder="请输入正文内容"
                  />
                )}
              </Form.Item>
              )
        case "tagInput": {
          const tmp = this.state.otherValues[value.key] || [];
          return (
            <Form.Item  required key={value.key} label={value.label}>
              <Input onChange={this.onChange} style={{ width: '200px', marginRight: '16px' }}/><Button onClick={this.addLabel(value.key)} type='primary'>添加</Button>
              
              <div style={{ marginTop: '8px' }}>{tmp.map(v => (
                          <Popconfirm
                          key={v}
                          title="确定删除?"
                          onConfirm={this.confirm(v, value.key)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button type="primary" style={{ marginRight: "8px" }}>
                            {v}
                            <Icon type="close-circle" />
                          </Button>
                        </Popconfirm>
              ))}</div>
            </Form.Item>
          );
        }
        case "default":
          return (
            <Form.Item key={value.key} label={value.label}>
              {value.defaultValue}
            </Form.Item>
          );
        default:
      }
    };
    render() {
      const { visible, onCancel, title, formCfg, width } = this.props;
      return (
        <Modal
          visible={visible}
          title={title}
          onCancel={onCancel}
          onOk={this.onCreate}
          width={width}
        >
          {visible && (
            <Form {...formItemLayout} layout="vertical">
              {formCfg.map(this.renderFormItem)}
            </Form>
          )}
        </Modal>
      );
    }
  }
);
