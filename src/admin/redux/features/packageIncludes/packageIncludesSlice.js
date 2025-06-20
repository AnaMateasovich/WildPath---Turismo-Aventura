import { createSlice } from "@reduxjs/toolkit";
import { deleteIncludeById, saveIncludeWithPackageId, updatePackageInclude } from "./packageIncludesThunk";

const initialState = {
  packageIncludes: {
    description: "",
    src: "",
  },
  loading: false,
  error: null,
  message: null,
};

export const packageIncludeSlice = createSlice({
  name: "packageIncludes",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteIncludeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIncludeById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteIncludeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // guardar un include con package id
      .addCase(saveIncludeWithPackageId.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveIncludeWithPackageId.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(saveIncludeWithPackageId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // actualizar un include por id
      .addCase(updatePackageInclude.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePackageInclude.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePackageInclude.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearMessage } = packageIncludeSlice.actions;

export default packageIncludeSlice.reducer;
