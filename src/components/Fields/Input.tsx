import { Ref, forwardRef } from "react";

export type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  status?: "error" | "success";
};

const Input = forwardRef(function Input(
  { status, className, ...rest }: IInput,
  ref: Ref<HTMLInputElement>,
) {
  let classStatuses = "focus:ring-indigo-600";
  if (status === "error") {
    classStatuses = "focus:ring-red-600 ring-red-500";
  }

  return (
    <input
      ref={ref}
      className={`${classStatuses} focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ${className}`}
      {...rest}
    />
  );
});

export default Input;
