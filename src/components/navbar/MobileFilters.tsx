import { KeyboardEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next-nprogress-bar";
import { DateRange } from "react-date-range";
import useCountries, { Country } from "@/hooks/useCountries";
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-date-range/dist/styles.css"; // main style file

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

function MobileFilters({ isVisible, onClose }: Props) {
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
  if (!isVisible) return null;
  return (
    <section className="fixed inset-0 flex justify-center w-full pt-20 duration-500 bg-white animate-in slide-in-from-bottom">
      <ArrowLeftCircleIcon
        onClick={() => {
          setShowCalendar(false);
          setShowGuests(false);
          onClose();
        }}
        className="absolute w-8 transition duration-150 rounded-full top-4 left-4 hover:bg-gray-200 active:scale-90"
      />
      <section className="relative flex flex-col items-center w-5/6 gap-10 p-4 bg-white rounded-md justify-evenly h-1/2">
        <h2 className="text-2xl font-bold text-sky-700">
          Filter your dream places
        </h2>
        <div className="relative w-full">
          <input
            type="text"
            className="w-full py-3 pl-4 text-sm text-gray-500 border outline-none hover:bg-gray-200 placeholder:text-gray-500"
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
          <ul
            className={`absolute left-0 z-20 w-full bg-white shadow-xl top-[50px]`}
          >
            {details && countriesResults.length > 0
              ? countriesResults.map((country, index) => {
                  if (search === "") {
                    return null;
                  }
                  return (
                    <li
                      className={`p-3 border ${
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
        </div>
        <div className="relative w-full">
          <input
            className={`${
              showCalendar ? "bg-gray-200 shadow-xl" : ""
            } w-full pr-2 border pl-4 py-3 text-sm outline-none cursor-pointer select-none hover:bg-gray-200 text-gray-500`}
            onClick={() => {
              setShowGuests(false);
              setShowCalendar((prev) => !prev);
            }}
            value={
              endDate > startDate
                ? `${startDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}-${endDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}`
                : "When?"
            }
            readOnly
          />
          {showCalendar ? (
            <div className="absolute left-0 z-20 w-full top-14">
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
        </div>
        <div className="relative w-full">
          <input
            className={`${
              showGuests ? "bg-gray-200 shadow-xl" : ""
            } pr-2 w-full pl-4 py-3 text-sm outline-none cursor-pointer select-none border hover:bg-gray-200 text-gray-500`}
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

          {showGuests ? (
            <div className="absolute left-0 z-20 w-full p-6 bg-white border shadow-xl top-[50px] rounded-lg">
              <div className="flex items-center justify-around gap-2">
                <div className="flex items-center gap-4">
                  <UsersIcon className="w-7" />
                  <h4 className="px-2 text-sm text-center">Add guests</h4>
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
        <button
          type="submit"
          className="flex items-center justify-center w-full gap-2 px-3 py-3 text-white transition duration-150 rounded-lg bg-sky-700 active:scale-95"
          onClick={() => {
            setShowCalendar(false);
            setShowGuests(false);
            onClose();
            router.push(
              `/homes?country=${search.toLowerCase()}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`
            );
          }}
        >
          search <MagnifyingGlassIcon className="w-4" />
        </button>
      </section>
    </section>
  );
}

export default MobileFilters;
