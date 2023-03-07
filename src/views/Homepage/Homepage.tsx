import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "../../components/DatePicker/DatePicker";
import PassengersInput from "../../components/PassengersInput/PassengersInput";
import RouteCreator from "../../components/RouteCreator/RouteCreator";
import { CitiesService } from "../../services/CitiesService";
import HomepageStyles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { FormDataContext } from "../../context/FormDataProvider";
import { CalculatedDistancesContext } from "../../context/CalculatedDistancesProvider";

const Homepage = () => {
  const { firstCity, lastCity, intermediateCities } =
    useContext(FormDataContext);

  const { setCalculatedDistances } = useContext(CalculatedDistancesContext);

  const navigate = useNavigate();

  const onClickHandler = () => {
    const introducedCities = [firstCity, ...intermediateCities, lastCity];
    CitiesService.calculateDistance(introducedCities).then((result) => {
      setCalculatedDistances(result);
    });
    navigate("/results");
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
