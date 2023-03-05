import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import PassengersInputStyles from "./PassengersInput.module.css";

const PassengersInput = () => {
  const [passengers, setPassengers] = useState(1);
  return (
    <>
      <label>Passengers</label>
      <div className={`${PassengersInputStyles.counterContainer} mb-3`}>
        <div onClick={() => setPassengers(passengers - 1)}>
          <MinusIcon />
        </div>
        <div>{passengers}</div>
        <div onClick={() => setPassengers(passengers + 1)}>
          <PlusIcon />
        </div>
      </div>
    </>
  );
};

export default PassengersInput;
