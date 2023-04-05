import { useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

// import component
import Button from "../../Components/Button";

// icon
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

// import css
import "./style.css";

export default function Login() {
  // bahan
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const push = useNavigate();

  // process register
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("Authorization", res.data.token);
      push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  // showpassword
  function showPass() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="box-login">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="email-login">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "#7f5af0", fontSize: "1.5rem" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-login">
            <FontAwesomeIcon
              icon={faLock}
              style={{ color: "#7f5af0", fontSize: "1.5rem" }}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              onClick={showPass}
              icon={showPassword ? faEyeSlash : faEye}
              style={{ color: "#7f5af0", fontSize: "1.2rem" }}
            />
          </div>
          <Button className="btn-login" textbtn="Login" accept="submit" />
          <p className="link-register">
            If you don't have account,
            <Link to="/register" className="link">
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
