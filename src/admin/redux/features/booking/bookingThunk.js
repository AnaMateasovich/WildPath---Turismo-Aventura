import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../FullFormCreate/formSlice";
import api from "../../../../api/axios";

export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ packageId, dateAvailableId, quantityPeople, userInfo }, thunkAPI) => {
    try {

      const token = localStorage.getItem("token")

      const response = await api.post(
        `${API_URL}/users/booking`,
        {
          packageId,
          dateAvailableId,
          quantityPeople,
          ...userInfo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      (response.data)
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error creating booking"
      )
    }
  }
)

export const getBookings = createAsyncThunk("bookings/history", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`${API_URL}/users/booking/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Error al obtener las reseñas"
    );
  }
});

export const getBookingsPackageIdsByUser = createAsyncThunk(
  "booking/getUserBookings",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `${API_URL}/users/booking/booking-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener las reservas"
      );
    }
  }
);

export const bookingConfirmationToken = createAsyncThunk(
  "/booking/confirmationToken",
  async(token, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/all/booking/token-confirm?token=${token}`)

      return response.data
    } catch (error) {
      const message = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
)