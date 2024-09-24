import { AppstoreOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined, FormOutlined } from '@ant-design/icons';
import { Menu, Button, Form, Input, notification } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  console.log(">>check auth: ", auth);

  const items = [
    {
      label: <Link to={"/"}>Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated ? [{
      label: <Link to={"/user"}>Users</Link>,
      key: 'user',
      icon: <UsergroupAddOutlined />,
    }
    , {
      label: <Link to={"/note"}>Notes</Link>,
      key: 'note',
      icon: <FormOutlined />,
    },] : []),
    
    {
      label: `Welcome ${auth?.user?.email ?? ""}`,
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated ? [{
          label: <span onClick={() => {
            localStorage.clear("access_token");
            setAuth({
              isAuthenticated: false,
              user:{
                email:  "",
                name:  ""
              }
            })
            notification.success({
              message: "LOGOUT",
              description: "Success",
            });
            setCurrent("home");
            navigate("/");
          }}>Đăng xuất</span>,
          key: 'logout',
        }] : [
          {
            label: <Link to={"login"}>Đăng nhập</Link>,
            key: 'login',
          },
          {
            label: <Link to={"register"}>Đăng ký</Link>,
            key: 'register',
          },
        ]),
      ],
    }
  ];
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;
