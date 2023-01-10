import { FormControl, InputLabel, Select as SelectMUI } from "@mui/material";
import React from "react";

interface SelectProps extends FormControlProps {
  defaultValue?: string | string[];
  label?: string;
  error?: any;
  multiple?: boolean;
}

const Select = React.forwardRef(
  (
    { defaultValue, label, error, children, multiple, ...props }: SelectProps,
    ref
  ) => {
    return (
      <FormControl
        fullWidth
        error={error}
        className="input"
        style={{ marginTop: "20px" }}
      >
        <InputLabel>{label}</InputLabel>
        <SelectMUI {...props} multiple={multiple} defaultValue={defaultValue}>
          {children}
        </SelectMUI>
        {/* Checking if there is an error and if there is, it will display the error message. */}
        {Boolean(error) && <p className="input__err">{error}</p>}
      </FormControl>
    );
  }
);

export default Select;
