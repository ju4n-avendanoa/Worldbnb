import { DateRange, Range } from "react-date-range";
import { addComma } from "@/utils/addComma";
import { useRouter } from "next-nprogress-bar";

type Props = {
  price: number;
  currency: string;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: any;
  disabled: any;
  disabledDates: Date[];
};

function PlaceReservation({
  price,
  currency,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="
    bg-white 
      rounded-xl 
      border-[1px]
    border-neutral-200 
      overflow-hidden
      w-min
    "
    >
      <div
        className="
    flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">
          <span>$ {addComma(price)}</span>
          <span>, {currency}</span>
        </div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <DateRange
        ranges={[dateRange]}
        disabledDates={disabledDates}
        minDate={new Date()}
        rangeColors={["#0369A1"]}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <hr />
      <div className="p-4 flex justify-center">
        <button
          className="text-white bg-sky-700 py-2 px-8 rounded-lg transition active:scale-95 duration-150 hover:scale-105 w-full font-semibold"
          disabled={disabled}
          onClick={onSubmit}
        >
          Reserve
        </button>
      </div>
      <div
        className="p-4 flex flex-row items-center justify-between font-semibold text-lg
      "
      >
        <div>Total</div>
        <div>$ {`${addComma(totalPrice)}, ${currency}`}</div>
      </div>
    </div>
  );
}

export default PlaceReservation;
