import React from "react";
import Form from "react-bootstrap/Form";
import DatePickerStyles from "./DatePicker.module.css";

const DatePicker = () => {
  return (
    <>
      <label>Date</label>
      <Form.Control
        type="date"
        name="date_of_birth"
        className={DatePickerStyles.datePicker}
      />
    </>
  );
};

export default DatePicker;
