function Label({
  children,
  className,
  ...pros
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label
      className={`block text-sm font-semibold leading-6 text-gray-900 ${className}`}
      {...pros}
    >
      {children}
    </label>
  );
}

export default Label;
