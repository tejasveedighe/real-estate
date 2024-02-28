import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initalState = {
  properties: [],
  property: {},
  loading: false,
  status: "idle",
  errors: {},
  lastAction: "",
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

export const searchProperty = createAsyncThunk(
  "properties/searchProperty",
  async (payload) => {
    const res = await Axios.post("/searchProperty", payload);
    return res.data;
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (propertyId) => {
    const res = await Axios.delete(`/property/${propertyId}`);
    return res.data;
  }
);

export const approveProperty = createAsyncThunk(
  "properties/approveProperty",
  async (propertyId) => {
    const res = await Axios.put(`/property/approve/${propertyId}`);
    return res.data;
  }
);

export const requestForContact = createAsyncThunk(
  "properties/requestForContact",
  async (payload) => {
    const res = await Axios.post("/contactApproval", payload);
    return res.data;
  }
);

export const getPropertyDataByUser = createAsyncThunk(
  "properties/getPropertyByUser",
  async (payload) => {
    const res = await Axios.get(
      `/Property/${payload.userId}/${payload.propertyId}`
    );
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
      state.lastAction = "getAllProperty";
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
      state.lastAction = "addProperty";
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
      state.lastAction = "getPropertyById";
      state.property = action.payload;
    });

    // search property
    builder.addCase(searchProperty.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(searchProperty.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
    });
    builder.addCase(searchProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.lastAction = "searchProperty";
      state.properties = action.payload;
    });

    // delete property by id
    builder.addCase(deleteProperty.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
      alert("Failed to delete Property please try later");
    });
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.lastAction = "deleteProperty";
    });

    // approve property by id
    builder.addCase(approveProperty.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(approveProperty.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
      alert("Failed to approve Property please try later");
    });
    builder.addCase(approveProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.lastAction = "approveProperty";
    });

    // approve contact
    builder.addCase(requestForContact.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(requestForContact.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
      alert("Failed to requrest for contact please try later");
    });
    builder.addCase(requestForContact.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.lastAction = "requestForContact";
      state.property = {
        ...state.property,
        approvalStatus: action.payload.approvalStatus
      }
    });

    // get property by user
    builder.addCase(getPropertyDataByUser.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getPropertyDataByUser.rejected, (state, action) => {
      state.loading = false;
      state.status = "rejected";
      state.errors = action.error;
      alert("Failed to fetch the property data for user");
    });
    builder.addCase(getPropertyDataByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "fulfilled";
      state.lastAction = "getPropertyDataByUser";
      state.property = action.payload;
    });
  },
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
