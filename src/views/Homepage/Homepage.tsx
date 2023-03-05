import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "../../components/DatePicker/DatePicker";
import PassengersInput from "../../components/PassengersInput/PassengersInput";
import RouteCreator from "../../components/RouteCreator/RouteCreator";
import HomepageStyles from "./Homepage.module.css";

const Homepage = () => {
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
        <Button className={HomepageStyles.submitBtn}>Submit</Button>
      </Row>
    </Container>
  );
};

export default Homepage;
