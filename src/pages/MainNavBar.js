import { Header } from "antd/lib/layout/layout";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./MainNavbar.css";

const MainNavBar = () => {
  const menuItems = [
    {
      key: "0",
      icon: <UserOutlined />,
      label: "UserForm",
      title: "/",
    },
    {
      key: "1",
      icon: <ShoppingOutlined />,
      label: "Shop",
      title: "/shop",
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: "Cart",
      className: "cartLabel",
      title: "/cart",
    },
  ];
  return (
    <>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={menuItems.map((item, index) => {
            const label = item.label;
            const pathname = item.title;
            const key = index + 1;
            return {
              key,
              label: <Link to={pathname}>{label}</Link>,
            };
          })}
        />
      </Header>
    </>
  );
};

export default MainNavBar;
