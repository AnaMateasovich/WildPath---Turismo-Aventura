import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../FullFormCreate/formSlice";
import api from "../../../../api/axios";

export const fetchPackages = createAsyncThunk(
  "packages/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/all/packages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/all/packages/${id}`);
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
      const token = localStorage.getItem("token");

      const response = await api.delete(`${API_URL}/admin/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
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
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/all/packages/page`, {
        params: { page, size },
      });
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

      const response = await api.get(`${API_URL}/all/packages/random`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error getting packages"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/package/update-category",
  async (editCategory, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `${API_URL}/admin/packages/update/category`,
        editCategory
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error getting packages"
      );
    }
  }
);

export const filterByCategory = createAsyncThunk(
  "/packages/category/id",
  async (categoryId, thunkAPI) => {
    try {
      const response = await api.get(
        `${API_URL}/all/packages/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error getting packages by category"
      );
    }
  }
);

export const searchPackageByName = createAsyncThunk(
  "/packages/searchByName",
  async (name, thunkAPI) => {
    try {
      const response = await api.get(
        `${API_URL}/all/packages/search-by-name/${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error searching packages"
      );
    }
  }
);

export const searchFiltered = createAsyncThunk(
  "/packages/searchFiltered",
  async ({ location, categoryId, startDate, endDate }, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/all/packages/search`, {
        params: { location, categoryId, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error filtering packages"
      );
    }
  }
);

export const getLocationSuggestions = createAsyncThunk(
  "/packages/locationSuggestions",
  async (query, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/all/packages/locations-suggestions`, {
        params: query,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error filtering packages"
      );
    }
  }
);


export const getDatesAvailableByPackageID = createAsyncThunk(
  "/packageId/datesAvailable",
  async(packageId, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/all/datesavailable/package/${packageId}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching packages dates available."
      );
    }
  }
)