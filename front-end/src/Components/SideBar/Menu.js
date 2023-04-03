import React from 'react';
import { Link } from 'react-router-dom';

// import css
import './style.css';

export default function Menu() {
  return (
    <ul className="menu">
      <li>
        <Link to="/" className='link'>Overview</Link>
      </li>
      <li>
        <Link to="customers" className='link'>Customer</Link>
      </li>
      <li>
        <Link to="/products" className='link'>Product</Link>
      </li>  
    </ul>
  )
}
