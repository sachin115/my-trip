import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PlaceDetailes = () => {
  const { id } = useParams();

  const [place, setPlace] = useState({});
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [person, setPerson] = useState(0);
  const [reserved, setReserved] = useState(false);

  const placeData = async () => {
    try {
      const response = await axios.get(`/adventures/detail?adventure=${id}`);
      setPlace(response.data);
      setReserved(response.data.reserved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    placeData();
  }, []);

  const PlaceFormDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/reservations/new", {
        name,
        date,
        person,
        adventure: id,
      });
      setReserved(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="card" style={{ width: "100%", height: "100%" }}>
            <div className="card-body">
              <h5 className="card-title">{place.name}</h5>
              <p className="card-subtitle">{place.subtitle}</p>
              <img
                className="card-img-top"
                src={place.images}
                alt="Card image cap"
                height="500px"
              />
              <h5 className="text">About the Experience</h5>
              <p className="card-text">{place.content}</p>
            </div>
          </div>
        </Col>
        {reserved ? (
          <Col style={{ height: "20vh" }}>
            <div className="card" style={{ width: "50%", height: "25vh" }}>
              <h5 style={{ marginTop: "3vh", marginLeft: "3vh" }}>Sold Out!</h5>
              <hr />
              <p>
                This activity is currently sold out. But there's a lot more to
                explore.
              </p>
            </div>
          </Col>
        ) : (
          <Col style={{ marginTop: "20vh" }}>
            <div className="card" style={{ width: "100%" }}>
              <form style={{ marginLeft: "10vh" }}>
                <div className="form-row">
                  <div className="form-group col-md-8">
                    <label for="inputEmail4">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-8">
                    <label for="inputPassword4">Pick a Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4" style={{ marginTop: "2vh" }}>
                        <h6>person(s)</h6>
                        <p>{`${place.costPerHead}`}₹</p>
                      </div>
                      <div className="col-md-4" style={{ marginTop: "3vh" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={person}
                          onChange={(e) => setPerson(e.target.value)}
                        />
                        <span value={person}>
                          Total={place.costPerHead * person}₹
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={(e) => PlaceFormDetails(e)}
                >
                  Reserve
                </button>
              </form>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PlaceDetailes;
