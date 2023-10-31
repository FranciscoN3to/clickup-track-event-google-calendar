type IDatePicker = React.HTMLAttributes<HTMLDivElement> & {
    label: string
    name: string
}

function DatePicker({label, name, defaultValue}: IDatePicker) {
  return <div>
    <label htmlFor={name} className="block text-sm font-semibold leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2.5">
      <input
        type="date"
        name={name}
        id={name}
        defaultValue={defaultValue}
        autoComplete="given-name"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
}

export default DatePicker