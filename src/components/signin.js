import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Alert } from "antd";
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const { Header, Footer, Sider, Content } = Layout;
const App = () => {
    const [response, setResponse] = useState();

    const navigate = useNavigate();
    useEffect(() => {}, [response]);
    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        const x = {
            email: values.email,
            password: values.password
        };
        console.log(x);
        try {
            let response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/api/getPatient`,
                data: x
            });
            await response;
            console.log(response);
            if (response)
                if (response.status == 200) {
                    setResponse(<Alert message="Success" type="success" />);

                    localStorage.setItem("token", response.data.email);
                    navigate("/Home");
                } else
                    setResponse(
                        <Alert message="Wrong Username or Password" type="error" />
                    );
        } catch (err) {
            console.log(err);
            setResponse(<Alert message={err.response.data} type="error" />);
        }
    };

    return (
        <div className="signin">
            <Layout className="signin">
                <Sider className="beige-background"></Sider>
                <Layout className="beige-background">
                    <Header className="beige-background"></Header>
                    <Content className="beige-background">
                        <Card className="signin-card" style={{ display: "span" }}>
                            <Form
                                name="normal_login"
                                // className="login-form"
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!"
                                        }
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Password!"
                                        }
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 10,
                                        span: 16
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                    Log in
                                    </Button>
                  Or <a href="/register">register now!</a>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                    <Footer className="beige-background"> {response} </Footer>
                </Layout>
                <Sider className="beige-background"></Sider>
            </Layout>
        </div>
    );
};
export default App;
