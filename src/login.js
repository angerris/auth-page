import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { login } from "./api/api";

const { Title, Text } = Typography;

function Login({ onLogin }) {
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    const { username, password } = values;

    const { error } = await login(username, password);

    if (error) {
      setError(error);
    } else {
      onLogin();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5"
      }}
    >
      <Card style={{ width: 300 }} bodyStyle={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {error && (
            <Text
              type="danger"
              style={{ display: "block", marginBottom: "10px" }}
            >
              {error}
            </Text>
          )}
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginTop: "12px" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
