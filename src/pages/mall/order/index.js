import React from "react";
import { message } from "antd";
import ComTable from "../../../components/comTable";
import AppointmentDetail from "./appointmentDetail";
import CommentModal from "./commentModal";
import {
  getOrderList,
  getOrderDetail,
  getComment,
  answerComment,
  cancelCommentSpecial,
  setCommentSpecial
} from "./service";
import { renderTime } from "../../../utils/util";

const statusCfg = {
  0: "待支付",
  1: "待预约",
  2: "待使用",
  3: "待评价",
  4: "已完成"
};

const payCfg = {
  WEIXINPAY: "微信",
  ALIPAY: "支付宝"
};

export default class Order extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      visible: false,
      current: 1,
      total: 0,
      dataSource: [],
      detailData: {},
      cvisible: false,
      commentData: {},
      selectRow: {}
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    getOrderList(this.state.current)
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
  showDetail = record => () => {
    getOrderDetail(record.id)
      .then(res => {
        if (res.status === 1) {
          this.setState({ visible: true, detailData: res.data });
          return;
        }
        message.error("暂无预约信息");
      })
      .catch(e => {
        console.log(e);
      });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  showCommentDetail = record => () => {
    getComment(record.id)
      .then(res => {
        if (res.status === 1) {
          this.setState({
            cvisible: true,
            commentData: res.data,
            selectRow: record
          });
          return;
        }
        message.error("暂无评论信息");
      })
      .catch(e => {
        // message.error('暂无评论信息');
        console.log(e);
      });
  };
  onCommentCancel = () => {
    this.setState({
      cvisible: false
    });
  };
  onSubmit = value => {
    answerComment({
      orderid: this.state.selectRow.id,
      answer: value
    })
      .then(res => {
        if (res.status === 1) {
          this.setState({
            value: "",
            commentData: { ...this.state.commentData, answer: value }
          });
          return;
        }
        message.error(`提交失败:${res.message}`);
      })
      .catch(e => {
        console.log(e);
      });
  };
  changeSpecialComment = () => {
    if (this.state.commentData.is_show) {
      // 取消精选评论
      cancelCommentSpecial({ orderid: this.state.selectRow.id })
        .then(res => {
          if (res.status === 1) {
            this.setState({
              commentData: { ...this.state.commentData, is_show: 0 }
            });
            return;
          }
          message.error(`操作失败:${res.message}`);
        })
        .catch(e => {
          console.log(e);
        });
      return;
    }
    // 设置精选评论
    setCommentSpecial({ orderid: this.state.selectRow.id })
      .then(res => {
        if (res.status === 1) {
          this.setState({
            commentData: { ...this.state.commentData, is_show: 1 }
          });
          return;
        }
        message.error(`操作失败:${res.message}`);
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const columns = [
      {
        title: "产品",
        dataIndex: "product",
        key: "product",
        align: "center",
        render: v => {
          return v ? v.name : "";
        }
      },
      {
        title: "购买价格",
        dataIndex: "price",
        key: "price",
        align: "center"
      },
      {
        title: "下单时间",
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center",
        render: renderTime,
        width: 200
      },
      {
        title: "付款方式",
        dataIndex: "pay",
        key: "pay",
        align: "center",
        render: v => {
          return payCfg[v];
        }
      },
      {
        title: "付款时间",
        dataIndex: "payAt",
        key: "payAt",
        align: "center",
        render: renderTime,
        width: 200
      },
      {
        title: "订单状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: v => {
          return statusCfg[v];
        }
      },
      {
        title: "评论",
        dataIndex: "comment",
        key: "comment",
        align: "center",
        render: (v, record) => {
          return (
            <span className="canClick" onClick={this.showCommentDetail(record)}>
              详情
            </span>
          );
        }
      },
      {
        title: "预约",
        dataIndex: "appoint",
        key: "appoint",
        align: "center",
        render: (v, record) => {
          return (
            <span className="canClick" onClick={this.showDetail(record)}>
              详情
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
        <AppointmentDetail
          onCancel={this.onCancel}
          visible={this.state.visible}
          detailData={this.state.detailData}
        />
        <CommentModal
          onCancel={this.onCommentCancel}
          visible={this.state.cvisible}
          commentData={this.state.commentData}
          onSubmit={this.onSubmit}
          changeSpecialComment={this.changeSpecialComment}
        />
      </div>
    );
  }
}
