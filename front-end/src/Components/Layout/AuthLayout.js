import React from 'react'
import { Outlet } from "react-router-dom";

import './css/Auth.css';

export default function AuthLayout() {
  return (
    <div className='background'>
        <Outlet />
    </div>
  )
}
