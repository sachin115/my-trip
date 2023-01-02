import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityCard from "./components/citycard/CityCard";
import Header from "./components/header/Header";
import Home from "./components/homepage/Home";
import PlaceDetailes from "./components/placedetailes/PlaceDetailes";
import Reservations from "./components/reservetions/Reservations";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CityCard />} />
        <Route path="/reservation" element={<Reservations />} />
        <Route path="/adventure/:id" element={<PlaceDetailes />} />
      </Routes>
    </Router>
  );
}
