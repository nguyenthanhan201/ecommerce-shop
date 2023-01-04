import { memo, useEffect } from "react";

type HelmetProps = {
  title: string;
  children: any;
};
const Helmet = (props: HelmetProps) => {
  useEffect(() => {
    document.title = "Yolo - " + props.title;
    return () => {};
  }, [props.title]);

  return <>{props.children}</>;
};

export default memo(Helmet);
