import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Divider, Button } from "antd";
import "../styles/Configurations.css";
import HeaderSection from "../components/ChatbotAdminSide/Configurations/HeaderSection";
import ModelSensitivitySection from "../components/ChatbotAdminSide/Configurations/ModelSensitivitySection";
import DropdownSection from "../components/ChatbotAdminSide/Configurations/DropdownSection";
import PersonaSection from "../components/ChatbotAdminSide/Configurations/PersonaSection";
import ResponseLanguageSection from "../components/ChatbotAdminSide/Configurations/ResponseLanguageSection";
import ChatbotModal from "../components/ChatbotAdminSide/Chatbot/ChatbotModal";
import { getKnowledgeBases, getFolders } from "../api/knowledgeBaseApi";
import { saveConfigurations } from "../api/chatbotConfigurationApi";

const Configurations = () => {
  const location = useLocation();
  const { chatbotId, chatbotName } = location.state || {
    chatbotId: null,
    chatbotName: "Unnamed Chatbot",
  };

  // State for dropdowns and sliders
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [languageModel, setLanguageModel] = useState("");
  const [responseTone, setResponseTone] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
      if (data.success) {
        const folderNames = data.data.folders.map(
          (folder) => folder.folder_name
        );
        setFolders(folderNames);
      } else {
        console.error("Failed to fetch folders");
      }
    } catch (error) {
      console.error("Error fetching folders:", error.message);
    }
  };

  // Handle Save Button Click
  const handleSave = async () => {
    const payload = {
      chatbot_id: chatbotId,
      chatbot_name: chatbotName,
      settings: {
        language: selectedLanguage?.value || "",
        response_tone: responseTone,
        knowledge_base_name: selectedKnowledgeBase,
        folders: [selectedFolder],
        llm_model: languageModel,
        temperature,
        max_tokens: maxTokens,
      },
    };
    console.log("payload", payload);
    try {
      const response = await saveConfigurations(payload);
      if (response.success) {
        console.log("Settings saved successfully:", response);
      } else {
        console.error("Failed to save settings:", response.message);
      }
    } catch (error) {
      console.error("Error saving configurations:", error.message);
    }
  };

  return (
    <div className="configurations-container">
      <div className="configurations-content">
        {/* Header */}
       
          <HeaderSection chatbotName={chatbotName} setIsChatbotOpen={setIsChatbotOpen}/>
         
      

        <Divider />

        {/* Model Sensitivity */}
        <ModelSensitivitySection
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
        />
        <Divider />

        {/* Dropdown Sections */}
        <DropdownSection
          title="Language Model"
          description="Select the language model version"
          options={["GPT-3.5", "GPT-4"]}
          onChange={setLanguageModel}
        />

        <DropdownSection
          title="Response Tone"
          description="Choose the tone of responses"
          options={["Formal", "Casual", "Friendly", "Professional"]}
          onChange={setResponseTone}
        />

        <ResponseLanguageSection
          onChange={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
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
          mode="multiple"
          onChange={setSelectedFolder}
        />

        {/* Persona Section */}
        <PersonaSection />

        {/* Save Button */}
        <div className="save-button-container">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>

        {/* Chatbot Modal */}
        <ChatbotModal
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    </div>
  );
};

export default Configurations;
