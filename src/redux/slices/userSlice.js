import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  user: null,
  users: [],
  userProperties: [],
  loading: false,
  status: "idle",
  errors: {},
};

export const loginUser = createAsyncThunk("user/login", async (payload) => {
  const res = await Axios.post("/login", payload);
  return res.data;
});

export const signupUser = createAsyncThunk("user/signup", async (payload) => {
  const res = await Axios.post("/AddUser", payload);
  return res.data;
});

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  const res = await Axios.get("/user");
  return res.data;
});

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (userId) => {
    const res = await Axios.delete(`/delete/${userId}`);
    return res.data;
  }
);

export const getUserPropertiesById = createAsyncThunk(
  "properties/getUserById",
  async (userId) => {
    const res = await Axios.get(`/user/${userId}`);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.user = action.payload;
    });

    // sign up
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.user = action.payload;
    });

    // get all users
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.users = action.payload;
    });

    // delete user by id
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
    });

    // get user by id
    builder.addCase(getUserPropertiesById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getUserPropertiesById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getUserPropertiesById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.userProperties = action.payload;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
