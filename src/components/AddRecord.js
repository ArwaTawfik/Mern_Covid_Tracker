import React, { useState } from "react";
import axios from "axios";
import { Layout } from "antd";
import { Button, Form, InputNumber, Alert, Card, Input } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

const { Header, Footer, Sider, Content } = Layout;
const App = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [id, setID] = useState();
    const [response, setResponse] = useState();
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            console.log(token);
            const response2 = await axios({
                method: "get",
                url: `${process.env.REACT_APP_URL}/api/getPatient`,
                headers: { token: token }
            });
            await response2;
            setID(await response2.data.ID);
        }
        fetchData();
    }, []);
    const onFinish = async (values) => {
        try {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/api/addRecord`,
                data: {
                    ID: id,
                    personalInfo: values.personalInfo,
                    temprature: values.temprature,
                    x: values.x,
                    y: values.y
                }
            });
            await response;
            console.log(response);
            if (response)
                if (response.status == 200) {
                    setResponse(<Alert message="Success" type="success" />);

                    navigate("/Home");
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

    return (
        <div className="signin">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/addRecord">Covid Map</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/info">Edit Info</Nav.Link>
                            <Nav.Link href="/addRecord">addRecord</Nav.Link>
                            <Nav.Link href="/map">Map</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Layout className="signin">
                <Sider className="beige-background"></Sider>
                <Layout className="beige-background">
                    <Header className="beige-background"></Header>
                    <Content className="beige-background">
                        <Card className="signin-card" style={{ display: "span" }}>
                            <Form
                                {...layout}
                                className="centered"
                                style={{ height: "75%", width: "75%" }}
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="temprature"
                                    label="Temprature"
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        placeholder="Select your Temprature"
                                        min={35}
                                        max={42}
                                    />
                                </Form.Item>

                                <Form.Item
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                    name="x"
                                    label="X"
                                >
                                    <InputNumber placeholder="Input x coordinates" />
                                </Form.Item>

                                <Form.Item
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                    name="y"
                                    label="Y"
                                >
                                    <InputNumber placeholder="Input y coordinates" />
                                </Form.Item>

                                <Form.Item name="personalInfo" label="Personal Info">
                                    <TextArea
                                        placeholder="P lease enter comment"
                                        rows={6}
                                        maxLength={100}
                                    />
                                </Form.Item>

                                <Form.Item className="centered">
                                    <Button type="primary" htmlType="submit">
                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                    <Footer className="beige-background"></Footer>
                </Layout>
                <Sider className="beige-background"></Sider>
            </Layout>
            {response}
        </div>
    );
};

export default App;
