import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../common";
import axios from "axios";
import { Button, Col, Image, Row } from "antd";
import MainNavBar from "../pages/MainNavBar";
import { addToCart } from "../reducer/CartSlice";
import { addCart } from "../common/AddCart";
import { useDispatch, useSelector } from "react-redux";
import CartCount from "../pages/CartCount";

const ProductDetail = () => {
  const page = "Product Details";
  let { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState("");
  const cartSel = useSelector((state) => state.CartManage.cartData);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct(productId);
  }, []);

  const getProduct = (Id) => {
    axios
      .get(baseurl + "/products/" + Id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setProductData(data);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  const addToCartHandle = async (data) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    console.log("addToCart", today);
    const setCart = await addCart({
      userId: 5,
      date: today,
      products: data,
    });
    if (setCart) {
      dispatch(addToCart({ data: setCart }));
    }
  };

  return (
    <>
      <MainNavBar />
      <div className="container">
        <CartCount page={page} cartCount={cartSel.length} />
        <Row>
          <Col span={24}>
            {productData.title ? (
              <h1 className="text-center mt-4" style={{ color: "#69c0ff" }}>
                {productData.title}
              </h1>
            ) : (
              ""
            )}
            <hr className="bg-info" />
          </Col>
          {productData.image ? (
            <Col span={12} className="text-center">
              <Image width={500} src={productData.image} />
            </Col>
          ) : (
            ""
          )}
          <Col span={12} className="mt-4">
            <Row>
              {productData.title ? (
                <Col span={24}>
                  <h2 className="text-success h3">{productData.title}</h2>
                  <hr />
                </Col>
              ) : (
                ""
              )}
              <Col span={24}>
                {productData.price ? (
                  <p className="text-info">
                    Price:
                    <span className="text-danger">${productData.price}</span>
                  </p>
                ) : (
                  ""
                )}
                {productData.category ? (
                  <p className="text-info">
                    Category:
                    <span className="text-danger">{productData.category}</span>
                  </p>
                ) : (
                  ""
                )}
                {productData.description ? (
                  <p>
                    Description:
                    <span className="text-secondary">
                      {productData.description}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <Button
                  type="dashed"
                  className="mx-4"
                  danger
                  ghost
                  size="default"
                  onClick={() => addToCartHandle(productData)}
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
