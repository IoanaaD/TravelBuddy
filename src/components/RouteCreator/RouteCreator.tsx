import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DestinationInput from "../DestinationInput/DestinationInput";
import RouteCreatorStyles from "./RouteCreator.module.css";
import { v4 as uuid } from "uuid";
import { TrashIcon } from "../../assets/icons";
import PassengersInput from "../PassengersInput/PassengersInput";
import DatePicker from "../DatePicker/DatePicker";

const RouteCreator = () => {
  const [intemediateDestinations, setIntemediateDestinations] = useState<{
    [key: string]: string;
  }>({});
  const deleteIntermediateDestination = (key: string) => {
    const copy = { ...intemediateDestinations };
    delete copy[key];
    setIntemediateDestinations(copy);
  };

  return (
    <div className={RouteCreatorStyles.routeCreatorContainer}>
      <DestinationInput label="City of origin" />
      {Object.keys(intemediateDestinations).map((key) => (
        <div className={RouteCreatorStyles.intermediateDestinationContainer}>
          <DestinationInput key={key} label="Intermediate destination" />
          <div onClick={() => deleteIntermediateDestination(key)}>
            <TrashIcon />
          </div>
        </div>
      ))}
      <DestinationInput label="City of destination" />
      <Button
        variant="link"
        onClick={() =>
          setIntemediateDestinations({
            ...intemediateDestinations,
            [uuid()]: "",
          })
        }
      >
        Add destination
      </Button>
    </div>
  );
};

export default RouteCreator;
