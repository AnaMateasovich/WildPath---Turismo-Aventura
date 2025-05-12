import { createSlice } from "@reduxjs/toolkit";
import { saveFullForm } from "./formThunk";


export const API_URL = "http://localhost:8081";

// export const createFullForm = createAsyncThunk(
//   "fullform/create",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Error al crear el formulario");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const formSlice = createSlice({
  name: "fullform-create",
  // initialState: {
  //   enterprise: {
  //     name: "Patagonia Adventures",
  //     cuit: "34-5874-9878",
  //     email: "patagonia@mail.com",
  //     phone: "23423454",
  //     address: "Calle 123",
  //     socialMedia: "@patagoniadventures",
  //     description: "Turismo Aventura",
  //   },
  //   package: {
  //     name: "Hikking en la montaña",
  //     category: "Senderismo",
  //     place: "",
  //     duration: "2 días / 1 noche",
  //     latitude: "",
  //     longitude: "",
  //     locationAddress: "El Calafate, Santa Cruz",
  //     pricePerPerson: "$148715",
  //     difficulty: "Intermedio",
  //     discount: "10% en grupos de 4 personas",
  //     cancelPolicy: "Cancelación gratuita si cancelas 1 semana antes",
  //     includes: ["Colaciones", "Almuerzo", "Hospedaje"],
  //     noIncludes: ["Cena", "Entradas"],
  //     schedule: [
  //       {day: "Dia 1", hour: "9:00", description: "Subida a la montaña"},
  //       {day: "Dia 1", hour: "12:00", description: "Almuerzo en el cerro"}
  //     ],
  //   },
  //   images: [],
  //   datesAvailable: [{date:"25-07-2025", capacity: 25},
  //     {date:"26-07-2025", capacity: 15},
  //     {date:"27-07-2025", capacity: 4}
  //   ],
  //   requirements: [
  //     {title:"Edad mínima", description:"12 años"}
  //   ]
  // },
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
      category: "",
      place: "",
      duration: "",
      latitude: 0,
      longitude: 0,
      locationAddress: "",
      pricePerPerson: "",
      difficulty: "",
      discount: "",
      cancelPolicy: "",
    },
    schedule: [],
    datesAvailable: [],
    requirements: [],
  },
  reducers: {
    updateEnterprise: (state, action) => {
      state.enterpriseForm = { ...state.enterpriseForm, ...action.payload };
    },
    selectedEnterprise: (state, action) => {
      state.enterpriseForm = { ...action.payload }
      state.selectedEnterpriseId = action.payload.id;
    },
    updatePackage: (state, action) => {
      state.package = { ...state.package, ...action.payload };
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
      });
  },
});

export const {
  updateEnterprise,
  selectedEnterprise,
  updatePackage,
  addScheduleItem,
  removeScheduleItem,
  addDateAvailable,
  removeDateAvailable,
  addRequirement,
  removeRequirement,
} = formSlice.actions;

export default formSlice.reducer;
