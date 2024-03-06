import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice";
import userReducer from "./slices/userSlice";
import offerReducer from "./slices/offerSlice";

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    user: userReducer,
    offer: offerReducer,
  },
});
