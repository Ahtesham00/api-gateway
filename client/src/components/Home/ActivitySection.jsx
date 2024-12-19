import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { EditOutlined } from "@ant-design/icons";
import "../../styles/Home.css";

const { Text } = Typography;

const data = [
  { day: "Mon", value: 1 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 3 },
  { day: "Sat", value: 1 },
  { day: "Sun", value: 2 },
];

// Find the maximum value
const maxValue = Math.max(...data.map((item) => item.value));

const ActivitySection = () => {
  return (
    <Card
      className="activity-card"
      title={<span className="activity-title">My activity</span>}
      extra={<a href="#" className="see-all-link">See all &gt;</a>}
    >
      <Row gutter={16} className="activity-content" style={{paddingLeft: "0px"}}>
        {/* Bar Chart Section */}
        <Col span={16} className="bar-chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barGap={8}>
              {/* XAxis represents the categories (days) */}
              <XAxis
                dataKey="day"
                type="category"
                tick={{ fontSize: 12, fill: "#888" }}
                axisLine={false}
                tickLine={false}
              />
              {/* YAxis represents the numerical values */}
              <YAxis
                type="number"
                tick={{ fontSize: 12, fill: "#888" }}
                axisLine={false}
                tickLine={false}
                domain={[0, Math.max(maxValue, 4)]}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                barSize={30} // Increased bar thickness
                shape={({ x, y, width, height, payload }) =>
                  payload.value === maxValue ? (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill="#5C62FF" // Purple for the highest bar
                      rx="10"
                      ry="10"
                    />
                  ) : (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill="#FFFFFF" // White for other bars
                      stroke="#EBF0FA" // Add stroke for visibility
                      rx="10"
                      ry="10"
                    />
                  )
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        {/* Activity Tasks Section */}
        <Col span={8} className="activity-tasks">
          <div className="task-box">
            <div className="task-header">
              <Text className="task-time">10:00</Text>
              <EditOutlined className="task-icon" />
            </div>
            <Text className="task-title">Maths In Simple Terms</Text>
          </div>

          <div className="task-box">
            <div className="task-header">
              <Text className="task-time">12:00</Text>
              <EditOutlined className="task-icon" />
            </div>
            <Text className="task-title">Chemistry Is Easy!</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ActivitySection;
