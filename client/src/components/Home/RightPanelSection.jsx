import React from "react";
import { Card, Typography, Progress, Button } from "antd";
import "../../styles/Home.css";

const { Title, Text } = Typography;

const RightPanelSection = () => {
  const courses = [
    { name: "Tags in layout", lectures: 10, practical: 5 },
    { name: "Chemistry is easy!", lectures: 8, practical: 4 },
    { name: "Economic Geography", lectures: 8, practical: 4 },
    { name: "Maths in simple terms", lectures: 24, practical: 15 },
  ];

  return (
    <>
      <Card className="english-test-card">
        <Title level={4}>Test your English level!</Title>
        <Button type="primary">Pass Test</Button>
        <Progress type="circle" percent={64} />
      </Card>

      <Card className="travelling-card">
        <Title level={5}>English for travelling</Title>
        <Text>Start date: 04/05/2024</Text>
        <Text>Tutor: Volter Anderson</Text>
      </Card>

      <Card className="my-courses-card" title="My Courses">
        {courses.map((course, index) => (
          <div key={index} className="course-item">
            <Text>{course.name}</Text>
            <Text>{`${course.lectures} lectures, ${course.practical} practical work`}</Text>
          </div>
        ))}
      </Card>
    </>
  );
};

export default RightPanelSection;
