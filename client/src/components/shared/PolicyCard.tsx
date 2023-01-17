import { ReactNode } from "react";

type PolicyCardProps = {
  name: string;
  description: string;
  icon: ReactNode;
};

const PolicyCard = (props: PolicyCardProps) => {
  return (
    <div className="policy-card">
      <div className="policy-card_icon">
        {/* <i className={props.icon}></i> */}
        {props.icon}
      </div>
      <div className="policy-card_info">
        <div className="policy-card_info_name">{props.name}</div>
        <div className="policy-card_info_description">{props.description}</div>
      </div>
    </div>
  );
};

export default PolicyCard;
