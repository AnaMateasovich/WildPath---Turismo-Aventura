import { createSlice } from "@reduxjs/toolkit";
import {
  deletePackageById,
  fetch10Random,
  fetchPackageById,
  fetchPackages,
  fetchTravelPackagesPaginated,
  filterByCategory,
  updateCategory,
} from "./packageThunk";
import { category } from "../../../../data/db";
import { selectSelectedPackage } from "./packageSelectors";

export const initialState = {
  packages: [],
  filteredPackages: [],
  random: [],
  currentPage: 0,
  totalPages: 0,
  selectedPackage: null,
  editCategory: { categoryId: null, packageId: null },
  loading: false,
  error: null,
};

export const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    updateEditCategory: (state, action) => {
      state.editCategory = { ...state.editCategory, ...action.payload };
    },
    cleanFiltered: (state) => {
      state.filteredPackages = []
      state.isFiltered = false
    },
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload
    },
    clearSelectedPackage: (state) => {
      state.selectedPackage = null
    }
  },
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
        state.currentPage = action.payload.page.number;
        state.totalPages = action.payload.page.totalPages;
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
        state.random = action.payload;
      })
      .addCase(fetch10Random.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // edit package category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by category id
      .addCase(filterByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredPackages = action.payload;
        state.isFiltered = true;
      })
      .addCase(filterByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateEditCategory, cleanFiltered, setSelectedPackage, clearSelectedPackage } = packagesSlice.actions;

export default packagesSlice.reducer;
