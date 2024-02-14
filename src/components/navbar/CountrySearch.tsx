import { KeyboardEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Country } from "world-countries";
import useCountries from "@/hooks/useCountries";

function CountrySearch() {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(false);
  const [countriesResults, setCountriesResults] = useState<Country[]>([]);
  const [currentIndex, setCurrenIndex] = useState(-1);
  const { getCountryByValue } = useCountries();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentResults = countriesResults?.length - 1;
    if (e.code === "ArrowDown") {
      setCurrenIndex((prev) => Math.min(prev + 1, currentResults));
    } else if (e.code === "ArrowUp") {
      setCurrenIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.code === "Enter") {
      if (currentIndex === -1) return;
      setSearch(countriesResults[currentIndex].name.common);
      setDetails(false);
    }
  };

  return (
    <div className="relative flex w-1/3 gap-2 border rounded-full">
      <input
        type="text"
        className="flex-grow px-4 py-3 rounded-full outline-none hover:bg-gray-200"
        placeholder="search destinations"
        value={search}
        onChange={(e) => {
          setDetails(true);
          setSearch(e.target.value);
          setCurrenIndex(-1);
          const results = getCountryByValue(e.target.value);

          setCountriesResults(results);
        }}
        onFocus={() => setDetails(true)}
        onBlur={() => setTimeout(() => setDetails(false), 150)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="flex items-center justify-around gap-2 px-3 py-1 text-white transition duration-150 rounded-full bg-sky-700 active:scale-95"
      >
        <span>search</span>
        <MagnifyingGlassIcon className="w-4" />
      </button>
      <div className="absolute left-0 w-full bg-white shadow-xl top-16">
        {details && countriesResults.length > 0
          ? countriesResults.map((country, index) => {
              if (search === "") {
                return null;
              }
              return (
                <ul
                  className={`p-3 hover:bg-gray-300 hover:cursor-pointer ${
                    index === currentIndex ? "bg-gray-300" : "bg-white"
                  }`}
                  key={index}
                  onClick={() => {
                    setSearch(country.name.common);
                  }}
                >
                  <li className="flex gap-3">
                    <MapPinIcon className="w-6 h-auto text-white rounded-full bg-sky-700" />
                    <p>{country.name.common}</p>
                  </li>
                </ul>
              );
            })
          : null}
        {details && countriesResults.length === 0 && search !== "" ? (
          <h2 className="p-3">No results</h2>
        ) : null}
      </div>
    </div>
  );
}

export default CountrySearch;
