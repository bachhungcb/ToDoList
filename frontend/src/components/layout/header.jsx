import { AppstoreOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Button, Form, Input, notification } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import '../../styles/header.css'
const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const items = [
    {
      label: <Link to={"/"}>Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated ? [
      ...(auth.user.role == "admin" ? [
        {
        label: <Link to={"/user"}>Users</Link>,
        key: 'user',
        icon: <UsergroupAddOutlined />,
      },] : [])
    , {
      label: <Link to={"/note"}>Notes</Link>,
      key: 'note',
      icon: <FormOutlined />,
    },] : []),
    {
      label: <Link to={"profile"}>Profile</Link>,
      key: 'profile',
      icon: <UserOutlined/>
    },
    {
      label: `Welcome ${auth?.user?.name ?? ""}`,
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
                name:  "",
                _id: "", // delete userId when logout,
                role: ""
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
  const onClick = (e) => { //for debug only
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu 
                className='menu'
                onClick={onClick} 
                selectedKeys={[current]} 
                mode="horizontal" 
                items={items} 
          />;
};
export default Header;
