import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../common";
import axios from "axios";
import { Button, Col, Image, Row } from "antd";
import MainNavBar from "../pages/MainNavBar";

const ProductDetail = () => {
  let { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState("");
  useEffect(() => {
    getProduct(productId);
  }, []);

  const getProduct = (Id) => {
    axios
      .get(baseurl + "/products/" + Id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log(data);
          setProductData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MainNavBar />
      <div className="container">
        <Row>
          <Col span={24}>
            <h1 className="text-center mt-4 text-success">
              {productData.title}
            </h1>
            <hr className="bg-info" />
          </Col>
          <Col span={12} className="text-center">
            <Image width={500} src={productData.image} />
          </Col>
          <Col span={12} className="mt-4">
            <Row>
              <Col span={24}>
                <h2 className="text-success h3">{productData.title}</h2>
                <hr />
              </Col>
              <Col span={24}>
                <p className="text-info">
                  Price:{" "}
                  <span className="text-danger">${productData.price}</span>
                </p>
                <p className="text-info">
                  Category:{" "}
                  <span className="text-danger">{productData.category}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="text-secondary">
                    {productData.description}
                  </span>
                </p>
                <Button
                  type="dashed"
                  className="mx-4"
                  danger
                  ghost
                  size="default"
                >
                  Add To Cart
                </Button>
                <Button
                  type="dashed"
                  danger
                  ghost
                  size="default"
                  onClick={() => navigate("/shop")}
                >
                  Back To Shop
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;
