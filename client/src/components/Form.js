import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import AutoComplete from "./Autocomplete";
import "./style.css";

const CheckForm = ({
  onSubmit,
  checkStatus,
  date,
  time,
  user,
  error,
  address,
}) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [manAddress, setManAddress] = useState("");

  const errorDiv = (field) => {
    if (error) {
      return (
        <div className="ui negative message center aligned segment ">
          <h4>{field} can not be blank</h4>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div
      className=" ui form centered "
      style={{ width: "90vw", maxWidth: 500 }}
    >
      <Form onkeydown="return event.key != 'Enter';">
        <Form.Field required>
          <label style={{ fontSize: 20 }}>Full Name</label>
          {/* <input
            id="fullname"
            value={currentUser}
            onChange={(e) => {
              setCurrentUser(e.target.value);
              setError(false);
            }}
            placeholder="Please enter your Full Name"
          /> */}
          <AutoComplete
            setCurrentUser={setCurrentUser}
            suggestions={[
              "Eralnta Kantioli",
              "Girgis Mansour",
              "George Kalta",
              "Karim Ramez",
              "Makram Tadros",
              "Nader Sarkis",
              "Sumitpal Singh",
              "Youssef Gad",
            ]}
          />
          {!currentUser && errorDiv("Name")}
        </Form.Field>
        <Form.Field required>
          <label style={{ fontSize: 20 }}>Address</label>
          <input
            value={address ? address : manAddress}
            onChange={(e) => {
              setManAddress(e.target.value);
            }}
          />
          {!manAddress && !address && errorDiv("address")}
        </Form.Field>
        <Form.Field required>
          <label style={{ fontSize: 20 }}>Date</label>
          <input required value={date} />
        </Form.Field>
        <Form.Field required>
          <label style={{ fontSize: 20 }}>Time</label>
          <input required value={time} />
        </Form.Field>

        <Button
          style={{ fontSize: 20 }}
          className="fluid ui button"
          type="submit"
          onkeydown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              return false;
            }
          }}
          onClick={() => {
            onSubmit(currentUser, manAddress);
          }}
        >
          {checkStatus === "IN" ? "Check in" : "Check out"}
        </Button>
      </Form>
    </div>
  );
};

export default CheckForm;
