import { Ref, forwardRef } from "react";
import Input, { IInput } from "./Input";

type IDatePicker = Omit<IInput, "type" | "ref">;

const DatePicker = forwardRef(function DatePicker(
  props: IDatePicker,
  ref: Ref<HTMLInputElement>,
) {
  return <Input ref={ref} type="date" {...props} />;
});

export default DatePicker;
