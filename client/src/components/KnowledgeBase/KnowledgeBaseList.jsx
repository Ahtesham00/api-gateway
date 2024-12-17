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
    <Card
      style={{
        minHeight: "400px",
        background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
        borderRadius: "12px", // Optional: rounded corners
        backdropFilter: "blur(10px)", // Apply the blur effect
        WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
        border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border for glass effect
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: slight shadow
      }}
    >
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
