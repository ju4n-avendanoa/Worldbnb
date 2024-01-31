import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormInputs } from "@/interfaces/formInterface";
import { perksLogos } from "@/utils/perksLogos";
import ImageWithFallback from "./ImageWithFallback";

const perksData = [
  {
    id: "wifi",
    label: perksLogos["wifi"].label,
    key: "perks.wifi",
    logo: perksLogos.wifi.link,
  },
  {
    id: "pet",
    label: perksLogos["pet"].label,
    key: "perks.pet",
    logo: perksLogos.pet.link,
  },
  {
    id: "parking",
    label: perksLogos["parking"].label,
    key: "perks.parking",
    logo: perksLogos.parking.link,
  },
  {
    id: "tv",
    label: perksLogos["tv"].label,
    key: "perks.tv",
    logo: perksLogos.tv.link,
  },
  {
    id: "privateEntrance",
    label: perksLogos["privateEntrance"].label,
    key: "perks.privateEntrance",
    logo: perksLogos.privateEntrance.link,
  },
  {
    id: "kitchen",
    label: perksLogos["kitchen"].label,
    key: "perks.kitchen",
    logo: perksLogos.kitchen.link,
  },
  {
    id: "washer",
    label: perksLogos["washer"].label,
    key: "perks.washer",
    logo: perksLogos.washer.link,
  },
  {
    id: "pool",
    label: perksLogos["pool"].label,
    key: "perks.pool",
    logo: perksLogos.pool.link,
  },
  {
    id: "airConditioner",
    label: perksLogos["airConditioner"].label,
    key: "perks.airConditioner",
    logo: perksLogos.airConditioner.link,
  },
  {
    id: "breakfast",
    label: perksLogos["breakfast"].label,
    key: "perks.breakfast",
    logo: perksLogos.breakfast.link,
  },
  {
    id: "gym",
    label: perksLogos["gym"].label,
    key: "perks.gym",
    logo: perksLogos.gym.link,
  },
  {
    id: "cleaningService",
    label: perksLogos["cleaningService"].label,
    key: "perks.cleaningService",
    logo: perksLogos.cleaningService.link,
  },
];

function Perks({
  register,
  watch,
}: {
  register: UseFormRegister<FormInputs>;
  watch: UseFormWatch<FormInputs>;
}) {
  return (
    <div className="my-2">
      <h2 className="font-bold">Perks</h2>
      <p className="text-gray-500">Select all the perks of your place</p>
      <div className="grid h-auto grid-cols-2 gap-2 py-2 md:grid-cols-3 xl:grid-cols-4">
        {perksData.map(({ id, label, key, logo }) => (
          <label
            key={id}
            htmlFor={id}
            className={`
            ${watch(key as keyof FormInputs) ? "bg-sky-100" : null} 
            grid grid-cols-2 place-items-center gap-1 py-1 px-3 text-xs font-semibold text-center border-2 rounded-lg select-none text-sky-600 border-sky-700 hover:bg-sky-100`}
          >
            <input
              type="checkbox"
              id={id}
              className="w-5 h-5"
              {...register(key as keyof FormInputs)}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              {label}
              <ImageWithFallback
                src={logo}
                fallbackSrc={perksLogos.default.link}
                alt={id}
                height={40}
                width={40}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Perks;
