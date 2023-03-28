import React from 'react'
import Logo from '../Logo'
import Menu from './Menu'
import './style.css'

export default function SideBar() {
  return (
    <div className='sidebar wrapper'>
        <Logo />      
        <Menu />
    </div>
  )
}
