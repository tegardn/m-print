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
      const res = await axios.get("http://localhost:8000/profile", {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      console.log(res.data.message.username)
      setUser(res.data.message.username)
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
          style={{ color: "#fff", fontSize: "30px" }}
        />
      </div>
    </div>
  );
}
