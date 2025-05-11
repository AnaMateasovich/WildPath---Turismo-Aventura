import { createSlice } from "@reduxjs/toolkit";
import { fetchEnterprises } from "./enterpriseThunks";

const initialState = {
  enterprises: [],
  loading: false,
  error: null,
};

export const enterpriseSlice = createSlice({
  name: "enterprises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnterprises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnterprises.fulfilled, (state, action) => {
        (state.loading = false), (state.enterprises = action.payload);
      })
      .addCase(fetchEnterprises.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default enterpriseSlice.reducer;
