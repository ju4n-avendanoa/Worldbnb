import useCountries, { Country } from "@/hooks/useCountries";
import { FormInputs } from "@/interfaces/formInterface";
import { SyntheticEvent } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface CountrySelectProps {
  errors: FieldErrors<FormInputs>;
  register: UseFormRegister<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
}

function SelectCountries({
  register,
  errors,
  watch,
  setValue,
}: CountrySelectProps) {
  const { getAll, getCountryByValue } = useCountries();

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue("country", selectedValue);
    if (getCountryByValue(watch("country"))[0]) {
      const currency = Object.keys(
        getCountryByValue(watch("country"))[0]?.currency
      )[0];
      setValue("currency", currency);
    } else {
      setValue("currency", "USD");
    }
  };

  return (
    <div className="pt-4 flex flex-col items-start gap-3">
      <label htmlFor="country" className="flex flex-col gap-1">
        <span
          className={`${
            errors.country
              ? "peer-focus:text-red-600 text-red-600"
              : "peer-focus:text-sky-600"
          } font-semibold`}
        >
          Country:
        </span>
        <p
          className={`${
            errors.country
              ? "peer-focus:text-red-600 text-red-600"
              : "peer-focus:text-black"
          } text-xs`}
        >
          Select your country, set the scene for your Airbnb escape!
        </p>
      </label>
      <select
        id="country"
        placeholder="Anywhere"
        className="w-full border border-gray-300 outline-none rounded-sm p-4"
        defaultValue={""}
        {...register("country", {
          onChange: handleCountryChange,
        })}
      >
        <option value="" className="text-sm" disabled>
          Anywhere
        </option>
        {getAll().map((country, index) => (
          <option key={index} className="my-10 text-sm">
            {country.name}
          </option>
        ))}
      </select>
      {errors.country && (
        <p className="text-xs text-red-500">{errors.country?.message}</p>
      )}
      <label htmlFor="currency" className="font-bold">
        Currency:
      </label>
      <input
        type="text"
        id="currency"
        disabled
        defaultValue={""}
        className="p-4 outline-none border border-gray-400"
        {...register("currency")}
      />
    </div>
  );
}

export default SelectCountries;
