import { type JSX } from "react";

export function Input({
  className,
  value,
  onChange,
  type,
  disabled,
}: {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}): JSX.Element {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
    ></input>
  );
}
