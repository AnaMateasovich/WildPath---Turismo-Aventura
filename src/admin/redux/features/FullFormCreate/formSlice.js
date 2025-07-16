import { createSlice } from "@reduxjs/toolkit";
import { checkPackageName, saveFullForm } from "./formThunk";

export const API_URL = "http://localhost:8081";

export const formSlice = createSlice({
  name: "fullform-create",

  initialState: {
    enterpriseForm: {
      name: "",
      cuit: "",
      email: "",
      phone: "",
      address: "",
      socialMedia: "",
      description: "",
    },
    selectedEnterpriseId: null,
    package: {
      name: "",
      description: "",
      category: "",
      place: "",
      duration: {
        days: "",
        hours: "",
        minutes: "",
        nights: "",
      },
      latitude: 0,
      longitude: 0,
      locationAddress: "",
      pricePerPerson: "",
      difficulty: "",
      discount: "",
      cancelPolicy: "",
    },
    nameCheck: {
      value: "",
      exists: false,
      status: "idle",
      error: null,
    },
    // schedule: [],
    datesAvailable: [],
    requirements: [],
  },
  reducers: {
    updateEnterprise: (state, action) => {
      state.enterpriseForm = { ...state.enterpriseForm, ...action.payload };
    },
    selectedEnterprise: (state, action) => {
      state.enterpriseForm = { ...action.payload };
      state.selectedEnterpriseId = action.payload.id;
    },
    clearSelectedEnterprise: (state) => {
      state.enterpriseForm = {
        name: "",
        cuit: "",
        email: "",
        phone: "",
        address: "",
        socialMedia: "",
        description: "",
      };
      state.selectedEnterpriseId = null;
    },
    updatePackage: (state, action) => {
      const [key, value] = Object.entries(action.payload)[0];

      if (["days", "hours", "minutes", "nights"].includes(key)) {
        state.package.duration[key] = Number(value);
      } else {
        state.package[key] = value;
      }
    },
    addScheduleItem: (state, action) => {
      state.schedule.push(action.payload);
    },
    removeScheduleItem: (state, action) => {
      state.schedule.splice(action.payload, 1);
    },
    addDateAvailable: (state, action) => {
      state.datesAvailable.push(action.payload);
    },
    removeDateAvailable: (state, action) => {
      state.datesAvailable.splice(action.payload, 1);
    },
    addRequirement: (state, action) => {
      state.requirements.push(action.payload);
    },
    removeRequirement: (state, action) => {
      state.requirements.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFullForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveFullForm.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveFullForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // check by package name
      .addCase(checkPackageName.pending, (state) => {
        state.nameCheck.status = "loading";
      })
      .addCase(checkPackageName.fulfilled, (state, action) => {
        state.nameCheck.status = "succeeded";
        state.nameCheck.value = action.payload.name;
        state.nameCheck.exists = action.payload.exists;
      })
      .addCase(checkPackageName.rejected, (state, action) => {
        state.nameCheck.status = "failed";
        state.nameCheck.error = action.payload;
      });
  },
});

export const {
  updateEnterprise,
  selectedEnterprise,
  clearSelectedEnterprise,
  updatePackage,
  addScheduleItem,
  removeScheduleItem,
  addDateAvailable,
  removeDateAvailable,
  addRequirement,
  removeRequirement,
} = formSlice.actions;

export default formSlice.reducer;
