import React from "react";
import { Button, message } from "antd";
import ComTable from "../../../components/comTable";
import FormModal from "../../../components/formModal";
import PreviewModal from "../../../components/previewModal";
import { getHospitalNewsList, addNews, editNews, getHospitalList, getLabelList } from "../../article/service";

const statusCfg = {
  1: '通过',
  0: '驳回',
};

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
      total: 200,
      dataSource: [],
      formCfg: [
        {
          label: "医院",
          key: "hosp",
          rules: [{ required: true, message: "请选择医院!" }],
          type: "select",
          selectOptions: []
        },
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
          rules: [],
          type: "upload"
        },
        {
          label: "新闻内容",
          key: "content",
          rules: [{ required: true, message: "请输入新闻内容!" }],
          type: "braftEditor"
        },
      ],
      initData: {},
      hispitalList: [],
    };
  }
  componentDidMount() {
    this.getPageData();
    getHospitalList()
    .then((res) => {
      if(res.status === 1){
        const selectOptions = res.data.map(v => ({ value: v.id, text: v.name }));
        const tmp = this.state.formCfg.map(v => ({ ...v }));
        tmp[0].selectOptions = selectOptions;
        this.setState({ formCfg: tmp, hispitalList: res.data });
      }
    })
    .catch((e) => {
      console.log(e);
    });
    getLabelList('新闻')
    .then(res => {
      if (res.status === 1) {
        const tmp = this.state.formCfg.map(v => ({ ...v }));
        tmp[3].selectOptions = res.data.map(v => ({
          value: v.name,
          text: v.name
        }));
        this.setState({ formCfg: tmp });
      }
    })
    .catch(e => {
      console.log(e);
    });
  }
  getPageData = () => {
    getHospitalNewsList(this.state.current, this.state.hispitalList)
      .then(res => {
        if (res.status === 1) {
          const dataSource = res.data.map(v => {
            // 有修改内容时，只显示修改内容
            if(v.operation){
              return { ...v, ...v.operation }
            }
            // 审核失败，只显示审核信息
            if(v.last_operation){
              return { ...v, ...v.last_operation }
            }
            return v;
          });
          this.setState({ dataSource, total: res.total });
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
  openEdit = (record) => () => {
    this.setState({
        visible: true,
        mode: "edit",
        initData: record
      }); 
  }
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
      name: v.name,
      tag: v.tag,
      desc: v.desc,
      pic: v.pic,
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
  onDelete = (id) => () => {

  }
  showPreview = (url, renderMode) => () => {
    this.setState({ previewVisible: true, previewImage: url, renderMode });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
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
        align: "center",
        // width: 400,
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
        title: "新闻内容",
        dataIndex: "content",
        key: "content",
        align: "center",
        render: text => {
          return (
            <span className="canClick" onClick={this.showPreview(text, 'draft')}>详情</span>
          );
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (v, record) => {
          if (record.operation) {
            return '待审核';
          }
          return statusCfg[v] || '无';
        }
      },
      {
        title: "驳回原因",
        dataIndex: "reason",
        key: "reason",
        align: "center",
        render: (v, record) => {
          if (record.operation) {
            return '无';
          }
          return v || '无';
        }
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (v, record) => {
          return (
            <span>
              <Button type="primary"  onClick={this.openEdit(record)}>
                修改
              </Button>
              {/* <Popconfirm title="确定删除？"><Button type="danger" onClick={this.onDelete(record.id)}>
                删除
              </Button>
              </Popconfirm> */}
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
