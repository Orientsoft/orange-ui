import React from "react";
import { Button, Popconfirm, message, Tag } from "antd";
import ComTable from "../../../components/comTable";
import FormModal from "../../../components/formModal";
import PreviewModal from "../../../components/previewModal";
import {
  getProductList,
  deleteProduct,
  addProduct,
  editProduct,
  getAllHospital,
  getLabelList
} from "./service";

export default class Product extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      initKeys: ['logo', 'pic'],
      formCfg: [
        {
          label: "产品名字",
          key: "name",
          rules: [{ required: true, message: "请输入产品名字!" }],
          type: "input"
        },
        {
          label: "产品简介1",
          key: "desc_1",
          rules: [{ required: true, message: "请输入产品简介1!" }],
          type: "input"
        },
        {
          label: "产品简介2",
          key: "desc_2",
          rules: [{ required: true, message: "请输入产品简介2!" }],
          type: "input"
        },
        {
          label: "原价",
          key: "price",
          rules: [{ required: true, message: "请输入原价!" }],
          type: "input"
        },
        {
          label: "现价",
          key: "sale",
          rules: [{ required: true, message: "请输入现价!" }],
          type: "input"
        },
        {
          label: "销售量",
          key: "volume",
          rules: [{ required: true, message: "请输入销售量!" }],
          type: "input"
        },
        {
          label: "咨询电话",
          key: "phone",
          rules: [{ required: true, message: "请输入咨询电话!" }],
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
          label: "支持医院",
          key: "support",
          rules: [{ required: true, message: "请选择支持医院!" }],
          type: "multipleSelect",
          selectOptions: []
        },
        {
          label: "产品LOGO",
          key: "logo",
          rules: [{ required: true, message: "请输入公司名称!" }],
          type: "upload"
        },
        {
          label: "产品大图",
          key: "pic",
          rules: [{ required: true, message: "请输入公司名称!" }],
          type: "upload"
        }
      ],
      initData: {}
    };
  }
  componentDidMount() {
    this.getPageData();
    getAllHospital()
      .then(res => {
        if (res.status === 1) {
          const tmp = this.state.formCfg.map(v => {
            if (v.key === "support") {
              const selectOptions = res.data.map(value => ({
                value: value.id,
                text: value.name
              }));
              return { ...v, selectOptions };
            }
            return v;
          });
          this.setState({ formCfg: tmp });
        }
      })
      .catch(e => {
        console.log(e);
      });
    getLabelList()
      .then(res => {
        if (res.status === 1) {
          const tmp = this.state.formCfg.map(v => {
            if (v.key === "tag") {
              const selectOptions = res.data.map(value => ({
                value: value.name,
                text: value.name
              }));
              return { ...v, selectOptions };
            }
            return v;
          });
          this.setState({ formCfg: tmp });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  getPageData = () => {
    getProductList(this.state.current)
      .then(res => {
        if (res.status === 1) {
          this.setState({ dataSource: res.data, total: res.total });
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
  openAdd = () => {
    this.setState({
      visible: true,
      mode: "add",
      initData: {}
    });
  };
  openEdit = record => () => {
    const tmp = { ...record };
    tmp.support = record.support.map(v => v.id);
    this.setState({
      visible: true,
      mode: "edit",
      initData: tmp,
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
      initData: {},
      mode: ""
    });
  };
  onSubmit = v => {
    console.log("v", v);
    if (this.state.mode === "add") {
      this.addHandle(v);
      return;
    }
    this.editHandle(v);
  };
  addHandle = v => {
    addProduct(v)
      .then(res => {
        if (res.status === 1) {
          this.onCancel();
          this.getPageData();
          return;
        }
        message.error("添加失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  editHandle = v => {
    editProduct(this.state.initData.id, v)
      .then(res => {
        if (res.status === 1) {
          this.onCancel();
          this.getPageData();
          return;
        }
        message.error("修改失败");
      })
      .catch(e => {
        console.log(e);
      });
  };
  onDelete = id => () => {
    deleteProduct(id)
      .then(res => {
        if (res.status === 1) {
          this.getPageData();
          return;
        }
        message.error("删除失败");
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
  renderSupport = v => {
    if (!v) {
      return null;
    }
    return (
      <div style={{ marginTop: "8px" }} >
        {v.map(value => {
          return (
            <div key={value.name} style={{ paddingLeft: "8px", marginBottom: "8px" }}>
              <Tag color="#108ee9">{value.name}</Tag>
            </div>
          );
        })}
      </div>
    );
  };
  renderTag = v => {
    if (!v) {
      return null;
    }
    return (
      <div style={{ marginTop: "8px" }}>
        {v.map(value => {
          return (
            <div key={value} style={{ paddingLeft: "8px", marginBottom: "8px" }}>
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
        title: "名字",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "产品LOGO",
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
        title: "产品大图",
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
        title: "支持医院",
        dataIndex: "support",
        key: "support",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.map(value => value.name).join("、");
        }
        // render: v => {
        //   return (
        //     <Tooltip title={this.renderSupport(v)} placement="bottom">
        //       <span className="canClick">详情</span>
        //     </Tooltip>
        //   );
        // }
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
          return v.join("、");
        }
        // render: v => {
        //   return (
        //     <Tooltip title={this.renderTag(v)} placement="bottom">
        //       <span className="canClick">详情</span>
        //     </Tooltip>
        //   );
        // }
      },
      {
        title: "原价",
        dataIndex: "price",
        key: "price",
        align: "center"
      },
      {
        title: "现价",
        dataIndex: "sale",
        key: "sale",
        align: "center"
      },
      {
        title: "销售量",
        dataIndex: "volume",
        key: "volume",
        align: "center"
      },
      {
        title: "描述1",
        dataIndex: "desc_1",
        key: "desc_1",
        align: "center"
      },
      {
        title: "描述2",
        dataIndex: "desc_2",
        key: "desc_2",
        align: "center"
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
              <Button
                type="primary"
                style={{ marginRight: "16px" }}
                onClick={this.openEdit(record)}
              >
                修改
              </Button>
              <Popconfirm title="确定删除？" onConfirm={this.onDelete(record.id)}>
                <Button type="danger">
                  删除
                </Button>
              </Popconfirm>
            </span>
          );
        }
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.openAdd}>
          添加
        </Button>
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
        />
        <PreviewModal
          previewVisible={this.state.previewVisible}
          previewImage={this.state.previewImage}
          handleCancel={this.previewHandleCancel}
        />
      </div>
    );
  }
}
