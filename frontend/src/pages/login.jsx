import React, { useContext } from 'react';
import { Button, Form, Input, notification,Col,Divider, Row } from 'antd';
import { loginUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);
    const onFinish = async (values) => {
    
        const {email, password} = values;
    
        const response = await loginUserApi(email, password);
        if(response && response.EC == 0){
            localStorage.setItem("access_token", response.access_token)
            notification.success({
                message: "LOGIN USER",
                description: "Success",
            });
            setAuth({
                isAuthenticated: true,
                user:{
                    email: response?.user?.email ?? "",
                    name:  response?.user?.name ?? ""
                }
            })
            navigate("/");
        }else{
            notification.error({
                message: "LOGIN USER",
                description: response?.EM ?? "Error",
            });
        }
    };

    return (
        <div style={{ margin: 50 }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}

                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage;
