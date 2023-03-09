import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import DestinationInput from "../DestinationInput/DestinationInput";
import RouteCreatorStyles from "./RouteCreator.module.css";
import { v4 as uuid } from "uuid";
import { CityInfo } from "../../types";
import { FormDataContext } from "../../context/FormDataProvider";
import { ErrorsContext } from "../../context/ErrorsProvider";
import { useSearchParams } from "react-router-dom";

const RouteCreator = () => {
  const {
    firstCity,
    setFirstCity,
    lastCity,
    setLastCity,
    intermediateCities,
    setIntermediateCities,
  } = useContext(FormDataContext);
  const { errors } = useContext(ErrorsContext);
  const [searchParams, setSearchParams] = useSearchParams({});

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
    searchParams.set("firstCity", selectedCity.toString());
    setSearchParams(searchParams);
  };

  const updateIntermediateDestination = (
    selectedCity: CityInfo,
    index: number
  ) => {
    let copy = [...intermediateCities];
    copy.splice(index!, 1, selectedCity);
    setIntermediateCities(copy);
    searchParams.set("intermediateCities", copy.join("*"));
    setSearchParams(searchParams);
  };

  const updateLastDestination = (selectedCity: CityInfo) => {
    setLastCity(selectedCity);
    searchParams.set("lastCity", selectedCity.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <DestinationInput
        label="City of origin"
        onDestinationSelected={updateFirstDestination}
        city={firstCity[0]}
      />
      {errors.firstCity && (
        <p className={RouteCreatorStyles.errorMessageStyle}>
          {errors.firstCity}
        </p>
      )}
      {intermediateCities.map((item: any, index: number) => (
        <>
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
          {/* @ts-ignore */}
          {errors[`intermediateCities[${index}]["0"]`] && (
            <p className={RouteCreatorStyles.errorMessageStyle}>
              {/* @ts-ignore */}
              {errors[`intermediateCities[${index}]["0"]`]}
            </p>
          )}
        </>
      ))}
      <DestinationInput
        label="City of destination"
        onDestinationSelected={updateLastDestination}
        city={lastCity[0]}
      />
      {errors.lastCity && (
        <p className={RouteCreatorStyles.errorMessageStyle}>
          {errors.lastCity}
        </p>
      )}
      <Button variant="link" onClick={() => addIntermediateDestination()}>
        Add intermediate destination
      </Button>
    </>
  );
};
export default RouteCreator;
