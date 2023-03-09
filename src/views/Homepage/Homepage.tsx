import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "../../components/DatePicker/DatePicker";
import PassengersInput from "../../components/PassengersInput/PassengersInput";
import RouteCreator from "../../components/RouteCreator/RouteCreator";
import { CitiesService } from "../../services/CitiesService";
import HomepageStyles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { FormDataContext } from "../../context/FormDataProvider";
import { CalculatedDistancesContext } from "../../context/CalculatedDistancesProvider";
import * as yup from "yup";
import { ErrorsContext } from "../../context/ErrorsProvider";

const schema = yup.object().shape({
  firstCity: yup.string().required("You must choose the city of origin"),
  lastCity: yup.string().required("You must choose the city of destination"),
  passengersNumber: yup.number().min(1, "Select passengers").required("test"),
  intermediateCities: yup.array().of(
    yup
      .array()
      .of(yup.mixed().oneOf([yup.string(), yup.number()]))
      .test(
        "is-valid",
        "Please select a intermediate destination",
        (value) =>
          value &&
          value.length === 3 &&
          typeof value[0] === "string" &&
          value[0].trim() !== "" &&
          typeof value[1] === "number" &&
          typeof value[2] === "number"
      )
  ),
  date: yup
    .string()
    .test("is-future-date", "Date must be in the future", (value) => {
      if (value) {
        return validateDate(value);
      }
      return false;
    })
    .required("Date is required"),
});

const validateDate = (value: string): boolean => {
  let myDate = new Date(value);
  let isDateValid = false;
  if (myDate > new Date()) {
    isDateValid = true;
  } else {
    isDateValid = false;
  }
  return isDateValid;
};

const Homepage = () => {
  const { firstCity, lastCity, intermediateCities, passengersNumber, date } =
    useContext(FormDataContext);
  const { setErrors } = useContext(ErrorsContext);

  const { setCalculatedDistances } = useContext(CalculatedDistancesContext);
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  const isFormValid = async (): Promise<boolean> => {
    let formValidity = false;
    const formData = {
      firstCity: firstCity[0],
      lastCity: lastCity[0],
      passengersNumber,
      intermediateCities,
      date,
    };

    await schema
      .validate(formData, { abortEarly: false })
      .then((result) => {
        console.log("Data is valid", result);
        formValidity = true;
      })
      .catch((errors) => {
        const receivedErrorMessages: any = {};
        errors.inner.forEach((error: any) => {
          receivedErrorMessages[error.path] = error.message;
        });
        console.log("RECEIVED ERRORS", receivedErrorMessages);
        setErrors(receivedErrorMessages);
        formValidity = false;
      });
    return formValidity;
  };

  const onClickHandler = () => {
    isFormValid().then((isValid) => {
      if (isValid) {
        navigate("/results");
      }
      const introducedCities = [firstCity, ...intermediateCities, lastCity];
      CitiesService.calculateDistance(introducedCities).then((result) => {
        setCalculatedDistances(result);
      });
    });
  };
  return (
    <Container className={HomepageStyles.homepageContainer}>
      <Row>
        <Col md={6}>
          <RouteCreator />
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12} xs={6}>
              <PassengersInput />
            </Col>
            <Col md={12} xs={6}>
              <DatePicker />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={HomepageStyles.submitBtnContainer}>
        <Button className={HomepageStyles.submitBtn} onClick={onClickHandler}>
          Submit
        </Button>
      </Row>
    </Container>
  );
};

export default Homepage;
