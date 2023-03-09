import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import { ErrorsContext } from "../../context/ErrorsProvider";
import { FormDataContext } from "../../context/FormDataProvider";
import PassengersInputStyles from "./PassengersInput.module.css";

const PassengersInput = () => {
  const { passengersNumber, setPassengersNumber } = useContext(FormDataContext);
  const { errors } = useContext(ErrorsContext);
  const [searchParams, setSearchParams] = useSearchParams({});

  const increasePassengersNumber = () => {
    const increasedPassengersNumber = passengersNumber + 1;
    setPassengersNumber(increasedPassengersNumber);
    searchParams.set("passengersNumber", increasedPassengersNumber.toString());
    setSearchParams(searchParams);
  };

  const decreasePassengersNumber = () => {
    const decreasedPassengersNumber = passengersNumber - 1;
    setPassengersNumber(decreasedPassengersNumber);
    searchParams.set("passengersNumber", decreasedPassengersNumber.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <label>Passengers</label>
      <div className={`${PassengersInputStyles.counterContainer} mb-3`}>
        <div onClick={decreasePassengersNumber}>
          <MinusIcon />
        </div>
        <div>{passengersNumber}</div>
        <div onClick={increasePassengersNumber}>
          <PlusIcon />
        </div>
      </div>
      {errors.passengersNumber && (
        <p className={PassengersInputStyles.errorMessageStyle}>
          {errors.passengersNumber}
        </p>
      )}
    </>
  );
};

export default PassengersInput;
