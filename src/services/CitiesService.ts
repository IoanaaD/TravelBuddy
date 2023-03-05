import cities from "../utils/cities";

export const CitiesService = {
  filterCitiesByKeyword: async (keyword: string): Promise<Array<string>> => {
    const typedLetters = keyword.split(" ");

    const cityNames = cities.map((city) =>
      city[0].toString().toLowerCase()
    ) as string[];

    return cityNames.filter((city) =>
      typedLetters.every((letter) => city.includes(letter))
    );
  },
};
