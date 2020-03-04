import React from "react";
import { Button, Popconfirm, message } from "antd";
import ComTable from "../../../components/comTable";
import PreviewModal from "../../../components/previewModal";
import FormModal from "../../../components/formModal";
import { getPlatformNewsList, addNews, editNews, deleteNews, getLabelList, getNewsInfo } from "../service";

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      renderMode: '',
      previewVisible: false,
      previewImage: "",
      mode: "",
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      formCfg: [
        {
          label: "标题",
          key: "name",
          rules: [{ required: true, message: "请输入标题!" }],
          type: "input"
        },
        {
          label: "简介",
          key: "desc",
          rules: [{ required: true, message: "请输入简介!" }],
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
          label: "图片",
          key: "pic",
          rules: [{ required: true, message: "请输入公司名称!" }],
          type: "upload"
        },
        {
          label: "新闻内容",
          key: "content",
          rules: [{ required: true, message: "请输入新闻内容!" }],
          type: "braftEditor"
        }
      ],
      initData: {}
    };
  }
  componentDidMount() {
    getLabelList('新闻')
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
    getPlatformNewsList(this.state.current)
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
  addHandle = v => {
    addNews({
      ...v, 
      content: v.content.toHTML(),
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
    editNews(this.state.initData.id, {
      ...v, 
      content: v.content.toHTML(),
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
  onSubmit = v => {
    console.log("v", v.content);
    if(!v.pic){
      message.error('请上传图片');
      return;
    }
    if (this.state.mode === "add") {
      this.addHandle(v);
      return;
    }
    this.editHandle(v);
  };
  onDelete = id => () => {
    deleteNews(id)
    .then((res) => {
      if(res.status === 1){
        const dataSource = this.state.dataSource.filter(v => v.id !== id);
        this.setState({ dataSource });
        return;
      }
      message.error(`删除失败:${res.message}`);
    })
    .catch((e) => {
      console.log(e);
    })
  };
  showPreview = (url, renderMode) => () => {
    this.setState({ previewVisible: true, previewImage: url, renderMode });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  showContentPreview = (id, draft) => () => {
    this.setState({ previewVisible: true, renderMode: draft, });
    getNewsInfo(id)
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
    const columns = [
      {
        title: "标题",
        dataIndex: "name",
        key: "name",
        align: "center"
      },

      {
        title: "新闻简介",
        dataIndex: "desc",
        key: "desc",
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
        title: "图片",
        dataIndex: "pic",
        key: "pic",
        align: "center",
        render: text => {
          return (
            <img
              onClick={this.showPreview(text, 'img')}
              src={text}
              alt=""
              style={{ height: "20px" }}
              className="canClick"
            />
          );
        }
      },
      {
        title: "新闻内容",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: (t, record) => {
          return (
            <span className="canClick" onClick={this.showContentPreview(record.id, 'draft')}>详情</span>
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
              <Popconfirm title="确定删除？">
                <Button type="danger" onClick={this.onDelete(record.id)}>
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
          width={1024}
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
