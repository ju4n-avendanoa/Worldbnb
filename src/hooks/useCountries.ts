import countries from "world-countries";

export type Currency = {
  name: string;
  symbol: string;
};

export type Country = {
  name: string;
  latlng: [number, number];
  region: string;
  currency: {
    [currencyCode: string]: Currency;
  };
};

const useCountries = () => {
  const formattedCountries = countries.map((country) => ({
    name: country.name.common,
    latlng: country.latlng,
    currency: country.currencies,
    region: country.region,
  }));

  const getAll = () => formattedCountries;
  const getCountryByValue = (value: string) => {
    let count = 0;

    const filteredResults = formattedCountries.filter((country) => {
      const includesValue = country.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .startsWith(value?.toLowerCase());

      if (includesValue && count < 5) {
        count++;
        return true;
      }

      return false;
    });

    return filteredResults;
  };
  const getCountryByExactName = (value: string) => {
    const filteredResult = formattedCountries.find(
      (country) => country.name === value
    );
    return filteredResult;
  };

  return { getAll, getCountryByValue, getCountryByExactName };
};

export default useCountries;
