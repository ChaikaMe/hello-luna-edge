import { RootState } from "../store";

export const selectisLoading = (state: RootState): boolean =>
  state.helpers.loading;
