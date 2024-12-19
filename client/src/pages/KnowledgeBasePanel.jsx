import React, { useState } from "react";
import QuickAccessBox from "../components/KnowledgeBase/QuickAccessBox";
import KnowledgeBaseList from "../components/KnowledgeBase/KnowledgeBaseList";
import RightPanelBox from "../components/KnowledgeBase/RightPanelBox";
import HeaderSection from "../components/KnowledgeBase/HeaderSection";

const KnowledgeBasePanel = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div style={{ display: "flex", gap: "16px", height: "100vh", padding: "24px" }}>
      {/* Main Section */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        {/* Quick Access */}
        <QuickAccessBox />
        {/* Folder List */}
        <KnowledgeBaseList onFolderSelect={setSelectedFolder} />
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1 }}>
        <RightPanelBox folder={selectedFolder} />
      </div>
    </div>
  );
};

export default KnowledgeBasePanel;
