import React from "react";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/Home.css";

const { Text } = Typography;

const TeachersSection = () => {
  const teachers = ["Anna Stewart", "Volter Anderson", "Alice Miller", "Monica Peterson"];

  return (
    <Card className="teachers-card" title="Your Teachers">
      <div className="teacher-list">
        {teachers.map((name) => (
          <div key={name} className="teacher">
            <Avatar size={64} icon={<UserOutlined />} />
            <Text>{name}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeachersSection;
