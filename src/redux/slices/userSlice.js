import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  user: null,
  loading: false,
  status: "idle",
  errors: {},
};

export const loginUser = createAsyncThunk("user/login", async (payload) => {
  const res = await Axios.post("/login", payload);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = true;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilld";
      state.user = action.payload;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
