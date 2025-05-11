import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./formSlice";

export const saveFullForm = createAsyncThunk(
  "fullform/save",
  async ({ includes, noIncludes, images }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const {
        enterprise,
        selectedEnterpriseId,
        package: pack,
        datesAvailable,
        requirements,
      } = state.fullForm;

      // 1. Guardar la empresa
      let enterpriseId;
      if (selectedEnterpriseId) {
        enterpriseId = selectedEnterpriseId;
      } else {
        const enterpriseRes = await axios.post(
          `${API_URL}/enterprises`,
          enterprise
        );
        enterpriseId = enterpriseRes.data.id;
      }

      //2. Guardar el paquete con enterpriseId
      const categoryId = Number(pack.category);
      const placeId = Number(pack.place);
      const packageData = {
        name: pack.name,
        categoryId: categoryId, // ID de la categoría
        placeId: placeId, // ID del lugar
        duration: pack.duration,
        latitude: pack.latitude,
        longitude: pack.longitude,
        locationAddress: pack.locationAddress,
        pricePerPerson: parseFloat(pack.pricePerPerson),
        difficulty: pack.difficulty,
        discount: pack.discount,
        cancelPolicy: pack.cancelPolicy,
        description: pack.description,
        enterpriseId: enterpriseId, // ID de la empresa
      };
      console.log("packageData a enviar: ", packageData);

      const packageRes = await axios.post(`${API_URL}/packages`, packageData);
      const savedPackage = packageRes.data;

      console.log(enterpriseId, savedPackage);
    } catch (err) {
      console.error("Error al guardar todo:", err);
      console.log("Respuesta del servidor:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error desconocido"
      );
    }
  }
);
