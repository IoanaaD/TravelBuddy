import React, { ReactNode, useState } from "react";
import { CitiesInfo, CityInfo } from "../types";

export type FormDataContextType = {
  firstCity: CityInfo;
  lastCity: CityInfo;
  intermediateCities: CitiesInfo;
  setFirstCity: any;
  setLastCity: any;
  setIntermediateCities: any;
  passengersNumber: number;
  setPassengersNumber: any;
  date: string;
  setDate: any;
};

//@ts-ignore
export const FormDataContext = React.createContext<FormDataContextType>();

export const FormDataProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [route, setRoute] = useState<{
    firstCity: CityInfo;
    intermediateCitites: CitiesInfo;
    lastCity: CityInfo;
  }>({
    firstCity: ["", 0, 0],
    lastCity: ["", 0, 0],
    intermediateCitites: [],
  });
  const [passengersNumber, setPassengersNumber] = useState(1);

  const [date, setDate] = useState("");

  const setFirstCity = (city: CityInfo) => {
    setRoute({ ...route, firstCity: city });
  };
  const setLastCity = (city: CityInfo) => {
    setRoute({ ...route, lastCity: city });
  };
  const setIntermediateCities = (cities: CitiesInfo) => {
    setRoute({ ...route, intermediateCitites: cities });
  };
  return (
    <FormDataContext.Provider
      value={{
        lastCity: route.lastCity,
        firstCity: route.firstCity,
        intermediateCities: route.intermediateCitites,
        date,
        setDate,
        passengersNumber,
        setPassengersNumber,
        setFirstCity,
        setLastCity,
        setIntermediateCities,
      }}
    >
      {props.children}
    </FormDataContext.Provider>
  );
};

export default FormDataProvider;
