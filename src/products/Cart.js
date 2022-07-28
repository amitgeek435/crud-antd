import {
  ArrowUpOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { BackTop, Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCount from "../pages/CartCount";
import MainNavBar from "../pages/MainNavBar";
import { removeToCart } from "../reducer/CartSlice";

const Cart = () => {
  const page = "Cart";
  const cartData = useSelector((state) => state.CartManage.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCartProduct = (index) => {
    dispatch(removeToCart(index));
  };

  return (
    <>
      <MainNavBar />
      <div className="container">
        <CartCount page={page} cartCount={cartData.length} />
        <Row gutter={0}>
          {cartData.length > 0 ? (
            cartData?.map((product, index) => {
              const data = product.products;
              return (
                <Col span={6} key={index}>
                  <Card
                    actions={[
                      <EyeOutlined
                        key={data.id}
                        onClick={() => navigate("/shop/" + data.id)}
                      />,
                      <DeleteOutlined
                        key={data.id}
                        onClick={() => deleteCartProduct(index)}
                      />,
                    ]}
                    hoverable
                    style={{
                      width: 250,
                      marginTop: "40px",
                    }}
                    cover={<img alt="example" src={data.image} height="250" />}
                  >
                    <Meta title={data.title} />
                  </Card>
                </Col>
              );
            })
          ) : (
            <>
              <h2 className="text-center h1 text-danger">
                Your Cart Is Empty ...
              </h2>
              <Button
                style={{ marginLeft: "20px", marginTop: "12px" }}
                type="dashed"
                default
                size="default"
                onClick={() => navigate("/shop")}
              >
                Back To Shop
              </Button>
            </>
          )}
        </Row>
        <BackTop>
          <div className="backtotop-btn">
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </div>
    </>
  );
};

export default Cart;
