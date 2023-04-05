import { React, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import css
import "./style.css";

// import fontawesome
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Customer() {
  // bahan
  const [cDatas, setCDatas] = useState([]);
  const [searchC, setSearchC] = useState("");
  const token = localStorage.getItem("Authorization");

  // proses ambil data user
  async function getDataCustomers() {
    try {
      const res = await axios.get("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.message);
      setCDatas(res.data.message);
    } catch {}
  }

  //search customer result
  async function searchCustomerResult(value) {
    try {
      const res = await axios.get(
        `http://localhost:8000/search-user?nama_user=${value}`
      );
      setCDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataCustomers();
  }, [token]);

  useEffect(() => {
    searchCustomerResult(searchC);
  }, [searchC]);

  return (
    <div className="user wrapper">
      <div className="search-user">
        <input
          type="text"
          placeholder="search"
          value={searchC}
          onChange={(e) => setSearchC(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? searchCustomerResult(searchC) : null
          }
        />
        <FontAwesomeIcon
          onClick={() => searchCustomerResult(searchC)}
          icon={faMagnifyingGlass}
          style={{ color: "#7f5af0", cursor: "pointer" }}
        />
      </div>
      <div className="user-table">
        <table>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
          </tr>
          {cDatas.map((t, index) => (
            <tr key={index}>
              <td>{t.username}</td>
              <td>{t.email}</td>
              <td>{t.alamat}</td>
              <td>{t.no_telp}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
