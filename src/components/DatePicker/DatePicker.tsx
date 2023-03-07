import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { FormDataContext } from "../../context/FormDataProvider";
import DatePickerStyles from "./DatePicker.module.css";

const DatePicker = () => {
  const { date, setDate } = useContext(FormDataContext);

  return (
    <>
      <label>Date</label>
      <Form.Control
        type="date"
        name="date_of_birth"
        onChange={(e) => setDate(e.target.value)}
        className={DatePickerStyles.datePicker}
      />
    </>
  );
};

export default DatePicker;
