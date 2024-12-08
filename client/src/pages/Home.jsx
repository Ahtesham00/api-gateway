import React from 'react';
import { Button, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(to bottom, #9f7aea, #667eea)' 
    }}>
      <Card style={{ width: '500px', textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2}>Elevate your payment capabilities</Title>
        <Paragraph>
          Create outstanding shopping experiences, smoothly manage transactions, and facilitate business.
        </Paragraph>
        <Button type="primary" size="large" style={{ borderRadius: '8px' }}>
          Contact Sales
        </Button>
      </Card>
    </div>
  );
};

export default Home;
