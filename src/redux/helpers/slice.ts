import { createSlice } from "@reduxjs/toolkit";

interface HelpersState {
  loading: boolean;
}

const initialState: HelpersState = {
  loading: false,
};

const helpersSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = helpersSlice.actions;

const helpersReducer = helpersSlice.reducer;
export default helpersReducer;
