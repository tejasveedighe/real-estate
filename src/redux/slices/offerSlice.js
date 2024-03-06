import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/helpers";

const initialState = {
  offer: {},
  offers: [],
  loading: false,
  errors: {},
  lastAction: "",
};

export const sendOffer = createAsyncThunk("offer/sendOffer", async (offer) => {
  try {
    const res = await Axios.post("/sendOffer", offer);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const getOfferById = createAsyncThunk(
  "offer/getOfferById",
  async (payload) => {
    try {
      const res = await Axios.get("/getOfferById", {
        params: payload,
      });
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

const offerSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // send offer
    builder.addCase(sendOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOffer.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(sendOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });

    // send offer
    builder.addCase(getOfferById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOfferById.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(getOfferById.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });
  },
});

export default offerSlice.reducer;
