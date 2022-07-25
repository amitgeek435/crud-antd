import React from "react";
import { Badge, Button, Col, Row, Select } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CartCount = ({ getCategories, cartCount, page }) => {
  const navigate = useNavigate();
  const handleChangeCat = (catName) => {
    console.log(`selected ${catName}`);
  };
  return (
    <>
      <Row className="mt-4">
        <Col
          xs={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
          style={{ cursor: "pointer" }}
        >
          <Badge size="small" count={cartCount} showZero>
            <Button
              onClick={() => {
                if (cartCount !== 0) {
                  navigate("/cart");
                } else {
                  alert("Your Cart is Empty!...");
                }
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  paddingRight: "5px",
                  color: "#b37feb",
                }}
              >
                Cart
              </span>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", color: "#b37feb" }}
              />
            </Button>
          </Badge>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <h1 className="text-center">{page}</h1>
        </Col>
        {getCategories ? (
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Select style={{ width: 120 }} onChange={handleChangeCat}>
              <Option value="">Select Category</Option>
              {getCategories.map((cat, index) => {
                const catUp = cat
                  .toLowerCase()
                  .replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                  });
                return (
                  <Option key={index} value={cat}>
                    {catUp}
                  </Option>
                );
              })}
            </Select>
          </Col>
        ) : (
          ""
        )}
      </Row>
      <hr />
    </>
  );
};

export default CartCount;
