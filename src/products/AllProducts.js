import {
  ArrowUpOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { BackTop, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavBar from "../pages/MainNavBar";
import "../products/products.css";
import { getAllProducts } from "../reducer/FethchProductsSlice";
import { baseurl } from "../common";

const AllProducts = () => {
  const productSel = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  const [showProducts, setShowProducts] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setShowProducts(productSel.data);
  }, [productSel]);

  const getData = () => {
    axios
      .get(baseurl + "/products")
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          dispatch(getAllProducts({ data }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MainNavBar />
      <div className="site-card-wrapper container">
        <h1 className="text-center">Shop</h1>
        <Row gutter={0}>
          {showProducts?.length > 0 &&
            showProducts?.map((data, index) => {
              return (
                <Col span={6} key={index}>
                  <Card
                    actions={[
                      <EyeOutlined
                        key={data.id}
                        onClick={() => navigate("/shop/" + data.id)}
                      />,
                      <ShoppingCartOutlined key={data.id} />,
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
            })}
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

export default AllProducts;
