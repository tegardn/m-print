import { React, useState, useEffect } from "react";
import Card from "../../Components/Card";
import './style.css'
import axios from "axios";

export default function Overview() {
  // bahan
  const [pAmount, setPAmount] = useState(0);
  const [cAmount, setCAmount] = useState(0);
  const token = localStorage.getItem("Authorization");

  // proses angka product
  async function productTotal() {
    try {
      const res = await axios.get('http://localhost:8000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // bahan convert angka
      let dataConvert = res.data.message;
      setPAmount(dataConvert.length);
    
    } catch (err) {
      console.log(err);
    }
  }

  // proses angka customer
  async function customerTotal() {
    try {
      const res = await axios.get('http://localhost:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // bahan convert angka
      let dataConvert = res.data.message;
      setCAmount(dataConvert.length);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    productTotal();
    customerTotal();
  }, [token])

  return (
    <div className="overview">
      <div className="card-overview wrapper">
        <Card text="Total Product" number={pAmount} />
        <Card text="Total Customer" number={cAmount} />
      </div>
    </div>
  );
}
