import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  List,
  Spin,
  Empty,
  message,
  Button,
  Modal,
  Upload,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import {
  FileOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  EllipsisOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  uploadFile,
  deleteFile,
  downloadFile,
  getFiles,
} from "../../../api/knowledgeBaseApi";

const FileBreadcrumb = ({ knowledgeBaseName, folderName, onBack }) => {
  const [files, setFiles] = useState([]); // File list
  const [loading, setLoading] = useState(true); // Loading state
  const [isUploadVisible, setIsUploadVisible] = useState(false); // Upload modal visibility
  const [uploading, setUploading] = useState(false); // Upload loading state
  const [selectedFile, setSelectedFile] = useState(null); // Selected file for upload

  // Fetch files in the current folder
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await getFiles(knowledgeBaseName, folderName);
      if (response.success) {
        setFiles(response.data || []);
      } else {
        message.error("Failed to fetch files");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      message.error("Error fetching files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [knowledgeBaseName, folderName]);

  // Handle file upload
  const handleUploadFile = async () => {
    if (!selectedFile) {
      message.warning("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("knowledge_base_name", knowledgeBaseName);
    formData.append("folder_name", folderName);

    try {
      setUploading(true);
      const response = await uploadFile(formData);
      if (response.success) {
        message.success(response.message);
        fetchFiles(); // Refresh the file list
        setIsUploadVisible(false);
        setSelectedFile(null);
      } else {
        message.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (filename) => {
    try {
      const payload = {
        knowledge_base_name: knowledgeBaseName,
        folder_name: folderName,
        file_name: filename,
      };
      const response = await deleteFile(payload);
      if (response.success) {
        message.success(response.message);
        fetchFiles(); // Refresh the file list
      } else {
        message.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      message.error("Error deleting file");
    }
  };

  // Handle file download
  const handleDownloadFile = async (filename) => {
    try {
      const payload = {
        knowledge_base_name: knowledgeBaseName,
        folder_name: folderName,
        file_name: filename,
      };
      const response = await downloadFile(payload);
      if (response) {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        message.error("Failed to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      message.error("Error downloading file");
    }
  };

  // Dropdown menu for file options
  const fileOptionsMenu = (filename) => (
    <Menu>
      <Menu.Item
        icon={<DownloadOutlined />}
        onClick={() => handleDownloadFile(filename)}
      >
        Download
      </Menu.Item>
      <Menu.Item danger onClick={() => handleDeleteFile(filename)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Header with Breadcrumb and Upload Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Breadcrumb
          separator=">"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          <Breadcrumb.Item
            onClick={onBack}
            style={{ cursor: "pointer", color: "#1890ff" }}
          >
            <HomeOutlined style={{ marginRight: "5px" }} /> Knowledge Bases
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FolderOpenOutlined style={{ marginRight: "5px" }} />{" "}
            {knowledgeBaseName}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{folderName}</Breadcrumb.Item>
        </Breadcrumb>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsUploadVisible(true)}
        >
          Upload File
        </Button>
      </div>

      {/* Loading or File List */}
      {loading ? (
        <Spin tip="Loading Files..." />
      ) : files.length === 0 ? (
        <Empty description="No files found" />
      ) : (
        <>
          {/* Column Headers */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            <div style={{ flex: 2 }}>Name</div>
            <div style={{ flex: 0.2, textAlign: "right" }}>Options</div>
          </div>

          {/* File List */}
          <List
            dataSource={files}
            renderItem={(item) => (
              <List.Item
                key={item.unique_filename}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                  <FileOutlined style={{ marginRight: "10px" }} />
                  <span>{item.original_filename}</span>
                </div>
                <Dropdown
                  overlay={fileOptionsMenu(item.original_filename)}
                  trigger={["click"]}
                >
                  <Button
                    type="text"
                    icon={<EllipsisOutlined />}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Dropdown>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Upload File Modal */}
      <Modal
        title="Upload File"
        visible={isUploadVisible}
        onOk={handleUploadFile}
        onCancel={() => setIsUploadVisible(false)}
        okText="Upload"
        confirmLoading={uploading}
      >
        <Upload
          beforeUpload={(file) => {
            setSelectedFile(file);
            return false; // Prevent automatic upload
          }}
          maxCount={1}
          fileList={selectedFile ? [selectedFile] : []}
        >
          <Button>Select File</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default FileBreadcrumb;
