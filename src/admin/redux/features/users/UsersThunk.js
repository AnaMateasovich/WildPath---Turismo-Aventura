import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { API_URL } from "../FullFormCreate/formSlice";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`${API_URL}/admin/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener los usuarios"
      );
    }
  }
);

export const getRoles = createAsyncThunk("users/roles", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(`${API_URL}/admin/users/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Error al obtener los usuarios"
    );
  }
});

export const updateRole = createAsyncThunk(
  "users/updateRole",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(`${API_URL}/admin/users/role`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener los usuarios"
      );
    }
  }
);
