import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { API_URL } from "../FullFormCreate/formSlice";
import api from "../../../../api/axios";

//thunk para obtener categorias
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/all/categories`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error al obtener categorías"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async ({ category, image }, thunkAPI) => {
    try {
      const formDataCategory = new FormData();

      const jsonBlob = new Blob(
        [
          JSON.stringify({
            name: category.name,
            description: category.description,
          }),
        ],
        { type: "application/json" }
      );
      formDataCategory.append("data", jsonBlob);

      if (image) {
        const compressedImage = await imageCompression(image, {
          fileType: "image/webp",
          maxSizeMB: 0.2,
          maxWidthOrHeight: 300,
          quality: 80,
          useWebWorker: true,
        });

        const originalName = image.name?.split(".")[0] || "category";
        const imageFile = new File([compressedImage], `${originalName}.webp`, {
          type: "image/webp",
        });

        formDataCategory.append("image", imageFile);
      }

      const token = localStorage.getItem("token");

      const reponse = await api.post(
        `${API_URL}/admin/categories`,
        formDataCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return reponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al crear la categoría"
      );
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "categories/delete",
  async (id, thunkAPI) => {
    try {

      const token = localStorage.getItem("token");

      const response = await api.delete(
        `${API_URL}/admin/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al eliminar la categoría"
      );
    }
  }
);
