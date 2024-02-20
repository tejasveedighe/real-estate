import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initalState = {
  properties: [],
  loading: false,
  status: "idle",
  errors: {},
};

export const getAllProperty = createAsyncThunk(
  "properties/getAllProperties",
  async () => {
    const res = await Axios.get("/getAllproperty");
    return res.data;
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: initalState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProperty.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getAllProperty.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getAllProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.properties = action.payload;
    });
  },
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
