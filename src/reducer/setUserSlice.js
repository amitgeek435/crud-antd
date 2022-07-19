import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userData: [],
    fakeData: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { data } = action.payload;
      state.userData.push(data);
      state.fakeData = state.userData;
    },
    delUser: (state, action) => {
      const { index } = action.payload;
      state.userData.splice(index, 1);
      state.fakeData = state.userData;
    },
    editUser: (state, action) => {
      const { data, index } = action.payload;
      state.userData[index] = data;
      state.fakeData = state.userData;
    },
  },
});

export const { setUser, delUser, editUser } = user.actions;

export default user.reducer;
