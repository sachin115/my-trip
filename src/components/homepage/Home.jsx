import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [filterCity, setFilterCity] = useState([]);

  const cityPlaces = async () => {
    try {
      let response = await axios.get("/cities");
      setCities(response.data);
      setFilterCity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("call api");
    cityPlaces();
  }, []);

  useEffect(() => {
    const result = filterCity.filter((filtercity) => {
      return filtercity.city.toLowerCase().includes(searchCity.toLowerCase());
    });
    setCities(result);
  }, [searchCity]);

  return (
    <>
      <div className="hero-image">
        <input
          type="text"
          className="hero-input"
          value={searchCity}
          placeholder="Search a City"
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>
      {cities.map((item) => {
        return (
          <div className="card mx-md-3 d-inline-block mb-3">
            <Link to={`/${item.id}`}>
              <img
                className="card-img-top"
                src={item.image}
                alt="Card image cap"
                height="250px"
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{item.city}</h5>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
