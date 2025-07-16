import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { API_URL } from "../FullFormCreate/formSlice";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/users/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error to fetch favorites"
      );
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (packageId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        `${API_URL}/users/favorites/${packageId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return packageId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error to add favorite"
      );
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (packageId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(
        `${API_URL}/users/favorites/${packageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return packageId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error to delete favorite"
      );
    }
  }
);

export const checkIfFavorite = createAsyncThunk(
  "favorites/check",
  async (packageId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `${API_URL}/users/favorites/${packageId}/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { packageId, isFavorite: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error checking favorite"
      );
    }
  }
);
