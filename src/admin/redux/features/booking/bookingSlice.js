import { createSlice } from "@reduxjs/toolkit";
import { bookingConfirmationToken, createBooking, getBookings, getBookingsPackageIdsByUser } from "./bookingThunk";

const initialState = {
  booking: {},
  bookings: [],
  userBookingsPackageIds: [],
  confirmationMessage: "",
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBookingsPackageIdsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingsPackageIdsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookingsPackageIds = action.payload;
      })
      .addCase(getBookingsPackageIdsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bookingConfirmationToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookingConfirmationToken.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmationMessage = action.payload;
      })
      .addCase(bookingConfirmationToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
