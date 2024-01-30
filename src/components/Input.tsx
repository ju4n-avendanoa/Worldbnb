import { FormInputs } from "@/interfaces/formInterface";
import { FieldErrors, UseFormRegister } from "react-hook-form";

function Input({
  errors,
  register,
  name,
  description,
  label,
  id,
  type,
  min,
  max,
}: {
  errors: FieldErrors<FormInputs>;
  register: UseFormRegister<FormInputs>;
  name: keyof FormInputs;
  description: string;
  label: string;
  id: string;
  type: string;
  min?: number;
  max?: number;
}) {
  return (
    <>
      <label htmlFor={id} className="flex flex-col gap-1 pt-4">
        <span
          className={`${
            errors[name]
              ? "peer-focus:text-red-600 text-red-600"
              : "peer-focus:text-sky-600"
          } font-semibold`}
        >
          {label}
        </span>
        <p
          className={`${
            errors[name]
              ? "peer-focus:text-red-600 text-red-600"
              : "peer-focus:text-black"
          } text-xs`}
        >
          {description}
        </p>
        <input
          type={type}
          id={id}
          min={min}
          max={max}
          className={`${
            errors[name]
              ? "border border-red-600 outline-red-600 text-red-600"
              : "focus:outline-sky-600"
          } w-full p-3 border border-gray-300 rounded-md peer`}
          required
          {...register(name)}
        />
      </label>
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]?.message}</p>
      )}
    </>
  );
}

export default Input;
