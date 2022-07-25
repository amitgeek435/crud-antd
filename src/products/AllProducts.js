import {
  ArrowUpOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, BackTop, Badge, Card, Col, Row, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNavBar from "../pages/MainNavBar";
import "../products/products.css";
import {
  getAllProducts,
  getAllCategories,
} from "../reducer/FethchProductsSlice";
import { baseurl } from "../common";
import Footer from "../pages/Footer";
import CartCount from "../pages/CartCount";
import { addCart } from "../common/AddCart";
import { addToCart } from "../reducer/CartSlice";

const AllProducts = () => {
  const shop = "Shop";
  const productSel = useSelector((state) => state.getProducts.allProductsData);
  const catSel = useSelector((state) => state.getProducts.allCategoryData);
  const cartSel = useSelector((state) => state.CartManage.cartData);
  const dispatch = useDispatch();
  const [showProducts, setShowProducts] = useState();
  const [getCategories, setgetCategories] = useState();
  const [cartCount, setcartCount] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    getData();
    getCategoryData();
  }, []);

  useEffect(() => {
    setShowProducts(productSel);
    setgetCategories(catSel);
  }, [productSel, catSel]);

  useEffect(() => {
    setcartCount(cartSel.length);
  }, [cartSel]);

  const getData = async () => {
    await axios
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

  const getCategoryData = async () => {
    await axios
      .get(baseurl + "/products/categories")
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          dispatch(getAllCategories({ data }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCartFun = async (data) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
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
      <div className="site-card-wrapper container">
        <CartCount
          page={shop}
          getCategories={getCategories}
          cartCount={cartCount}
        />
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
                      <ShoppingCartOutlined
                        key={data.id}
                        onClick={() => addToCartFun(data)}
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
            })}
        </Row>
        <BackTop>
          <div className="backtotop-btn">
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
