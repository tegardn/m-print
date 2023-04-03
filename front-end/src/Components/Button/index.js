import React from "react";
import { Link } from "react-router-dom";


export default function Button({
  textbtn,
  className,
  accept
}) {
  return (
    <button className={className} type={accept}>
      {textbtn}
    </button>
  );
}
