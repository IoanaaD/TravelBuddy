import React, { useContext } from "react";
import { CalculatedDistancesContext } from "../../context/CalculatedDistancesProvider";
import { FormDataContext } from "../../context/FormDataProvider";
import FinalDestinationRow from "../FinalDestinationRow/FinalDestinationRow";
import RouteResultRow from "../RouteResultRow/RouteResultRow";
import RouteResultStyles from "./RouteResult.module.css";

const RouteResult = () => {
  const { firstCity, lastCity, intermediateCities, passengersNumber, date } =
    useContext(FormDataContext);
  const { calculatedDistances } = useContext(CalculatedDistancesContext);
  const citiesArray = [firstCity, ...intermediateCities];
  return (
    <div>
      {citiesArray.map((city, index) => (
        <RouteResultRow
          kmNumber={calculatedDistances[index]}
          cityName={city[0]}
        />
      ))}
      <FinalDestinationRow cityName={lastCity[0]} />
    </div>
  );
};

export default RouteResult;
