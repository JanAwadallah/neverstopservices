import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "semantic-ui-react";

export default function List() {
  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [displayStatus, setDisplayStatus] = useState("disabled");
  const [displayStatusDate, setDisplayStatusDate] = useState("disabled");

  const getData = async () => {
    const res = await axios.get(`/list`);
    setLoaded(true);
    setData(res.data.data);
    filtered(res.data.data);
  };

  const filtered = (arr) => {
    const filteredData = arr.filter((item) => {
      if (selectedDate || selectedEmployee) {
        if (selectedDate && selectedEmployee) {
          if (
            item.date === selectedDate &&
            item.fullname === selectedEmployee
          ) {
            return item;
          }
        } else if (!selectedDate) {
          if (item.fullname === selectedEmployee) {
            return item;
          }
        } else if (!selectedEmployee) {
          if (item.date === selectedDate) {
            return item;
          }
        }
      } else {
        return item;
      }
    });
    setSelectedData(filteredData);
  };

  useEffect(() => {
    getData();
  }, [selectedEmployee, selectedDate]);

  console.log(selectedData);

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
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Select
            value={selectedEmployee}
            id="selectName"
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
            style={{ margin: 10 }}
            className={`ui button blue ${displayStatus}`}
          >
            Clear Name filter
          </button>
        </div>
        <div>
          <Select
            value={selectedDate}
            id="selectDate"
            onChange={(e) => {
              setSelectedDate(e.target.innerText);
              setDisplayStatusDate("");
            }}
            placeholder="Select Date"
            options={[
              ...new Set(
                data.map((dateFilter) => {
                  return dateFilter.date;
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
              setSelectedDate("");
              setDisplayStatusDate("disabled");
            }}
            style={{ margin: 10 }}
            className={`ui button blue ${displayStatusDate}`}
          >
            Clear Date filter
          </button>
        </div>
      </div>
      <div style={{ paddingBottom: "10%" }}> {renderData(selectedData)}</div>
    </div>
  );
}
