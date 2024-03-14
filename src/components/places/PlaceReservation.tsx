import { DateRange, Range } from "react-date-range";
import { addComma } from "@/utils/addComma";

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
      <div className="flex flex-row items-center gap-1 p-4 ">
        <div className="text-2xl font-semibold">
          <span>$ {addComma(price)}</span>
          <span> {currency}</span>
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
      <div className="flex justify-center p-4">
        <button
          className="w-full px-8 py-2 font-semibold text-white transition duration-150 rounded-lg bg-sky-700 active:scale-95 hover:scale-105"
          disabled={disabled}
          onClick={onSubmit}
        >
          Reserve
        </button>
      </div>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold ">
        <div>Total</div>
        <div>$ {`${addComma(totalPrice)} ${currency}`}</div>
      </div>
    </div>
  );
}

export default PlaceReservation;
