import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// import component
import Button from "../../Components/Button";

// import css
import "./style.css";

export default function UpdateProduct() {
  // bahan
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("Authorization");
  const push = useNavigate();
  const { id } = useParams();

  // getProductUpdate
  async function getProductUpdate() {
    try {
      const res = await axios.get(`http://localhost:8000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(res);
      setName(res.data.message.nama_product);
      setDesc(res.data.message.description);
      setPrice(res.data.message.harga_product);
      setStock(res.data.message.stock);
      setImage(res.data.message.nama_gambar);
    } catch (err) {
      console.log(err);
    }
  }

  // proses file image
  function addImage(e) {
    const img = e.target.files[0];
    console.log(img);
    setImage(img);
  }

  // proses add
  async function updateProduct(e) {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:8000/product/update/${id}`,
        {
          nama_product: name,
          harga_product: price,
          stock: stock,
          description: desc,
          gambar: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      push("/products");
    } catch (err) {
      console.error(err);
    }
  }

  // end product
  useEffect(() => {
    getProductUpdate();
  }, [token, id]);

  return (
    <div>
      <h2 className="update-title">Update Product</h2>
      <form className="update-container" onSubmit={updateProduct}>
        <div className="product-name-update">
          <label for="name">Nama Produk</label>
          <div className="input-update">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="desc-product-update">
          <label for="desc">Deskripsi</label>
          <div className="input-update">
            <input
              type="text"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="harga-prduct-update">
          <label for="price">Harga</label>
          <div className="input-update">
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="stock-product-update">
          <label for="stock">Stok</label>
          <div className="input-update">
            <input
              type="text"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className="gambar-product-update">
          <label for="image">Upload Gambar</label>
          <div className="input-update">
            <input type="file" name="image" onChange={addImage} />
          </div>
        </div>
        <Button className="btn-update" textbtn="Update" accept="submit" />
      </form>
    </div>
  );
}
