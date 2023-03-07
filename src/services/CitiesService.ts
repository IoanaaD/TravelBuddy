import cities from "../utils/cities";
import haversine from "haversine-distance";
import { CitiesInfo } from "../types";

export const CitiesService = {
  filterCitiesByKeyword: async (keyword: string): Promise<CitiesInfo> => {
    const typedLetters = keyword.toLowerCase().split(" ");
    return cities.filter((city) =>
      typedLetters.every((letter) =>
        (city[0] as string).toLowerCase().includes(letter)
      )
    );
  },

  calculateDistance: async (cities: CitiesInfo): Promise<Array<number>> => {
    const distancesArray = [];
    for (let i = 0; i < cities.length - 1; i++) {
      const [firstCityName, firstCityLat, firstCityLng] = cities[i];
      const [secondCityName, secondCityLat, secondCityLng] = cities[i + 1];
      let firstCityCoordinates = { lat: firstCityLat, lng: firstCityLng };
      let secondCityCoordinates = { lat: secondCityLat, lng: secondCityLng };
      let distance = parseFloat(
        (haversine(firstCityCoordinates, secondCityCoordinates) / 1000).toFixed(
          2
        )
      );

      distancesArray.push(distance);
    }
    return distancesArray;
  },
};
