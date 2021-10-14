import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const FormExampleForm = ({
  onSubmit,
  address,
  currentUser,
  checkStatus,
  date,
  time,
}) => (
  <div
    style={{
      width: "90vw",
    }}
  >
    <Form className="ui container">
      <Form.Field>
        <label style={{ fontSize: 20 }}>Full Name</label>
        <input value={currentUser} />
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
        onClick={onSubmit}
      >
        {checkStatus === "IN" ? "Check in" : "Check out"}
      </Button>
    </Form>
  </div>
);

export default FormExampleForm;
