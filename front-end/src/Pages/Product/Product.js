import { useEffect, useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

// import css
import "./style.css";

// import fontawesome
import {
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function Product() {
  // bahan
  const [datas, setDatas] = useState([]);
  const [searchP, setSearchP] = useState("");
  const token = localStorage.getItem("Authorization");

  // proses get data
  async function getDataProduct() {
    try {
      const res = await axios.get("http://localhost:8000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(res.data.message);
      // console(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // delete data
  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:8000/product/del/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getDataProduct();
    } catch (err) {
      console.log(err);
    }
  }

  //search product result 
  async function searchProductResult(value) {
    try {
      const res = await axios.get(`http://localhost:8000/search?nama_product=${value}`);
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect
  useEffect(() => {
    getDataProduct();
  }, [token]);

  useEffect(() => {
    setSearchP(searchP);
  }, [searchP])

  return (
    <div className="product wrapper">
      <div className="container">
        <div className="search-product">
          <input
            type="text"
            placeholder="search"
            value={searchP}
            onChange={e => setSearchP(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? searchProductResult(searchP) : null}
          />
          <FontAwesomeIcon
            onClick={() => searchProductResult(searchP)}
            icon={faMagnifyingGlass}
            style={{ color: "#7f5af0", cursor: 'pointer' }}
          />
        </div>
        <div className="add-product">
          <Link to="/products/add">
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#7f5af0", fontSize: "24px" }}
            />
          </Link>
        </div>
      </div>
      <div className="product-table">
        <table>
          <tr>
            <th>Nama</th>
            <th>Gambar</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{data.nama_product}</td>
              <td>
                <img src={data.url_gambar} alt={data.nama_gambar} />
              </td>
              <td>{data.description}</td>
              <td>{data.harga_product}</td>
              <td>{data.stock}</td>
              <td>
                <Link to={`/products/edit/${data.id_product}`}>
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{
                      marginRight: "12px",
                      fontSize: "18px",
                      color: "#7f5af0",
                    }}
                  />
                </Link>
                <FontAwesomeIcon
                  onClick={() => deleteProduct(data.id_product)}
                  icon={faTrash}
                  style={{
                    fontSize: "18px",
                    color: "#7f5af0",
                    cursor: "pointer",
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
