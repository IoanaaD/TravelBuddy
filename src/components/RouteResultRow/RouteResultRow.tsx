import React from "react";
import { DistanceBox } from "../../assets/icons";
import { CitiesConnector } from "../../assets/icons/CitiesConnector";
import RouteResultRowStyles from "./RouteResultRow.module.css";

const RouteResultRow: React.FC<{
  kmNumber: number;
  cityName: String;
}> = ({ kmNumber, cityName }) => {
  return (
    <div className={RouteResultRowStyles.routeRow}>
      <div className={RouteResultRowStyles.distanceContainer}>
        <div className={RouteResultRowStyles.relativePosition}>
          <DistanceBox />
          <p className={RouteResultRowStyles.kmNumber}>{kmNumber}</p>
        </div>
      </div>
      <div>
        <CitiesConnector />
      </div>
      <div>{cityName}</div>
    </div>
  );
};

export default RouteResultRow;
