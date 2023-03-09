import React, { useCallback, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { CloseIcon, TrashIcon } from "../../assets/icons";
import { useDebounce } from "../../hooks/useDebounce";
import { CitiesService } from "../../services/CitiesService";
import { CitiesInfo, CityInfo } from "../../types";
import DestinationInputStyles from "./DestinationInput.module.css";

const DestinationInput: React.FC<{
  label: string;
  onDestinationSelected: (selectedCity: CityInfo) => void;
  city: string;
  onDelete?: () => void;
}> = ({ label, onDestinationSelected, city, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(city || "");
  const [filteredCities, setFilteredCities] = useState<CitiesInfo>([]);

  const filterCities = (input: string) => {
    if (input.length > 0) {
      CitiesService.filterCitiesByKeyword(input).then((result) => {
        console.log("The filtered cities are:", result);
        setFilteredCities(result);
      });
    }
  };

  const debouncedCitiesFilter = useDebounce(filterCities, 200);

  const onChangeHandler = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    debouncedCitiesFilter(e.target.value);
  };

  const selectCityHandler = (city: CityInfo) => {
    setInputValue(city[0]);
    setShowDropdown(false);
    onDestinationSelected(city);
  };

  useEffect(() => {
    if (filteredCities.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [filteredCities]);

  const clearInputHandler = useCallback(() => {
    setInputValue("");
  }, []);

  return (
    <Form.Group className="col-md-10">
      <Form.Label>{label}</Form.Label>
      <div className={DestinationInputStyles.inputContainer}>
        <FormControl
          type="text"
          value={inputValue}
          onChange={onChangeHandler}
        />
        {onDelete && (
          <div
            className={DestinationInputStyles.deleteBtnContainer}
            onClick={onDelete}
          >
            <TrashIcon />
          </div>
        )}
        {inputValue && (
          <div
            className={DestinationInputStyles.eraseIconContainer}
            onClick={clearInputHandler}
          >
            <CloseIcon />
          </div>
        )}
      </div>
      {showDropdown && (
        <div className={DestinationInputStyles.dropdown}>
          {filteredCities.map((city) => (
            <div
              key={city[0]}
              className={DestinationInputStyles.dropdownRow}
              onClick={() => selectCityHandler(city)}
            >
              {city[0]}
            </div>
          ))}
        </div>
      )}
    </Form.Group>
  );
};

export default React.memo(DestinationInput);
