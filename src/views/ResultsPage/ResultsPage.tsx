import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RouteResult from "../../components/RouteResult/RouteResult";
import { CalculatedDistancesContext } from "../../context/CalculatedDistancesProvider";
import { FormDataContext } from "../../context/FormDataProvider";
import ResultsPageStyles from "./ResultsPage.module.css";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { calculatedDistances } = useContext(CalculatedDistancesContext);
  const { passengersNumber, date } = useContext(FormDataContext);
  const totalDistance = calculatedDistances.reduce(
    (partialSum, distance) => partialSum + distance,
    0
  );

  return (
    <Container className={ResultsPageStyles.containerExtraStyle}>
      <RouteResult />
      <p>
        <span className={ResultsPageStyles.textStyle}>{totalDistance}</span> is
        total distance
      </p>
      <p>
        <span className={ResultsPageStyles.textStyle}>{passengersNumber}</span>{" "}
        passengers
      </p>

      <p className={ResultsPageStyles.textStyle}> {date}</p>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default ResultsPage;
