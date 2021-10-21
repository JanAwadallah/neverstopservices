import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "semantic-ui-react";

export default function List() {
  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [displayStatus, setDisplayStatus] = useState("disabled");

  const getData = async () => {
    const res = await axios.get(`/list?selectedEmployee=${selectedEmployee}`);
    setLoaded(true);
    setData(res.data.data);
  };

  useEffect(() => {
    getData();
  }, [selectedEmployee]);

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
      <table
        key={item.id}
        className="ui structured striped celled small table unstackable"
      >
        <thead>
          <tr>
            <th colSpan="4" className="full-width">
              Name : {item.fullname}
            </th>
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
    <div style={{ margin: "10%" }} className="ui container">
      <Select
        onChange={(e) => {
          setSelectedEmployee(e.target.innerText);
          setDisplayStatus("");
        }}
        placeholder="Select Employee"
        options={[
          ...new Set(
            data.map((name) => {
              return name.fullname;
            })
          ),
        ].map((item) => {
          return {
            key: item,
            value: item,
            text: item,
          };
        })}
      />
      <button
        onClick={() => {
          setSelectedEmployee("");
          setDisplayStatus("disabled");
        }}
        style={{ marginLeft: 10 }}
        className={`ui button blue ${displayStatus}`}
      >
        Clear filter
      </button>
      {renderData(data)}
    </div>
  );
}
