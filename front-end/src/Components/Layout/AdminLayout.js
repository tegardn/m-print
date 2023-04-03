import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "../Profile/Index";

// import component
import SideBar from "../SideBar/Index";

// import css
import "./css/Admin.css";

export default function AdminLayout() {
  return (
    <div className="layout">
      <div className="h-comopnent">
        <SideBar />
      </div>
      <div className="p-component">
        <Profile />
      </div>
      <Outlet />
    </div>
  );
}
