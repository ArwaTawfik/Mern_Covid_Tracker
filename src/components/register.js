import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Alert,
    Select,
    InputNumber,
    Card
} from "antd";

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
const { Header, Footer, Sider, Content } = Layout;
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!"
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    }
};
const App = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [response, setResponse] = useState();
    useEffect(() => {}, [response]);
    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        const send = {
            age: values.age,
            email: values.email,
            gender: values.gender,
            password: values.password,
            username: values.username
        };
        console.log(send);
        try {
            let response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/api/addPatient`,
                data: send
            });
            await response;
            console.log(response);
            if (response)
                if (response.status == 200) {
                    setResponse(<Alert message="Success" type="success" />);

                    localStorage.setItem("token", response.data.email);
                    navigate("/signin");
                } else
                    setResponse(
                        <Alert message="Wrong Username or Password" type="error" />
                    );
        } catch (err) {
            console.log(err);
            setResponse(<Alert message={err.response.data} type="error" />);
        }
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        setResponse(
            <Alert message={errorInfo.errorFields[0].errors[0]} type="error" />
        );
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
                                form={form}
                                {...layout}
                                //  name="nest-messages"
                                validateMessages={validateMessages}
                                // name="basic"
                                className="centered"
                                style={{ height: "75%", width: "75%" }}
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your username!"
                                        }
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                            type: "email"
                                        }
                                    ]}
                                >
                                    <Input placeholder="email" />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Select placeholder="Choose you gender" allowClear>
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="age" label="Age">
                                    <InputNumber placeholder="Age" />
                                </Form.Item>

                                <Form.Item
                                    label="password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!"
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder="password" />
                                </Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 14,
                                        span: 16
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                    <Footer className="beige-background"> {response}</Footer>
                </Layout>
                <Sider className="beige-background"></Sider>
            </Layout>
        </div>
    );
};
export default App;
