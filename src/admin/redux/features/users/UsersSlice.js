import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, getRoles, updateRole } from "./UsersThunk";

const initialState = {
  users: [],
  roles: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false
        state.roles = action.payload
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRole.pending, (state) => {
        state.loading = true
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default usersSlice.reducer
