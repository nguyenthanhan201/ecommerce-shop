import { formatDate } from "@/lib/helpers/parser";
import { Rating } from "@/lib/redux/types/rating.type";
import { Avatar } from "@mui/material";
import RatingMUI from "@mui/material/Rating";
import { memo } from "react";

type Props = {
  ratings: Rating[];
};
const ModalSeeComments = ({ ratings }: Props) => {
  return (
    <>
      {ratings.length > 0 && (
        <>
          <h1 className="mb-3">Đánh giá sản phẩm</h1>
          <div>
            {ratings.map((item, index: number) => (
              <div key={index} className="product-rating">
                <Avatar sx={{ width: 24, height: 24 }}>
                  {item.idAuth.name.charAt(0)}
                </Avatar>
                <div className="product-rating__main">
                  <div>
                    <p>{item.idAuth.name}</p>
                    <RatingMUI value={item.rating} readOnly size="small" />
                    <p className="product-rating__time">
                      {formatDate(item.updatedAt, "date")}
                    </p>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: item.comment }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default memo(ModalSeeComments);
