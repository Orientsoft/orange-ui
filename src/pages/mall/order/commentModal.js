import React from "react";
import { Modal, Row, Col, Divider, Input, Button, message } from "antd";
import { renderDate } from "../../../utils/util";
import notSelectedImg from "../../../assets/not_selected.png";
import selectedImg from "../../../assets/selected.png";

const { TextArea } = Input;

export default class CommentModal extends React.Component {
  state = { value: "" };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  onSubmit = () => {
    if (!this.state.value) {
        message.error("请填写回复内容");
        return;
      }
      this.props.onSubmit(this.state.value);
  }

  render() {
    const { visible, onCancel, commentData } = this.props;
    return (
      <Modal
        visible={visible}
        title="订单评论"
        onCancel={onCancel}
        footer={false}
        bodyStyle={{ minHeight: "400px" }}
      >
        <Row type="flex">
          <Col span={4}>
            <img
              src={commentData.commentLogo}
              alt=""
              style={{ height: "60px" }}
            />
          </Col>
          <Col span={20}>
            <Row type="flex" justify="space-between">
              <Col style={{ fontSize: "24px" }}>{commentData.commentName}</Col>
              <Col style={{ fontSize: "24px", color: "#666" }}>
                {renderDate(commentData.commentAt)}
              </Col>
            </Row>
            <div>
              <img
                src={commentData.is_show ? selectedImg : notSelectedImg}
                alt=""
                style={{ height: "20px" }}
              />
            </div>
            <div
              style={{
                marginTop: "16px",
                // background: "#d9d9d9",
                minHeight: "40px",
                padding: "16px"
              }}
            >
              {commentData.comment}
            </div>
            <Divider></Divider>
            {commentData.answer && (
              <div
                style={{
                  marginTop: "16px",
                  background: "#d9d9d9",
                  minHeight: "40px",
                  padding: "16px"
                }}
              >
                已回复：{commentData.answer}
              </div>
            )}
            {!commentData.answer && (
              <TextArea
                rows={4}
                onChange={this.onChange}
                value={this.state.value}
              />
            )}

            <Row style={{ marginTop: "16px" }}>
              <Button type="primary" onClick={this.props.changeSpecialComment}>
                {commentData.is_show ? "取消精选评论" : "设置为精选评论"}
              </Button>
              {!commentData.answer && (
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={this.onSubmit}
                >
                  回复
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    );
  }
}
