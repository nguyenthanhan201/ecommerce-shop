import { FormControl, Select } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
// import ReactQuill from "react-quill";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface InputProps extends FormControlProps {
  type: "text" | "password" | "email" | "number" | "tel" | "editor" | "select";
  name?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean | undefined;
  error?: any;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  listSelecte?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      defaultValue,
      placeholder,
      className,
      multiple,
      error,
      value,
      required,
      disabled,
      onChange,
      onBlur,
      style = {},
      listSelecte,
      children,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className="input">
          {label && (
            <label htmlFor="" className="input__label">
              {label}
            </label>
          )}
          {type === "select" ? (
            <FormControl fullWidth>
              <Select
                {...props}
                defaultValue={defaultValue}
                multiple={multiple}
              >
                {children}
              </Select>
            </FormControl>
          ) : type === "editor" ? (
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange as any}
              placeholder={placeholder}
            />
          ) : (
            <input
              type={type}
              ref={ref}
              value={value || undefined}
              name={name}
              defaultValue={defaultValue || undefined}
              required={required}
              placeholder={placeholder}
              disabled={disabled}
              className={`input__field`}
              style={{ ...style }}
              onChange={onChange}
              onBlur={onBlur}
              {...props}
            />
          )}
        </div>
        {/* Checking if there is an error and if there is, it will display the error message. */}
        {Boolean(error) && <p className="input__err">{error}</p>}
      </>
    );
  }
);

Input.displayName = "Input";
export default Input;
