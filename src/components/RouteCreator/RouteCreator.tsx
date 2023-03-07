import { useContext } from "react";
import { Button } from "react-bootstrap";
import DestinationInput from "../DestinationInput/DestinationInput";
import RouteCreatorStyles from "./RouteCreator.module.css";
import { v4 as uuid } from "uuid";
import { CityInfo } from "../../types";
import { FormDataContext } from "../../context/FormDataProvider";

const RouteCreator = () => {
  const {
    setFirstCity,
    setLastCity,
    intermediateCities,
    setIntermediateCities,
  } = useContext(FormDataContext);

  const deleteIntermediateDestination = (index: number) => {
    let copy = [...intermediateCities];
    copy.splice(index, 1);
    setIntermediateCities(copy);
  };

  const addIntermediateDestination = () => {
    setIntermediateCities([...intermediateCities, ["", 0, 0]]);
  };

  const updateFirstDestination = (selectedCity: CityInfo) => {
    setFirstCity(selectedCity);
  };

  const updateIntermediateDestination = (
    selectedCity: CityInfo,
    index: number
  ) => {
    let copy = [...intermediateCities];
    copy.splice(index!, 1, selectedCity);
    setIntermediateCities(copy);
  };

  const updateLastDestination = (selectedCity: CityInfo) => {
    setLastCity(selectedCity);
  };

  return (
    <>
      <DestinationInput
        label="City of origin"
        onDestinationSelected={updateFirstDestination}
      />
      {intermediateCities.map((item: any, index: number) => (
        <div className={RouteCreatorStyles.intermediateDestinationContainer}>
          <DestinationInput
            key={uuid()}
            label="Intermediate destination"
            onDestinationSelected={(city) =>
              updateIntermediateDestination(city, index)
            }
            city={item[0]}
            onDelete={() => deleteIntermediateDestination(index)}
          />
        </div>
      ))}
      <DestinationInput
        label="City of destination"
        onDestinationSelected={updateLastDestination}
      />
      <Button variant="link" onClick={() => addIntermediateDestination()}>
        Add destination
      </Button>
    </>
  );
};
export default RouteCreator;
