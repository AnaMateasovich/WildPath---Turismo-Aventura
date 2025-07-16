import { createSlice } from "@reduxjs/toolkit";
import {
  addFavorite,
  checkIfFavorite,
  fetchFavorites,
  removeFavorite,
} from "./favoritesThunk";
import { logout } from "../auth/authSlice";

const initialState = {
  favoriteIds: [],
  favoriteMap: {},
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoriteIds = action.payload.map((pkg) => pkg.id);
        action.payload.forEach((pkg) => {
          state.favoriteMap[pkg.id] = true;
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const id = action.payload;
        if (!state.favoriteIds.includes(id)) {
          state.favoriteIds.push(id);
        }
        state.favoriteMap[id] = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const id = action.payload;
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
        delete state.favoriteMap[id];
        state.favorites = state.favorites.filter((pkg) => pkg.id !== id);
      })
      .addCase(checkIfFavorite.fulfilled, (state, action) => {
        const { packageId, isFavorite } = action.payload;
        state.favoriteMap[packageId] = isFavorite;
        if (isFavorite && !state.favoriteIds.includes(packageId)) {
          state.favoriteIds.push(packageId);
        } else if (!isFavorite) {
          state.favoriteIds = state.favoriteIds.filter(
            (id) => id !== packageId
          );
        }
      })

      .addCase(logout, () => initialState);
  },
});

export default favoriteSlice.reducer;
