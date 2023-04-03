import { useState, React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// import css
import "./style.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("Authorization");

  async function showProfile() {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      setUser(res.data.message.nama)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showProfile()
  }, [token])

  return (
    <div className="profile wrapper">
      <div className="p-text">Hi, {user}</div>
      <div className="p-image">
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#7f5af0", fontSize: "30px" }}
        />
      </div>
    </div>
  );
}
