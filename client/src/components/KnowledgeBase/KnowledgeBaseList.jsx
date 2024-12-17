import React, { useState } from "react";
import { Card, Spin, Empty } from "antd";
import KnowledgeBaseBreadcrumb from "./Breadcrumbs/KnowledgeBaseBreadcrumb";
import FolderBreadcrumb from "./Breadcrumbs/FolderBreadcrumb";
import FileBreadcrumb from "./Breadcrumbs/FileBreadcrumb";

const KnowledgeBaseList = () => {
  const [currentPath, setCurrentPath] = useState("knowledgeBase"); // knowledgeBase -> folder -> file
  const [currentKnowledgeBase, setCurrentKnowledgeBase] = useState(null); // Stores selected knowledge base
  const [currentFolder, setCurrentFolder] = useState(null); // Stores selected folder

  // Handlers for navigation
  const handleNavigateToKnowledgeBase = (knowledgeBase) => {
    setCurrentKnowledgeBase(knowledgeBase);
    setCurrentPath("folder");
  };

  const handleNavigateToFolder = (knowledgeBaseName, folderName) => {
    setCurrentFolder({ knowledgeBaseName, folderName });
    setCurrentPath("file");
  };

  const handleNavigateBack = () => {
    if (currentPath === "file") {
      setCurrentPath("folder");
      setCurrentFolder(null);
    } else if (currentPath === "folder") {
      setCurrentPath("knowledgeBase");
      setCurrentKnowledgeBase(null);
    }
  };

  return (
    <Card style={{ minHeight: "400px" }}>
      {currentPath === "knowledgeBase" && (
        <KnowledgeBaseBreadcrumb
          onNavigateToKnowledgeBase={handleNavigateToKnowledgeBase}
        />
      )}
      {currentPath === "folder" && (
        <FolderBreadcrumb
          knowledgeBaseName={currentKnowledgeBase?.knowledge_base_name}
          onNavigateToFolder={handleNavigateToFolder}
          onBack={handleNavigateBack}
        />
      )}
      {currentPath === "file" && (
        <FileBreadcrumb
          knowledgeBaseName={currentFolder?.knowledgeBaseName}
          folderName={currentFolder?.folderName}
          onBack={handleNavigateBack}
        />
      )}

      {currentPath === "loading" && <Spin tip="Loading..." />}
    </Card>
  );
};

export default KnowledgeBaseList;
