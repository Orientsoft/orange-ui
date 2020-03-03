import React from "react";
import ComTable from "../../../components/comTable";
import PreviewModal from "../../../components/previewModal";
import { getHospitalList,  } from "./service";

export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      selectRow: {},
      previewVisible: false,
      previewImage: "",
      current: 1,
      total: 1,
      dataSource: [],
      renderMode: '',
    };
  }
  componentDidMount() {
    this.getPageData();
  }
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
  
  showPreview = (url, draft) => () => {
    this.setState({ previewVisible: true, previewImage: url, renderMode: draft });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  showContent = (record) => () => {

  }

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
        render: text => {
          return (
            <span className="canClick" onClick={this.showPreview(text, 'draft')}>详情</span>
          );
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
        title: "状态",
        dataIndex: "is_show",
        key: "is_show",
        align: "center",
        render: (v) => {
          return v ? '已上线' : '未上线';
        }
      },
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
