import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Divider } from "antd";
import "../styles/Configurations.css";
import HeaderSection from "../components/ChatbotAdminSide/Configurations/HeaderSection";
import ModelSensitivitySection from "../components/ChatbotAdminSide/Configurations/ModelSensitivitySection";
import DropdownSection from "../components/ChatbotAdminSide/Configurations/DropdownSection";
import PersonaSection from "../components/ChatbotAdminSide/Configurations/PersonaSection";
import { getKnowledgeBases, getFolders } from "../api/knowledgebaseapi";

const Configurations = () => {
  const location = useLocation();
  const { chatbotName } = location.state || { chatbotName: "Unnamed Chatbot" };

  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("");

  // Fetch knowledge bases on component mount
  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      try {
        const data = await getKnowledgeBases();
        if (data.success) {
          setKnowledgeBases(data.data.map((item) => item.knowledge_base_name));
        } else {
          console.error("Failed to fetch knowledge bases");
        }
      } catch (error) {
        console.error("Error fetching knowledge bases:", error.message);
      }
    };

    fetchKnowledgeBases();
  }, []);

  // Fetch folders when a knowledge base is selected
  const handleKnowledgeBaseChange = async (value) => {
    setSelectedKnowledgeBase(value);
    setFolders([]); // Clear previous folders
    try {
      const data = await getFolders(value);
      console.log("Folders fetched for Knowledge Base:", data); // Log folder names
      if (data.success) {
        const folderNames = data.data.folders.map((folder) => folder.knowledge_base_name);
        setFolders(folderNames);
        // console.log("Folders fetched for Knowledge Base:", folderNames); // Log folder names
      } else {
        console.error("Failed to fetch folders");
      }
    } catch (error) {
      console.error("Error fetching folders:", error.message);
    }
  };

  return (
    <div className="configurations-container">
      <div className="configurations-content">
        {/* Header */}
        <HeaderSection chatbotName={chatbotName} />

        {/* Model Sensitivity */}
        <Divider />
        <ModelSensitivitySection />

        {/* Dropdown Sections */}
        <Divider />
        <DropdownSection
          title="Language Model"
          description="Select the language model version"
          options={["GPT-3.5", "GPT-4"]}
        />

        <DropdownSection
          title="Response Tone"
          description="Choose the tone of responses"
          options={["Formal", "Casual", "Friendly", "Professional"]}
        />

        <DropdownSection
          title="Response Language"
          description="Select the preferred response language"
          options={["English", "French", "Spanish", "German"]}
        />

        <DropdownSection
          title="Knowledge Base"
          description="Choose the knowledge base to use"
          options={knowledgeBases}
          onChange={handleKnowledgeBaseChange}
        />

        <DropdownSection
          title="Folder"
          description={`Folders for: ${
            selectedKnowledgeBase || "No Knowledge Base Selected"
          }`}
          options={folders}
        />

        {/* Persona Section */}
        <PersonaSection />
      </div>
    </div>
  );
};

export default Configurations;
