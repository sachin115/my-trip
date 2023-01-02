import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CityCard = () => {
  const { id } = useParams();
  const [adventures, setAdventures] = useState([]);
  const [adventuresCopyData, setAdventuresCopyData] = useState([]);
  const [duration, setDuration] = useState([]);
  const [category, setCategory] = useState("");

  const singleCity = async () => {
    try {
      const response = await axios.get(`/adventures?city=${id}`);
      setAdventures(response.data);
      setAdventuresCopyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DataFilter = async () => {
    let newCategorys = category;
    let newDuration = duration;
    if (newDuration.length === 0) newDuration = "0-130";
    const [lowerValue, upperValue] = newDuration.split("-");

    const filteredData = adventuresCopyData.filter((obj) => {
      console.log(obj);
      const { category, duration } = obj;
      return (
        duration <= upperValue &&
        duration >= lowerValue &&
        (newCategorys.length ? newCategorys.includes(category) : true)
      );
    });
    setAdventures(filteredData);
  };

  useEffect(() => {
    DataFilter();
  }, [duration, category]);

  useEffect(() => {
    singleCity();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <select
              className="form-select"
              style={{ width: "30%", marginTop: "5vh", marginLeft: "5vh" }}
              aria-label="Default select example"
              // multiple
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Add Category</option>
              <option value="Cycling">Cycling</option>
              <option value="Hillside">Hillside</option>
              <option value="Serene">Serene</option>
              <option value="Party">Party</option>
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              style={{ width: "30%", marginTop: "5vh", marginLeft: "5vh" }}
              aria-label="Default select example"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option selected>Filter By Duration (Hours)</option>
              <option value="0-2">0-2 Hours</option>
              <option value="2-6">2-6 Hours</option>
              <option value="6-12">6-12 Hours</option>
              <option value="12-130">12+ Hours</option>
            </select>
          </Col>
        </Row>
      </Container>
      {adventures.map((item) => {
        return (
          <>
            <div key={item.id} className="card mx-md-3 d-inline-block mb-3">
              <h6>{item.category}</h6>
              <Link to={`/adventure/${item.id}`}>
                <img
                  className="card-img-top"
                  src={item.image}
                  alt="Card image cap"
                  height="200"
                />
              </Link>
              <div className="card-body">
                <h5 className="text">{item.name}</h5>
                <div>
                  <h5 className="text">{`Duration${item.duration}   Hours`}</h5>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CityCard;
