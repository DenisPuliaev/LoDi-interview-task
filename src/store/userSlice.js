import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {})
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(loadUser.rejected, (state, payload) => {});
  },
});

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("user");
      return { email };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default userSlice.reducer;

export const selectUser = (state) => state.user;
