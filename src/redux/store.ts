import { configureStore } from "@reduxjs/toolkit";
import helpersReducer from "./helpers/slice";

const store = configureStore({
  reducer: {
    helpers: helpersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
