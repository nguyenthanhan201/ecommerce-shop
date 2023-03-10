import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import React from "react";

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onChange?: (e: any) => void;
};

const CheckBox = (props: CheckBoxProps) => {
  const inputRef = React.useRef(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      <span className="custom-checkbox_checkmark">
        <CheckOutlinedIcon fontSize="inherit"/>
      </span>
      {props.label}
    </label>
  );
};

export default CheckBox;
