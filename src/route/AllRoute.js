import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "../pages/UserForm";
import AllProducts from "../products/AllProducts";
import Cart from "../products/Cart";
import ProductDetail from "../products/ProductDetail";

const AllRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserForm />}></Route>
          <Route path="/shop" exact element={<AllProducts />}></Route>
          <Route
            path="/shop/:productId"
            exact
            element={<ProductDetail />}
          ></Route>
          <Route path="/cart" exact element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default AllRoute;
