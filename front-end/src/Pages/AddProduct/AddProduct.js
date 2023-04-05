import { useState, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import component
import Button from "../../Components/Button";

// import css
import "./style.css";

export default function AddProduct() {
  // bahan
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("Authorization");
  const push = useNavigate();

  // proses file image
  function addImage(e) {
    const img = e.target.files[0];
    setImage(img);
  }

  // proses add
  async function addProduct(e) {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/product/add', {
        nama_product: name,
        harga_product: price,
        stock: stock,
        description: desc,
        gambar: image
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res);

      push("/products");
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <h2 className="add-title">Add Product</h2>
      <form className="add-container" onSubmit={addProduct}>
        <div className="product-name-add">
          <label for="name">Nama Produk</label>
          <div className="input-add">
            {/* <input type="text" name="name-product" value={name} onchange={e => setName(e.target.value)} /> */}
            <input type="text" name="name-product" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>
        <div className="desc-product-add">
          <label for="desc">Deskripsi</label>
          <div className="input-add">
            <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
        </div>
        <div className="harga-prduct-add">
          <label for="price">Harga</label>
          <div className="input-add">
            <input type="text" name="price" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
        </div>
        <div className="stock-product-add">
          <label for="stock">Stok</label>
          <div className="input-add">
            <input type="text" name="stock" value={stock} onChange={e => setStock(e.target.value)} />
          </div>
        </div>
        <div className="gambar-product-add">
          <label for="image">Upload Gambar</label>
          <div className="input-add">
            <input type="file" name="image" onChange={addImage} />
          </div>
        </div>
        <Button className="btn-add" textbtn="Add" accept="submit" />
      </form>
    </div>
  );
}
