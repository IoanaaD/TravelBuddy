import React, { ReactNode, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
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
function getQueryParam(name: any) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const convertURLParamToCityInfo = (param?: string[]): CityInfo | undefined => {
  if (!param) {
    return;
  }
  const newLat = parseFloat(param[1]);
  const newLng = parseFloat(param[2]);

  return [param[0], newLat, newLng];
};

export const FormDataProvider: React.FC<{ children: ReactNode }> = (props) => {
  const firstCityFromUrl = getQueryParam("firstCity")?.split(",");
  const lastCityFromUrl = getQueryParam("lastCity")?.split(",");
  const intermediateCityFromUrl = getQueryParam("intermediateCities")
    ?.split("*")
    .map(
      (cityInfoString) => convertURLParamToCityInfo(cityInfoString.split(","))!
    );
  const [route, setRoute] = useState<{
    firstCity: CityInfo;
    intermediateCitites: CitiesInfo;
    lastCity: CityInfo;
  }>({
    firstCity: convertURLParamToCityInfo(firstCityFromUrl) || ["", 0, 0],
    lastCity: convertURLParamToCityInfo(lastCityFromUrl) || ["", 0, 0],
    intermediateCitites: intermediateCityFromUrl || [],
  });

  const passengersNumberFromUrl = parseInt(getQueryParam("passengersNumber")!);
  const [passengersNumber, setPassengersNumber] = useState(
    passengersNumberFromUrl || 0
  );

  const dateFromUrl = getQueryParam("date");
  const [date, setDate] = useState(dateFromUrl || "");

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
