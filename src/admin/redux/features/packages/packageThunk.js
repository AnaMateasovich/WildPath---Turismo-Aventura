import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../FullFormCreate/formSlice";

export const fetchPackages = createAsyncThunk(
  "packages/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error getting packages"
      );
    }
  }
);

export const fetchPackageById = createAsyncThunk(
  "packages/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/packages/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error getting package"
      );
    }
  }
);

export const deletePackageById = createAsyncThunk(
  "package/deleteById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/packages/${id}`);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error deleting package"
      );
    }
  }
);

export const fetchTravelPackagesPaginated = createAsyncThunk(
  "packages/fetchPaginated",
  async ({ page = 0, size = 6 }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/packages/page`, {
        params: { page, size },
      });
      console.log(response.data + "esto llega del backend");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error getting packages"
      );
    }
  }
);

export const fetch10Random = createAsyncThunk(
  "packages/fetch10Random",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/packages/random`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error getting packages"
      );
    }
  }
);
