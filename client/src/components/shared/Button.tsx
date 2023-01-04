import { memo, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  backgroundColor?: string;
  size?: string;
  icon?: string;
  animate?: boolean;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  // console.log("button");
  const bg = props.backgroundColor ? "bg-" + props.backgroundColor : "bg-main";

  const size = props.size ? "btn-" + props.size : "";

  const animate = props.animate ? "btn-animate" : "";

  return (
    <button
      className={`btn ${bg} ${size} ${animate}`}
      onClick={props.onClick ? props.onClick : undefined}
    >
      <span className="btn_txt">{props.children}</span>
      {props.icon ? (
        <span className="btn_icon">
          <i className={`${props.icon} bx-tada`}></i>
        </span>
      ) : null}
    </button>
  );
};

export default memo(Button);
