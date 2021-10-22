import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import AutoComplete from "./Autocomplete";
import "./style.css";

const CheckForm = ({
  onSubmit,
  address,
  checkStatus,
  date,
  time,
  user,
  error,
  setError,
}) => {
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    errorDiv();
  }, [currentUser]);

  const errorDiv = (field) => {
    if (error) {
      return (
        <div className="ui negative message center aligned segment ">
          <h4>{field} can not be blanck</h4>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="container" style={{ width: "90vw" }}>
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
              "George Kalta",
              "Girgis Mansour",
              "Karim Ramez",
              "Makram Tadros",
              "Nader Sarkis",
              "Sumitpal Singh",
              "Youssf Gad",
            ]}
          />
          {errorDiv("Name")}
        </Form.Field>
        <Form.Field required>
          <label style={{ fontSize: 20 }}>Address</label>
          <input required value={address} />
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
            onSubmit(currentUser);
          }}
        >
          {checkStatus === "IN" ? "Check in" : "Check out"}
        </Button>
      </Form>
    </div>
  );
};

export default CheckForm;
