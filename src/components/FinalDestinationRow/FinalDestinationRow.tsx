import React from "react";
import { FinalDestinationIcon } from "../../assets/icons";
import FinalDestinationRowStyles from "./FinalDestinationRowStyles.module.css";

const FinalDestinationRow: React.FC<{
  cityName: string;
}> = ({ cityName }) => {
  return (
    <div className={FinalDestinationRowStyles.rowContainer}>
      <FinalDestinationIcon />
      <p>{cityName}</p>
    </div>
  );
};

export default FinalDestinationRow;
