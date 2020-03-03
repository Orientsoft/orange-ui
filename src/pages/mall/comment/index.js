import React from "react";
import ComTable from "../../../components/comTable";
import PreviewModal from "../../../components/previewModal";
import { getCommentList } from "./service";
import { renderTime } from "../../../utils/util";

export default class Comment extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      previewVisible: false,
      previewImage: "",
      current: 1,
      total: 0,
      dataSource: []
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getCommentList(this.state.current)
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
  showPreview = url => () => {
    this.setState({ previewVisible: true, previewImage: url });
  };
  previewHandleCancel = () => {
    this.setState({ previewVisible: false, previewImage: "" });
  };
  render() {
    const columns = [
      {
        title: "产品",
        dataIndex: "productName",
        key: "productName",
        align: "center"
      },
      {
        title: "产品LOGO",
        dataIndex: "productLogo",
        key: "productLogo",
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
        title: "评论者",
        dataIndex: "commentName",
        key: "commentName",
        align: "center"
      },
      {
        title: "评论时间",
        dataIndex: "commentAt",
        key: "commentAt",
        align: "center",
        render: renderTime
      },
      {
        title: "回复",
        dataIndex: "answer",
        key: "answer",
        align: "center"
      },
      {
        title: "回复时间",
        dataIndex: "answerAt",
        key: "answerAt",
        align: "center",
        render: renderTime
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
        <PreviewModal
          previewVisible={this.state.previewVisible}
          previewImage={this.state.previewImage}
          handleCancel={this.previewHandleCancel}
        />
      </div>
    );
  }
}
