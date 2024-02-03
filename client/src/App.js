import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Header/Footer.js";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Products/Products.js";
import LoginSignup from "./components/LoginSignup.js";
import Profile from "./components/Profile/Profile.js";
import axios from "axios";
import WebFont from "webfontloader";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import UserMenu from "./components/layout/UserMenu.js";
import Dashboard from "./components/Admin/Dashboard.js";
import AdminProducts from "./components/Admin/AdminProducts.js";
import ProductCreate from "./components/Admin/ProductCreate.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import AdminOrders from "./components/Admin/AdminOrders.js";
import AdminUsers from "./components/Admin/AdminUsers.js";
import UserProfile from "./components/Admin/UserProfile.js";
import UpdateProfile from "./components/Profile/UpdateProfile.js";
import UpdatePassword from "./components/Profile/UpdatePassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import Success from "./components/Cart/Success.js";
import MyOrders from "./components/Orders/MyOrders.js";
import OrderDetails from "./components/Orders/OrderDetails.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripekey, setstripekey] = useState("");

  async function getStripeKey() {
    // const {data} = await axios.get("/api/v1/stripekey")
    // setstripekey(data.stripeKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto",
          "Droid Sans",
          "Chilanka",
          "Victor Mono",
          "monospace",
        ],
      },
    });

    store.dispatch(loadUser());
    getStripeKey();
  }, []);
  return (
    <>
      <Router>
        {isAuthenticated && <UserMenu user={user} />}
        <Header />
        <Elements
          stripe={loadStripe(
            "pk_test_51OfOCiSHvd1E0WuzmQMmVI3xYmSqJmq0ea7wyTZ2iokCIqiyc1NdcoayLmQm9Iucq7MHh1DpsDfLyph8m5o3fxm800MQRyq4n7"
          )}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route
              exact
              path="/cart"
              element={isAuthenticated ? <Cart /> : <LoginSignup />}
            />
            <Route exact path="/login" element={<LoginSignup />} />
            <Route path="/products/:keyword" element={<Products />} />
            {isAuthenticated && <Route path="/profile" element={<Profile />} />}
            {isAuthenticated && (
              <Route path="/profile/update" element={<UpdateProfile />} />
            )}
            {isAuthenticated && (
              <Route
                path="/profile/changepassword"
                element={<UpdatePassword />}
              />
            )}
            {isAuthenticated && (
              <Route path="/shipping" element={<Shipping />} />
            )}
            {isAuthenticated && (
              <Route path="/order/confirm" element={<ConfirmOrder />} />
            )}
            {isAuthenticated && (
              <Route path="/order/success" element={<Success />} />
            )}
            {isAuthenticated && <Route path="/orders" element={<MyOrders />} />}
            {isAuthenticated && (
              <Route path="/order/:id" element={<OrderDetails />} />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route path="/Admin/products" element={<AdminProducts />} />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route
                path="/Admin/products/create"
                element={<ProductCreate />}
              />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route path="/Admin/product/:id" element={<UpdateProduct />} />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route path="/Admin/orders" element={<AdminOrders />} />
            )}
            {isAuthenticated && user.role === "admin" && (
              <Route path="/Admin/users" element={<AdminUsers />} />
            )}
            {/* {isAuthenticated &&  user.role === 'admin'  && <Route path="/Admin/user/:id" element = {<UserProfile/>}/>} */}

            {isAuthenticated && (
              <Route path="/order/payment" element={<Payment />} />
            )}
          </Routes>
        </Elements>
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
