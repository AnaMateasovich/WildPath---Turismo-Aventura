import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { API_URL } from "../FullFormCreate/formSlice";

export const fetchEnterprises = createAsyncThunk(
  "fetch/enterprises",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/admin/enterprises`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener las empresas"
      );
    }
  }
);
