import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Reaservations = () => {
  const navigate = useNavigate();

  const [reservedPlace, setReservedPlace] = useState([]);

  const reservePlace = async () => {
    try {
      const response = await axios.get("/reservations/");
      setReservedPlace(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const routeAdventure = (event) => {
    navigate(`/adventure/${event}`);
  };

  useEffect(() => {
    reservePlace();
  }, []);
  return (
    <div>
      <table className="table" style={{ marginTop: "2vh" }}>
        <thead>
          <tr
            style={{
              color: "white",
              width: "100%",
              backgroundColor: "#101010",
            }}
          >
            <th scope="col">Transaction ID</th>
            <th scope="col">Booking Name</th>
            <th scope="col">Adventure</th>
            <th scope="col">Persion(s)</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Booking Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservedPlace.map((place) => {
            return (
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.name}</td>
                <td>{place.adventureName}</td>
                <td>{place.person}</td>
                <td>{place.date}</td>
                <td>{place.price}</td>
                <td>{moment(place.time).format("HH:mm")}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => routeAdventure(place.adventure)}
                  >
                    visit adventure
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reaservations;
