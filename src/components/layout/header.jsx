import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
import { HomeOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { useState } from "react";
const Header = () => {
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="/Books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
    ];

    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />

    );
}

export default Header