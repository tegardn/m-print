import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import component
import Logo from "../Logo";

// import css
import "./style.css";


// import icon
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <Logo />
      <div className="profile-customer">
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#7f5af0", fontSize: "30px" }}
        />
      </div>
    </header>
  );
}
