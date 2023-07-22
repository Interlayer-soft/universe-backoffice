import React, { ChangeEvent, useState } from "react";
import { Input, Button, Checkbox, Form } from "antd";
import "./login.css";
import * as authService from "../../../services/authService";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [password, setPassword] = useState(() => {
    return localStorage.getItem("password") || "";
  });
  const [rememberMe, setRememberMe] = useState(() => {
    if (localStorage.getItem("username") && localStorage.getItem("password"))
      return true;
    return false;
  });

  const onFinish = async (values: any) => {
    try {
      const { username, password } = values;
      authService.login(username, password).then( res =>{
        console.log("Login successful! Token:", res);
      }
        
      ) // Call the login function from authService
      

      if (rememberMe) {
        // Code to remember user session (e.g., set a token in local storage)
      } else {
        // Code to handle non-remembered session (e.g., clear any stored token)
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);

    console.log(rememberMe);
    if (rememberMe) {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    } else {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="left-side">
          <div className="left-content">
            <h1>Welcome to</h1>
            <img src="logo.png" alt="Ducky Trader" />
            <p>Use the backoffice</p>
          </div>
        </div>
        <div className="right-side">
          <div className="right-content">
            <h2>Login Account</h2>
            <Form name="loginForm" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
                initialValue={username}
              >
                <Input placeholder="Username" onChange={handleUsernameChange} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                initialValue={password}
              >
                <Input.Password
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </Form.Item>
              <Form.Item className="remember-me">
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberChange as any}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-login">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
