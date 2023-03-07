import React, { ReactNode, useState } from "react";
import { CityInfo } from "../types";

export const CalculatedDistancesContext = React.createContext<{
  calculatedDistances: Array<number>;
  setCalculatedDistances: React.Dispatch<React.SetStateAction<number[]>>;
}>({
  calculatedDistances: [],
  setCalculatedDistances: () => {},
});

export const CalculatedDistancesProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const [calculatedDistances, setCalculatedDistances] = useState<Array<number>>(
    []
  );
  return (
    <CalculatedDistancesContext.Provider
      value={{ calculatedDistances, setCalculatedDistances }}
    >
      {props.children}
    </CalculatedDistancesContext.Provider>
  );
};

export default CalculatedDistancesProvider;
