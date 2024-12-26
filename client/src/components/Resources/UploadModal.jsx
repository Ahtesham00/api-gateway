import React, { useState } from "react";
import { Modal, Upload, Button, Select, Typography } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Text } = Typography;
const { Option } = Select;

const UploadModal = ({ visible, onOk, onCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [guideOption, setGuideOption] = useState("Step-by-step guide");

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    onChange(info) {
      setFileList([...info.fileList]);
    },
    onRemove(file) {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload() {
      // Return false to prevent immediate upload, handle manually if needed
      return false;
    },
  };

  const handleOk = () => {
    onOk(fileList);
    setFileList([]);
  };

  const handleCancel = () => {
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title="Upload an introduction"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add to profile"
      cancelText="Cancel"
      bodyStyle={{ padding: "24px",  }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Text type="secondary">
          For best results, video uploads should be at least 1080p (1920 x 1080
          pixels) in MP4 format.
        </Text>
      </div>
      <Dragger {...uploadProps} style={{ padding: "20px" }}>
        <p className="ant-upload-drag-icon" style={{ marginBottom: "8px" }}>
          <InboxOutlined style={{ fontSize: "40px" }} />
        </p>
        <p className="ant-upload-text" style={{ fontWeight: "500" }}>
          Drag and drop video files to upload
        </p>
        <p className="ant-upload-hint" style={{ marginBottom: "16px" }}>
          or
        </p>
        <Button icon={<UploadOutlined />}>Select files</Button>
      </Dragger>
    </Modal>
  );
};

export default UploadModal;
