import React, { useState } from "react";
import axios from "axios";
import {
    Layout,
    Descriptions,
    Input,
    Button,
    Select,
    InputNumber,
    Modal,
    Form,
    Alert
} from "antd";

const { Option } = Select;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};
const App = () => {
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState();
    const [flag, setFlag] = useState(false);
    const [response, setResponse] = useState();
    const [form] = Form.useForm();
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");

            const response = await axios({
                method: "get",
                url: `${process.env.REACT_APP_URL}/api/getPatient`,
                headers: { token: token }
            });

            console.log(response);

            setID(response.data.ID);
            setName(response.data.username);
            setEmail(response.data.email);
            setGender(response.data.gender);
            setAge(response.data.age);
        }
        fetchData();
    }, [flag]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        let send = {};

        if (values.age != "") send.age = values.age;

        if (values.gender != "") send.gender = values.gender;

        if (values.username != "") send.username = values.username;

        console.log(send);

        if (send == {}) console.log("no edit");

        const token = localStorage.getItem("token");
        send.email = token;
        try {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/api/updatePatient`,
                data: send
            });
            if (response)
                if (response.status == 200) {
                    setResponse(<Alert message="Success" type="success" />);

                    localStorage.setItem("token", response.data.email);
                } else setResponse(<Alert message="Error" type="error" />);
        } catch (err) {
            console.log(err);
            setResponse(<Alert message={err.response.data} type="error" />);
        }
        form.resetFields();
        setFlag(!flag);
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        setIsModalOpen(false);
    };
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
    return (
        <>
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
            <div className="signin">
                <Modal
                    title="Edit"
                    onCancel={handleCancel}
                    footer={[]}
                    open={isModalOpen}
                >
                    <Layout centered>
                        <Form
                            form={form}
                            {...layout}
                            validateMessages={validateMessages}
                            style={{ backgroundColor: "white" }}
                            initialValues={{
                                remember: true
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Username" name="username">
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item name="gender" label="Gender">
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
                                wrapperCol={{
                                    offset: 10,
                                    span: 16
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                  Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Layout>
                    {response}
                </Modal>

                <Layout className="signin">
                    <Sider className="beige-background"></Sider>
                    <Layout className="beige-background">
                        <Header className="beige-background"></Header>
                        <Content className="beige-background">
                            <div style={{ float: "right" }}>
                                <EditOutlined
                                    style={{ float: "right" }}
                                    type="primary"
                                    onClick={showModal}
                                />
                            </div>
                            <br />
                            <Descriptions title="User Info">
                                <Descriptions.Item label="Id">{id}</Descriptions.Item>
                                <Descriptions.Item label="UserName"> {name} </Descriptions.Item>
                                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                                <Descriptions.Item label="Age">{age}</Descriptions.Item>
                            </Descriptions>
                        </Content>
                        <Footer className="beige-background"></Footer>
                    </Layout>
                    <Sider className="beige-background"></Sider>
                </Layout>
            </div>
        </>
    );
};

export default App;
