import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  photo: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.photo = action.payload.photo;
      state.name = action.payload.name;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.photo = null;
      state.name = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;
