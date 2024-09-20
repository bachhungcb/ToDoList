import { AppstoreOutlined, MailOutlined, SettingOutlined,FormOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const items = [
    {
      label:<Link to={"/"}>Home Page</Link>,
      key: 'home',
      icon: <MailOutlined />,
    },
    {
      label:<Link to={"/user"}>Users</Link> ,
      key: 'user',
      icon: <AppstoreOutlined />,
    },
    ,{
      label:<Link to={"/note"}>Notes</Link> ,
      key: 'note',
      icon: <FormOutlined />,
    },
    {
      label: 'Welcome',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
          {
            label: <Link to={"login"}>Đăng nhập</Link>,
            key: 'login',
          },
          {
            label: <Link to={"register"}>Đăng xuất</Link>,
            key: 'logout',
          },
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
