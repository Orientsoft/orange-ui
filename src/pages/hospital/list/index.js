import React from "react";
import { Button, message, Tag } from "antd";
import ComTable from "../../../components/comTable";
import FormModal from "../../../components/formModal";
import PreviewModal from "../../../components/previewModal";
import ToolmanModal from './toolmanModal';
import { getHospitalList, editHospital, getLabelList } from "./service";

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      toolmanVisible: false,
      selectRow: {},
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 1,
      dataSource: [],
      formCfg: [],
      formCfg1: [
        {
          label: "医院名称",
          key: "name",
          rules: [{ required: true, message: "请输入医院名称!" }],
          type: "input"
        },
        {
          label: "标签",
          key: "tag",
          rules: [{ required: true, message: "请选择标签!" }],
          type: "multipleSelect",
          selectOptions: []
        },
        {
          label: "经纬度",
          key: "longitudelatitudepoi",
          rules: [
            { required: true, message: "请输入编号!" },
            { pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/, message: "请输入数字" }
          ],
          type: "longitudelatitudepoi"
        },
        {
          label: "具体地址",
          key: "address",
          rules: [{ required: true, message: "请输入具体地址!" }],
          type: "input"
        }
      ],
      formCfg2: [
        {
          label: "医院简介",
          key: "content",
          rules: [{ required: true, message: "请输入医院简介!" }],
          type: "braftEditor"
        },
      ],
      initData: {},
      initKeys: ["logo", "pic", "department"]
    };
  }
  componentDidMount() {
    this.getLabels();
    this.getPageData();
  }
  getLabels = () => {
    getLabelList()
      .then(res => {
        if (res.status === 1) {
          const selectOptions = res.data.map(v => ({
            value: v.name,
            text: v.name
          }));
          this.setState({
            formCfg1: [
              {
                label: "医院名称",
                key: "name",
                rules: [{ required: true, message: "请输入医院名称!" }],
                type: "input"
              },

              {
                label: "联系电话",
                key: "phone",
                rules: [{ required: true, message: "请输入联系电话!" }],
                type: "input"
              },
              {
                label: "特色科室",
                key: "department",
                rules: [{ required: true, message: "请输入特色科室!" }],
                type: "tagInput"
              },
              {
                label: "医院LOGO",
                key: "logo",
                rules: [{ required: true, message: "请输入公司名称!" }],
                type: "upload"
              },
              {
                label: "医院大图",
                key: "pic",
                rules: [{ required: true, message: "请输入公司名称!" }],
                type: "upload"
              },
              {
                label: "标签",
                key: "tag",
                rules: [{ required: true, message: "请选择标签!" }],
                type: "multipleSelect",
                selectOptions
              },
              {
                label: "经纬度",
                key: "longitudelatitudepoi",
                rules: [
                  { required: true, message: "请输入编号!" },
                  {
                    pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                    message: "请输入数字"
                  }
                ],
                type: "longitudelatitudepoi"
              },
              {
                label: "具体地址",
                key: "address",
                rules: [{ required: true, message: "请输入具体地址!" }],
                type: "input"
              }
            ]
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  getPageData = () => {
    getHospitalList(this.state.current)
      .then(res => {
        if (res.status === 1) {
          const dataSource = res.data.map(v => {
            if(v.operation){
              return { ...v, ...v.operation }
            }
            return v;
          });
          this.setState({ dataSource });
          return;
        }
        this.setState({ dataSource: [] });
      })
      .catch(e => {
        console.log(e);
      });
  };
  onChangePage = page => {
    this.setState(
      {
        current: page
      },
      () => {
        this.getPageData();
      }
    );
  };
  openEdit = record => () => {
    this.setState({
      visible: true,
      mode: "edit",
      initData: record,
      formCfg: this.state.formCfg1,
      width: 520,
    });
  };
  openToolmanModal = () => {
    this.setState({
      toolmanVisible: true,
    });
  }
  toolmanHandleCancel = () => {
    this.setState({
      toolmanVisible: false,
    });
  }
  onCancel = () => {
    this.setState({
      visible: false,
      initData: {},
      mode: ""
    });
  };
  onSubmit = v => {
    console.log("v", v);
    if (!v.department){
      message.error('请添加特色科室');
      return;
    }
    if (v.department.length === 0) {
      message.error('请添加特色科室');
      return;
    }
    const tmp = { ...v };
    if(v.content){
      tmp.content = v.content.toHTML();
    }
    editHospital(this.state.initData.id, tmp)
      .then(res => {
        if (res.status === 1) {
          this.onCancel();
          setTimeout(() => {
            message.success("提交成功, 请等待审核");
          }, 2000);
          this.getPageData();
          return;
        }
        message.error("修改失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  showPreview = url => () => {
    this.setState({ previewVisible: true, previewImage: url });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  showContent = (record) => () => {
    this.setState({
      visible: true,
      mode: "edit",
      initData: record,
      formCfg: this.state.formCfg2,
      width: 1024,
    });
  }
  renderTag = v => {
    if (!v) {
      return null;
    }
    return (
      <div style={{ marginTop: "8px" }}>
        {v.map(value => {
          return (
            <div
              key={value}
              style={{ paddingLeft: "8px", marginBottom: "8px" }}
            >
              <Tag color="#108ee9">{value}</Tag>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const columns = [
      {
        title: "医院名称",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "医院简介",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: (v, record) => {
          return <div className='canClick' onClick={this.showContent(record)}>编辑</div>
        }
      },      
      {
        title: "特色科室",
        dataIndex: "department",
        key: "department",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.join('、');
        }
      },
      {
        title: "标签",
        dataIndex: "tag",
        key: "tag",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.join('、');
        }
      },
      {
        title: "联系电话",
        dataIndex: "phone",
        key: "phone",
        align: "center"
      },
      {
        title: "医院logo",
        dataIndex: "logo",
        key: "logo",
        align: "center",
        render: text => {
          return (
            <img
              onClick={this.showPreview(text)}
              src={text}
              alt=""
              style={{ height: "20px" }}
              className="canClick"
            />
          );
        }
      },
      {
        title: "医院大图",
        dataIndex: "pic",
        key: "pic",
        align: "center",
        render: text => {
          return (
            <img
              onClick={this.showPreview(text)}
              src={text}
              alt=""
              style={{ height: "20px" }}
              className="canClick"
            />
          );
        }
      },
      {
        title: "详细地址",
        dataIndex: "address",
        key: "address",
        align: "center"
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 220,
        render: (v, record) => {
          return (
            <span>
              <Button type="primary" onClick={this.openEdit(record)}>
                修改
              </Button>
              <Button style={{ marginLeft: '16px' }} type="primary" onClick={this.openToolmanModal}>
                添加收费员
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
        <FormModal
          title={this.state.mode === "add" ? "添加" : "修改"}
          visible={this.state.visible}
          formCfg={this.state.formCfg}
          initData={this.state.initData}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          initKeys={this.state.initKeys}
          width={this.state.width}
        />
        <PreviewModal
          previewVisible={this.state.previewVisible}
          previewImage={this.state.previewImage}
          handleCancel={this.previewHandleCancel}
        />
        <ToolmanModal
            visible={this.state.toolmanVisible}
            onCancel={this.toolmanHandleCancel}
        />
      </div>
    );
  }
}
