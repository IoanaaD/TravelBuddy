import React, { ReactNode, useState } from "react";
import { CityInfo } from "../types";

export const ErrorsContext = React.createContext<{
  errors: {
    firstCity?: string;
    lastCity?: string;
    passengersNumber?: string;
    intermediateCities?: Array<string>;
    date?: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{}>>;
}>({
  errors: {},
  setErrors: () => {},
});

export const ErrorsProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [errors, setErrors] = useState<{
    firstCity?: string;
    lastCity?: string;
    passengersNumber?: string;
    intermediateCities?: Array<string>;
    date?: string;
  }>({ intermediateCities: [] });
  return (
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {props.children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsProvider;
