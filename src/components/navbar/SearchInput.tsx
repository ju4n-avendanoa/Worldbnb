import { KeyboardEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next-nprogress-bar";
import { DateRange, DateRangePicker } from "react-date-range";
import useCountries, { Country } from "@/hooks/useCountries";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSearchParams } from "next/navigation";
import { fromLongToShortDate } from "@/utils/formatDate";

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
    // if (startDateParams) setStartDate(startDateParams);
    // if (endDateParams) setEndDate(endDateParams);
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

  fromLongToShortDate(startDate);

  return (
    <div className="relative flex items-center w-1/2 gap-2 pr-2 border border-gray-300 rounded-full shadow-lg max-lg:hidden">
      <input
        type="text"
        className="w-1/2 px-4 py-5 text-base border-r-2 rounded-full outline-none hover:bg-gray-200 placeholder:text-gray-500"
        placeholder="search destinations"
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
          showCalendar ? "border-2 border-gray-400 bg-gray-200 shadow-xl" : ""
        } w-1/4 px-4 py-5 text-sm border-r-2 rounded-full outline-none cursor-pointer select-none hover:bg-gray-200`}
        onClick={() => {
          setShowGuests(false);
          setShowCalendar((prev) => !prev);
        }}
        value={
          startDate
            ? `${startDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}-${endDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}`
            : "Dates"
        }
        readOnly
      />
      <input
        className={`${
          showGuests ? "border-2 border-gray-400 bg-gray-200 shadow-xl" : ""
        } px-4 py-5 text-sm rounded-full outline-none cursor-pointer select-none w-[15%] hover:bg-gray-200`}
        onClick={() => {
          setShowCalendar(false);
          setShowGuests((prev) => !prev);
        }}
        value={`${
          guests === 0
            ? "add guets"
            : `${guests} ${guests > 1 ? `guests` : "guest"}`
        }`}
        readOnly
      />
      <button
        type="submit"
        className="flex items-center justify-around gap-2 px-3 py-3 text-white transition duration-150 rounded-full w-[10%] bg-sky-700 active:scale-95"
        onClick={() => {
          router.push(
            `/homes?country=${search.toLowerCase()}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`
          );
          setStartDate(new Date());
          setEndDate(new Date());
        }}
      >
        <MagnifyingGlassIcon className="w-4" />
      </button>
      <ul
        className={`absolute left-0 z-20 w-full bg-white shadow-xl top-[70px] rounded-3xl`}
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
        <div className="absolute z-20 bg-white border shadow-xl left-20 w-min top-[70px]">
          <div className="flex justify-center">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#0369A1"]}
              onChange={handleSelect}
            />
          </div>
        </div>
      ) : null}
      {showGuests ? (
        <div className="absolute left-0 z-20 w-full p-6 bg-white border shadow-xl top-[70px] rounded-lg">
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
