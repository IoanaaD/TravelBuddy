import { useContext } from "react";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import { FormDataContext } from "../../context/FormDataProvider";
import PassengersInputStyles from "./PassengersInput.module.css";

const PassengersInput = () => {
  const { passengersNumber, setPassengersNumber } = useContext(FormDataContext);

  return (
    <>
      <label>Passengers</label>
      <div className={`${PassengersInputStyles.counterContainer} mb-3`}>
        <div onClick={() => setPassengersNumber(passengersNumber - 1)}>
          <MinusIcon />
        </div>
        <div>{passengersNumber}</div>
        <div onClick={() => setPassengersNumber(passengersNumber + 1)}>
          <PlusIcon />
        </div>
      </div>
    </>
  );
};

export default PassengersInput;
