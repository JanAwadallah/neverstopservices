import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function List() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getData = async () => {
    const res = await axios.get("/list");
    setLoaded(true);
    setData(res.data.data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [data]);

  const renderData = (arr) => {
    if (arr.length === 0) {
      return (
        <tr>
          <td>
            <div style={{ marginTop: 30 }}>
              <center>
                <h1>No data to display</h1>
              </center>
            </div>
          </td>
        </tr>
      );
    }
    return arr.map((item) => (
      <table className="ui structured striped celled small table unstackable">
        <thead>
          <tr>
            <th colSpan="4" class="full-width">
              Name
            </th>
          </tr>
          <tr>
            <td data-label="Name">{item.fullname}</td>
          </tr>
          <tr>
            <th className="four wide">Adress</th>
            <th className="one wide">Date</th>
            <th className="one wide">Time</th>
            <th className="one wide">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Address">{item.address}</td>
            <td data-label="Date">{item.date}</td>
            <td data-label="Time">{item.time}</td>
            <td data-label="Status">{item.status}</td>
          </tr>
        </tbody>
      </table>
    ));
  };

  if (!loaded) {
    return (
      <div className="ui segment" style={{ height: "100vh" }}>
        <div className="ui active dimmer">
          <div className="ui massive text loader">Loading</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </div>
    );
  }

  return (
    <div style={{ padding: "5%" }} className="ui container">
      {renderData(data)}
    </div>
  );
}
