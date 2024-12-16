import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "../../styles/Home.css";

const { Text } = Typography;

const PopularCoursesSection = () => {
  const courses = [
    { title: "Languages", description: "German Grammar and Vocabulary" },
    { title: "Maths", description: "Logic and Problem Solving" },
    { title: "Chemistry", description: "Chemistry and the Environment" },
  ];

  return (
    <Card className="courses-card" title="Popular Courses">
      <Row gutter={16}>
        {courses.map((course) => (
          <Col span={8} key={course.title}>
            <Card title={course.title}>
              <Text>{course.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PopularCoursesSection;
