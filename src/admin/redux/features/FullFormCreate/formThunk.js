import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveDatesAvailable,
  saveEnterprise,
  saveImages,
  saveIncludes,
  savePackage,
  saveRequirements,
} from "../../../../api/helpers/apiHelpers";
import axios from "axios";
import { API_URL } from "./formSlice";
import api from "../../../../api/axios";
export const saveFullForm = createAsyncThunk(
  "fullform/save",
  async ({ packageIncludes, images }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const {
        enterpriseForm,
        selectedEnterpriseId,
        package: pack,
        datesAvailable,
        requirements,
      } = state.fullForm;


      // 1. Guardar la empresa
      const enterpriseId = await saveEnterprise(
        enterpriseForm,
        selectedEnterpriseId
      );

      // 2. Guardar el paquete con enterpriseId
      const packageId = await savePackage(pack, enterpriseId);

      // 3. Guardar los includes del paquete
      await saveIncludes(packageIncludes, packageId);

      // 4. Guardar las imágenes del paquete
      await saveImages(images, packageId);

      // 5. Guardar fechas disponibles
      await saveDatesAvailable(datesAvailable, packageId);

      // 6. Guardar requerimientos
      await saveRequirements(requirements, packageId);

    } catch (err) {
      console.error("Error al guardar todo:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error desconocido"
      );
    }
  }
);

export const checkPackageName = createAsyncThunk(
  'packages/checkName',
  async (name, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`${API_URL}/admin/packages/check-name?name=${encodeURIComponent(name)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { name, exists: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error checking package name');
    }
  }
);
