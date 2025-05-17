import { createSlice } from "@reduxjs/toolkit";
import {
  deletePackageById,
  fetch10Random,
  fetchPackageById,
  fetchPackages,
  fetchTravelPackagesPaginated,
} from "./packageThunk";

export const initialState = {
  packages: [],
  random: [],
  currentPage: 0,
  totalPages: 0,
  selectedPackage: null,
  loading: false,
  error: null,
};

export const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Package by id
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Delete package by id
      .addCase(deletePackageById.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(deletePackageById.fulfilled, (state, action) => {
        state.loading = false;
        // Eliminás el paquete del array localmente:
        state.packages = state.packages.filter(
          (pkg) => pkg.id !== action.meta.arg
        );
        // Si el paquete eliminado era el seleccionado, lo reseteás:
        if (state.selectedPackage?.id === action.meta.arg) {
          state.selectedPackage = null;
        }
      })

      // Get packages paginated
      .addCase(fetchTravelPackagesPaginated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelPackagesPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload.content;
        state.currentPage = action.payload.number;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTravelPackagesPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get 10 random
      .addCase(fetch10Random.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch10Random.fulfilled, (state, action) => {
        state.loading = false;
        state.random = action.payload
      })
      .addCase(fetch10Random.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default packagesSlice.reducer;
