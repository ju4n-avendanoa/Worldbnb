import { KeyboardEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import useCountries, { Country } from "@/hooks/useCountries";
import { useSearchParams } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next-nprogress-bar";
import { DateRange } from "react-date-range";
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-date-range/dist/styles.css"; // main style file

function SearchInput() {
  const searchParams = useSearchParams();

  const [countriesResults, setCountriesResults] = useState<Country[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentIndex, setCurrenIndex] = useState(-1);
  const [showGuests, setShowGuests] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [details, setDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState(0);

  const router = useRouter();
  const { getCountryByValue } = useCountries();

  useEffect(() => {
    const guestsParams = searchParams.get("guests");
    const startDateParams = searchParams.get("startDate");
    const endDateParams = searchParams.get("endDate");
    const countryParams = searchParams.get("country");
    if (guestsParams) {
      setGuests(Number(guestsParams));
    } else {
      setGuests(0);
    }
    if (startDateParams) {
      setStartDate(new Date(startDateParams));
    } else {
      setStartDate(new Date());
    }
    if (endDateParams) {
      setEndDate(new Date(endDateParams));
    } else {
      setEndDate(new Date());
    }
    if (countryParams) {
      setSearch(countryParams[0].toLocaleUpperCase() + countryParams.slice(1));
    } else {
      setSearch("");
    }
  }, [searchParams]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentResults = countriesResults?.length - 1;
    if (e.code === "ArrowDown") {
      setCurrenIndex((prev) => Math.min(prev + 1, currentResults));
    } else if (e.code === "ArrowUp") {
      setCurrenIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.code === "Enter") {
      if (currentIndex === -1) return;
      setSearch(countriesResults[currentIndex].name);
      setDetails(false);
    }
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div className="relative flex items-center w-3/5 border border-gray-300 rounded-full shadow-lg xl:w-1/2 max-lg:hidden">
      <input
        type="text"
        className="w-2/5 py-3 pl-4 pr-2 text-sm text-gray-500 border-r-2 rounded-l-full outline-none hover:bg-gray-200 placeholder:text-gray-500"
        placeholder="Where?"
        value={search}
        onChange={(e) => {
          setDetails(true);
          setSearch(e.target.value);
          setCurrenIndex(-1);
          const results = getCountryByValue(e.target.value);

          setCountriesResults(results);
        }}
        onFocus={() => {
          setShowCalendar(false);
          setShowGuests(false);
          setDetails(true);
        }}
        onBlur={() => setTimeout(() => setDetails(false), 200)}
        onKeyDown={handleKeyDown}
      />
      <input
        className={`${
          showCalendar ? "bg-gray-200 shadow-xl" : ""
        } w-[25%] pr-2 pl-4 py-3 border-r-2 text-sm outline-none cursor-pointer select-none hover:bg-gray-200 text-gray-500`}
        onClick={() => {
          setShowGuests(false);
          setShowCalendar((prev) => !prev);
        }}
        value={`${startDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })}-${endDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })}`}
        readOnly
      />
      <div
        className={`flex w-[35%] hover:bg-gray-200 rounded-full ${
          showGuests ? "bg-gray-200" : ""
        }`}
      >
        <input
          className={`${
            showGuests ? "bg-gray-200" : ""
          } pr-2 pl-4 py-3 text-sm outline-none cursor-pointer select-none w-[75%] hover:bg-gray-200 text-gray-500`}
          onClick={() => {
            setShowCalendar(false);
            setShowGuests((prev) => !prev);
          }}
          value={`${
            guests === 0
              ? "guests"
              : `${guests} ${guests > 1 ? `guests` : "guest"}`
          }`}
          readOnly
        />
        <button
          type="submit"
          className="flex items-center m-1 justify-around gap-2 text-white transition duration-150 rounded-full w-[25%] bg-sky-700 active:scale-95"
          onClick={() => {
            setShowCalendar(false);
            setShowGuests(false);
            router.push(
              `/homes?country=${search.toLowerCase()}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`
            );
          }}
        >
          <MagnifyingGlassIcon className="w-4" />
        </button>
      </div>
      <ul
        className={`absolute left-0 z-20 w-full bg-white shadow-xl top-[50px] rounded-3xl`}
      >
        {details && countriesResults.length > 0
          ? countriesResults.map((country, index) => {
              if (search === "") {
                return null;
              }
              return (
                <li
                  className={`p-3 hover:bg-gray-300 hover:cursor-pointer first:rounded-t-3xl first:rounded-tr-3xl last:rounded-b-3xl last:rounded-bl-3xl first:border-t-2  ${
                    index === currentIndex ? "bg-gray-300" : "bg-white"
                  }`}
                  key={index}
                  onClick={() => {
                    setSearch(country.name);
                  }}
                >
                  <div className="flex gap-3">
                    <MapPinIcon className="w-6 h-auto text-white rounded-full bg-sky-700" />
                    <p>{country.name}</p>
                  </div>
                </li>
              );
            })
          : null}
        {details && countriesResults.length === 0 && search !== "" ? (
          <h2 className="p-3">No results</h2>
        ) : null}
      </ul>
      {showCalendar ? (
        <div className="absolute z-20 left-0 w-full top-[50px]">
          <div className="flex justify-center w-full">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#0369A1"]}
              onChange={handleSelect}
              className="border-2 border-gray-300"
            />
          </div>
        </div>
      ) : null}
      {showGuests ? (
        <div className="absolute left-0 z-20 w-full p-6 bg-white border shadow-xl top-[50px] rounded-lg">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-4">
              <UsersIcon className="w-7" />
              <h4>Add number of guests</h4>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setGuests((prev) => prev - 1)}
                disabled={guests === 0}
                className="w-10 h-10 text-2xl transition duration-150 rounded-full bg-sky-700 disabled:bg-gray-300 active:scale-90"
              >
                <span className="font-bold text-white">-</span>
              </button>
              <p>{guests}</p>
              <button
                className="w-10 h-10 text-2xl font-bold text-white transition duration-150 rounded-full bg-sky-700 active:scale-90"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchInput;
