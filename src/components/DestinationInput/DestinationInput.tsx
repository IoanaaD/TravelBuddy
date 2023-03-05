import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { CloseIcon } from "../../assets/icons";
import { useDebounce } from "../../hooks/useDebounce";
import { CitiesService } from "../../services/CitiesService";
import DestinationInputStyles from "./DestinationInput.module.css";

const DestinationInput: React.FC<{ label: string }> = ({ label }) => {
  const [showEraseIcon, setShowEraseIcon] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: { target: { value: string } }) => {
    if (e.target.value.length > 0) {
      CitiesService.filterCitiesByKeyword(e.target.value).then((result) => {
        console.log("The filtered cities are:", result);
        setFilteredCities(result);
      });
    }
  };

  const selectCityHandler = (city: string) => {
    if (inputRef.current) {
      inputRef.current.value = `${city}`;
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    if (inputRef.current?.value && !showEraseIcon) {
      setShowEraseIcon(true);
      return;
    }

    if (inputRef.current?.value.length === 0) {
      setShowEraseIcon(false);
      setFilteredCities([]);
    }
  }, [inputRef.current?.value]);

  useEffect(() => {
    if (filteredCities.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [filteredCities]);

  const clearInputHandler = useCallback(() => {
    if (inputRef.current != null) {
      inputRef.current.value = "";
      setShowEraseIcon(false);
    }
  }, []);

  const debouncedOnChangeHandler = useDebounce(onChangeHandler, 200);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup className={`${DestinationInputStyles.inputContainer} mb-3`}>
        <FormControl
          ref={inputRef}
          type="text"
          onChange={debouncedOnChangeHandler}
        />
        {showEraseIcon && (
          <div
            className={DestinationInputStyles.eraseIconContainer}
            onClick={clearInputHandler}
          >
            <CloseIcon />
          </div>
        )}
      </InputGroup>
      {showDropdown && (
        <div className={DestinationInputStyles.dropdown}>
          {filteredCities.map((city) => (
            <div
              key={city}
              className={DestinationInputStyles.dropdownRow}
              onClick={() => selectCityHandler(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </Form.Group>
  );
};

export default React.memo(DestinationInput);
