import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  col: number;
  mdCol?: number;
  smCol?: number;
  gap?: number;
};

const Grid = (props: GridProps) => {
  const style = {
    gap: props.gap ? `${props.gap}px` : "0",
  };

  const col = props.col ? `grid-col-${props.col}` : "";
  const mdCol = props.col ? `grid-col-md-${props.mdCol}` : "";
  const smCol = props.col ? `grid-col-sm-${props.smCol}` : "";

  return (
    <div className={`grid ${col} ${mdCol} ${smCol}`} style={style}>
      {props.children}
    </div>
  );
};

export default Grid;
