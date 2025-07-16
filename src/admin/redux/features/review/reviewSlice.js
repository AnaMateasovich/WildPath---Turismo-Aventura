import { createSlice } from "@reduxjs/toolkit";
import {
  getAllReviewsByPackageId,
  getReviewedPackageIdsByUser,
  makeAReview,
} from "./reviewThunk";

const initialState = {
  reviews: [],
  userReviewsPackageIds: [],
  loading: false,
  error: null,
  successMessage: "",
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewsByPackageId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviewsByPackageId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviewsByPackageId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(makeAReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeAReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "SUCCESS";

        const newPackageId = action.payload.travelPackageId;

        // Evitá duplicados
        if (!state.userReviewsPackageIds.includes(newPackageId)) {
          state.userReviewsPackageIds.push(newPackageId);
        }
      })

      .addCase(makeAReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getReviewedPackageIdsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewedPackageIdsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userReviewsPackageIds = action.payload;
      })
      .addCase(getReviewedPackageIdsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
