import React from "react";
import { Routes, Route } from "react-router-dom";

// import protect
import ProtectRoute from "./ProtectRoute";

// layout
import AdminLayout from "../Components/Layout/AdminLayout";
import AuthLayout from "../Components/Layout/AuthLayout";
import CustomerLayout from "../Components/Layout/CustomerLayout";

// pages
import Customer from "../Pages/Customer/Customer";
import Login from "../Pages/Login/Login";
import Overview from "../Pages/Overview/Overview";
import Product from "../Pages/Product/Product";
import RegisterAdmin from "../Pages/RegisterAdmin/RegisterAdmin";
import AddProduct from "../Pages/AddProduct/AddProduct";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";
import HomePage from "../Pages/HomePage";

export default function Router() {
  return (
    <Routes>
      <Route element={<ProtectRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Overview />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
        </Route>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAdmin />} />
      </Route>
    </Routes>
  );
}
