import React from "react";
import { Button, Popconfirm, message } from "antd";
import ComTable from "../../../components/comTable";
import FormModal from "../../../components/formModal";
import PreviewModal from "../../../components/previewModal";
import {
  getArticleList,
  deleteArticleList,
  addArticleList,
  editArticleList,
  getLabelList,
  getArticleInfo,
} from "../service";

const typeCfg = {
  class: "名师讲堂",
  diagnosis: "健康自诊",
  disease: "常见疾病",
  meal: "营养餐"
};

export default class CommonArticle extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      renderMode: "",
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      initKeys: ["logo", "skilled"],
      formCfg: [
        {
          label: "标题",
          key: "name",
          rules: [{ required: true, message: "请输入标题!" }],
          type: "input"
        },
        {
          label: "描述",
          key: "desc",
          rules: [{ required: true, message: "请输入描述!" }],
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
          label: "LOGO",
          key: "logo",
          rules: [{ required: true, message: "请上传LOGO!" }],
          type: "upload"
        },
        {
          label: "文章内容",
          key: "content",
          rules: [{ required: true, message: "请输入文章名称!" }],
          type: "braftEditor"
        }
      ],
      initData: {}
    };
  }
  componentDidMount() {
    getLabelList(typeCfg[this.props.type])
      .then(res => {
        if (res.status === 1) {
          const tmp = this.state.formCfg.map(v => ({ ...v }));
          tmp[2].selectOptions = res.data.map(v => ({
            value: v.name,
            text: v.name
          }));
          this.setState({ formCfg: tmp });
        }
      })
      .catch(e => {
        console.log(e);
      });
    this.getPageData();
  }
  getPageData = () => {
    getArticleList(this.props.type, this.state.current)
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
    this.setState({
      visible: true,
      mode: "edit",
      initData: record
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
    if (!v.logo) {
      message.error("请上传图片");
      return;
    }
    if(this.props.type === 'class'){
      if (!v.skilled){
        message.error('请添加擅长能力');
        return;
      }
      if (v.skilled.length === 0) {
        message.error('请添加擅长能力');
        return;
      }
    }
    if (this.state.mode === "add") {
      this.addHandle(v);
      return;
    }

    this.editHandle(v);
  };
  addHandle = v => {
    addArticleList(this.props.type, {
      ...v,
      content: v.content.toHTML()
    })
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
    editArticleList(this.props.type, this.state.initData.id, {
      ...v,
      content: v.content.toHTML()
    })
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
    deleteArticleList(this.props.type, id)
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
  showPreview = (url, renderMode) => () => {
    this.setState({ previewVisible: true, previewImage: url, renderMode });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  showContentPreview = (id, draft) => () => {
    this.setState({ previewVisible: true, renderMode: draft, });
    getArticleInfo(this.props.type, id)
    .then((res) => {
      if(res.status === 1){
        this.setState({
          previewVisible: true,
          previewImage: res.data.content,
          renderMode: draft,
        });
        return;
      }
      this.setState({
        previewVisible: true,
        previewImage: '',
        renderMode: draft,
      });
    })
    .catch((e) => {
      console.log(e);
    })
  }
  render() {
    const tmp = [
      {
        title: "标题",
        dataIndex: "name",
        key: "name",
        align: "center"
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
      },
      {
        title: "LOGO",
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
        title: "描述",
        dataIndex: "desc",
        key: "desc",
        align: "center"
      },
      {
        title: "文章内容",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: (text, record) => {
          return (
            <span
              className="canClick"
              onClick={this.showContentPreview(record.id, "draft")}
            >
              详情
            </span>
          );
        }
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
              <Popconfirm
                title="确定删除？"
                onConfirm={this.onDelete(record.id)}
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </span>
          );
        }
      }
    ];
    const extra = [
      {
        title: "医生",
        dataIndex: "doctor",
        key: "doctor",
        align: "center"
      },
      {
        title: "擅长能力",
        dataIndex: "skilled",
        key: "skilled",
        align: "center",
        render: v => {
          if (!v) {
            return null;
          }
          return v.join('、');
        }
      },
    ];
    const extraForm = [
      {
        label: "医生",
        key: "doctor",
        rules: [{ required: true, message: "请输入医生!" }],
        type: "input"
      },
      {
        label: "擅长能力",
        key: "skilled",
        rules: [{ required: true, message: "请添加擅长能力!" }],
        type: "tagInput"
      },
    ];
    let columns = tmp;
    let formCfg = this.state.formCfg;
    if(this.props.type === 'class'){
      columns = [...extra, ...tmp];
      formCfg = [...extraForm, ...this.state.formCfg];
    }
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
          formCfg={formCfg}
          initData={this.state.initData}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          width={1024}
          initKeys={this.state.initKeys}
        />
        <PreviewModal
          previewVisible={this.state.previewVisible}
          previewImage={this.state.previewImage}
          handleCancel={this.previewHandleCancel}
          renderMode={this.state.renderMode}
        />
      </div>
    );
  }
}
