import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const homeRoute = () => {
    navigate("/");
  };

  const reservationRoute = () => {
    navigate("/reservation");
  };
  return (
    <div className="header">
      <button
        type="button"
        style={{ color: "white" }}
        className="btn"
        onClick={reservationRoute}
      >
        RESERVATIONS
      </button>
      <button
        type="button"
        style={{ color: "white" }}
        className="btn"
        onClick={homeRoute}
      >
        HOME
      </button>
      <h1 style={{color:"white"}}>ONE IN A MILLION</h1>
    </div>
  );
};

export default Header;
