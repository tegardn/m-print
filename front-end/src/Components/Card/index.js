import React from 'react'
import './style.css'

export default function Card({text, number}) {
  return (
    <div className='card'>
        <p>{text}</p>
        <p>{number}</p>
    </div>
  )
}
