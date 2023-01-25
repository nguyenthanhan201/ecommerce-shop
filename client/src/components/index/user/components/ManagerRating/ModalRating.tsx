import Input from "@/components/shared/Input/Input";
import { useToast } from "@/lib/providers/toast-provider";
import { Rating } from "@/lib/redux/types/rating.type";
import { RatingServices } from "@/lib/repo/rating.repo";
import { Rating as RatingMUI } from "@mui/material";
import { useState } from "react";

type ModalRatingProps = {
  selectedRating: Rating | null;
};

const ModalRating = ({ selectedRating }: ModalRatingProps) => {
  const toast = useToast();
  const [rating, setRating] = useState<number | null>(1);
  const [comment, setComment] = useState<string>("");
  const onEditorStateChange = (editorState: any) => {
    setComment(editorState);
  };

  const handleRating = () => {
    if (rating === null || comment === "" || !selectedRating?._id) return;
    toast.promise(
      "Gửi đánh giá thành công",
      RatingServices.updateRatingById(selectedRating?._id, rating, comment),
      "Gửi đánh giá thất bại"
    );
  };

  return (
    <>
      <p>{selectedRating?.idProduct.title}</p>
      <RatingMUI
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Input
        type="editor"
        value={comment}
        onChange={onEditorStateChange}
        placeholder="Nhập nội dụng comment"
      />
      <button onClick={handleRating}>Gửi đánh giá</button>
    </>
  );
};

export default ModalRating;
