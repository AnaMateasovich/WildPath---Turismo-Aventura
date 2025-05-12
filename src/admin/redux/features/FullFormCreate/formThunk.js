import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./formSlice";

export const saveFullForm = createAsyncThunk(
  "fullform/save",
  async ({ packageIncludes, noIncludes, images }, thunkAPI) => {
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

      const packageRes = await axios.post(`${API_URL}/packages`, packageData);
      const packageId = packageRes.data.id;

      //3. Guardar los includes del paquete
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

      packageIncludes.forEach((include) => {
        if (include.icon) {
          formDataIncludes.append("icon", include.icon);
        }
      });

      const includesRes = await axios.post(
        `${API_URL}/includes/bulk`,
        formDataIncludes
      );

      //4. Guardar las imágenes del paquete
      const formDataImages = new FormData();
      images.forEach((image) => {
        formDataImages.append("file", image);
      });
      formDataImages.append("packageId", packageId);
      const imagesRes = await axios.post(
        `${API_URL}/packages/images`,
        formDataImages
      );
    

      //5. Guardar los dates available
      const datesAvailableWithPackageId = datesAvailable.map((date) => ({
        ...date,
        packageId: packageId,
      }));
      const datesAvailableRes = await axios.post(
        `${API_URL}/datesavailable`,
        datesAvailableWithPackageId
      );

      //6. Guardar los requirements
      const requirementsWithPackageId = requirements.map((req) => ({
        ...req,
        packageId: packageId,
      }));
      const requirementsRes = await axios.post(
        `${API_URL}/requirements`,
        requirementsWithPackageId
      );

      console.log("Formulario guardado");
    } catch (err) {
      console.error("Error al guardar todo:", err);
      console.log("Respuesta del servidor:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error desconocido"
      );
    }
  }
);
