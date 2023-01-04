import React from "react";
import "./Input.scss";

type InputProps = {
  type: "text" | "password" | "email" | "number" | "tel";
  name?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  error?: any;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      defaultValue,
      placeholder,
      className,
      error,
      value,
      required,
      disabled,
      onChange,
      onBlur,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className={"input"}>
          {label && (
            <label htmlFor="" className="input__label">
              {label}
            </label>
          )}
          <input
            ref={ref}
            value={value || undefined}
            name={name}
            defaultValue={defaultValue || undefined}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            className={`input__field`}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
        </div>
        {/* Checking if there is an error and if there is, it will display the error message. */}
        {Boolean(error) && <p className="input__err">{error}</p>}
      </>
    );
  }
);

Input.displayName = "Input";
export default Input;
