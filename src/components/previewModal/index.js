import React from "react";
import { Modal } from "antd";

export default class PreviewModal extends React.Component {
  render() {
    const {
      previewVisible,
      previewImage,
      handleCancel,
      renderMode
    } = this.props;
    console.log("renderMode", renderMode);
    return (
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
        title="预览"
        width={1024}
      >
        <div className="clearfix">
          {renderMode === "draft" ? (
            <div
              style={{ minHeight: '700px' }}
              dangerouslySetInnerHTML={{
                __html: previewImage
              }}
            ></div>
          ) : (
            <img
              alt="example"
              style={{ width: "100%", height: "100%" }}
              src={previewImage}
            />
          )}
        </div>
      </Modal>
    );
  }
}
