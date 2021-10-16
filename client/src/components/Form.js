import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const CheckForm = ({ onSubmit, address, checkStatus, date, time }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div
      style={{
        width: "90vw",
      }}
    >
      <Form className="ui container">
        <Form.Field>
          <label style={{ fontSize: 20 }}>Full Name</label>
          <input
            value={currentUser}
            onChange={(e) => {
              setCurrentUser(e.target.value);
            }}
            placeholder="Please enter your Full Name      أكتب الاسم بالكامل"
          />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: 20 }}>Address</label>
          <input value={address} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: 20 }}>Date</label>
          <input value={date} />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: 20 }}>Time</label>
          <input value={time} />
        </Form.Field>

        <Button
          style={{ fontSize: 20 }}
          className="fluid ui button"
          type="submit"
          onClick={(user) => onSubmit(currentUser)}
        >
          {checkStatus === "IN" ? "Check in" : "Check out"}
        </Button>
      </Form>
    </div>
  );
};

export default CheckForm;
