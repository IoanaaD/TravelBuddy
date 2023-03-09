import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import { ErrorsContext } from "../../context/ErrorsProvider";
import { FormDataContext } from "../../context/FormDataProvider";
import DatePickerStyles from "./DatePicker.module.css";

const DatePicker = () => {
  const { date, setDate } = useContext(FormDataContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { errors } = useContext(ErrorsContext);

  const selectDateHandler = (e: any) => {
    setDate(e.target.value);
    searchParams.set("date", e.target.value.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <label>Date</label>
      <Form.Control
        type="date"
        name="date_of_birth"
        onChange={selectDateHandler}
        className={DatePickerStyles.datePicker}
        defaultValue={date}
      />
      {errors.date && (
        <p className={DatePickerStyles.errorMessageStyle}>{errors.date}</p>
      )}
    </>
  );
};

export default DatePicker;
