import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { API_URL } from "../FullFormCreate/formSlice";

export const getAllReviewsByPackageId = createAsyncThunk(
  "reviews/packageId",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/all/review/packages/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener las reseñas"
      );
    }
  }
);

export const makeAReview = createAsyncThunk(
  "review/create",
  async ({ stars, comment, travelPackageId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        `${API_URL}/users/review`,
        { stars, comment, travelPackageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al crear la reseña"
      );
    }
  }
);


export const getReviewedPackageIdsByUser = createAsyncThunk(
  "review/getUserReviews",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `${API_URL}/users/review/reviewed-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener las reseñas"
      );
    }
  }
);
