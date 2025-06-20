import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategoryById, fetchCategories } from "./categoriesThunks";

const initialState = {
  category: {
    name: "",
    description: "",
  },
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.category = { ...state.category, ...action.payload };
    },
    resetCategoryForm: (state) => {
      state.category = initialState.category
    }
  },
  extraReducers: (builder) => {
    builder

      // get all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete category
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { updateCategory,resetCategoryForm } = categoriesSlice.actions;

export default categoriesSlice.reducer;
