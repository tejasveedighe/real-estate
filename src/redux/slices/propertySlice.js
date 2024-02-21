import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initalState = {
  properties: [],
  property: {},
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

export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async (payload) => {
    const res = await Axios.post("/property", payload);
    return res.data;
  }
);

export const getPropertyById = createAsyncThunk(
  "properties/getPropertyById",
  async (propertyId) => {
    const res = await Axios.get(`/Property/${propertyId}`);
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
    // get all property
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

    // add property
    builder.addCase(addProperty.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(addProperty.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(addProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.properties = action.payload;
    });

    // get property by id
    builder.addCase(getPropertyById.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getPropertyById.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(getPropertyById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.property = action.payload;
    });
  },
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
