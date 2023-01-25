import { Rating } from "@/lib/redux/types/rating.type";
import RatingMUI from "@mui/material/Rating";
import { memo } from "react";

type Props = {
  ratings: Rating[];
};
const ModalSeeComments = ({ ratings }: Props) => {
  return (
    <div>
      {ratings.length > 0 && (
        <div className="product_rating">
          <h1 className="product_rating_title">Đánh giá sản phẩm</h1>
          <div className="product_rating_list">
            {ratings.map((item, index: number) => (
              <div key={index} className="product_rating_list_item">
                <div className="flex items-center gap-2">
                  <RatingMUI value={item.rating} readOnly />
                  <p>{item.idAuth.name}</p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: item.comment }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ModalSeeComments);
