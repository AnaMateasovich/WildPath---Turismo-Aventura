import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import { Textarea } from "../../admin/components/Textarea/Textarea";
import { Button } from "../Button/Button";
import styles from "./ReviewForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviewsByPackageId,
  makeAReview,
} from "../../admin/redux/features/review/reviewThunk";
import { toast } from "react-toastify";

const ReviewForm = ({ packageId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handlePostReview = async () => {
    try {
      await dispatch(
        makeAReview({
          stars: rating,
          comment: comment,
          travelPackageId: packageId,
        })
      );
      if (makeAReview.fulfilled) {
        toast.success("Reseña publicada con éxito");
        setRating(0);
        setComment("");
        dispatch(getAllReviewsByPackageId(packageId));
      } else {
        toast.error("Ocurrio un error al publicar la reseña");
      }
    } catch (error) {
      toast.error("Error inesperado");
    }
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Calificá tu experiencia</h3>

      <div className={styles.rating}>
        <StarRating rating={rating} onRatingChange={setRating} />
        <p>Tu puntuación: {rating}</p>
      </div>

      <Textarea
        htmlFor="review"
        labelName="Dejanos tu reseña"
        placeholder="Escribí tu experiencia..."
        value={comment}
        inputName="review"
        onChange={(e) => setComment(e.target.value)}
        disabled={false}
        id="review"
        className={styles.textarea}
      />

      <div className={styles.buttonWrapper}>
        <Button
          text="Publicar"
          className={styles.button}
          onClick={handlePostReview}
        />
      </div>
    </div>
  );
};

export default ReviewForm;
