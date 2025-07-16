import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice";
import imageCompression from "browser-image-compression";
import api from "../../../../api/axios";

export const deleteIncludeById = createAsyncThunk(
  "/include/deleteById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`${API_URL}/admin/includes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting product feature."
      );
    }
  }
);

export const saveIncludeWithPackageId = createAsyncThunk(
  "/includes/saveWithPackageId/",
  async ({ packageId, packageIncludes }, thunkAPI) => {
    try {
      const formDataIncludes = new FormData();

      const jsonBlob = new Blob(
        [
          JSON.stringify(
            packageIncludes.map((include) => ({
              packageId,
              description: include.item,
            }))
          ),
        ],
        { type: "application/json" }
      );

      formDataIncludes.append("data", jsonBlob);

      for (const include of packageIncludes) {
        if (include.icon) {
          const compressedIcon = await imageCompression(include.icon, {
            fileType: "image/webp",
            maxSizeMB: 0.1,
            maxWidthOrHeight: 30,
            quality: 70,
            useWebWorker: true,
          });

          const originalName = include.icon.name?.split(".")[0] || "icon";
          const iconFile = new File([compressedIcon], `${originalName}.webp`, {
            type: "image/webp",
          });

          formDataIncludes.append("icon", iconFile);
        }
      }

      const token = localStorage.getItem("token");

      const response = await api.post(
        `${API_URL}/admin/includes/bulk`,
        formDataIncludes,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error to save product feature"
      );
    }
  }
);

export const updatePackageInclude = createAsyncThunk(
  "/includes/update",
  async ({include, packageId}, thunkAPI) => {
    try {
      
      const currentInclude = include[0]
      
      const formData = new FormData();

      const jsonBlob = new Blob(
        [
          JSON.stringify({
            id: currentInclude.id,
            description: currentInclude.item,
            packageId: packageId,
          }),
        ],
        { type: "application/json" }
      );

      formData.append("data", jsonBlob);

      if (currentInclude.icon instanceof File) {
        const compressedIcon = await imageCompression(currentInclude.icon, {
          fileType: "image/webp",
          maxSizeMB: 0.1,
          maxWidthOrHeight: 30,
          quality: 0.7,
          useWebWorker: true,
        });

        const originalName = currentInclude.icon.name?.split(".")[0] || "icon";
        const iconFile = new File([compressedIcon], `${originalName}.webp`, {
          type: "image/webp",
        });

        formData.append("icon", iconFile);
      }

      const token = localStorage.getItem("token");

      const response = await api.patch(
        `${API_URL}/admin/includes/update/${currentInclude.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);
