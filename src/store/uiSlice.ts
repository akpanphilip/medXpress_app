import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  emergencyOpen: boolean;
  toast: { message: string; tone: "success" | "info" | "error" } | null;
}

const initialState: UiState = {
  emergencyOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openEmergency(state) {
      state.emergencyOpen = true;
    },
    closeEmergency(state) {
      state.emergencyOpen = false;
    },
    showToast(state, action: PayloadAction<UiState["toast"]>) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { openEmergency, closeEmergency, showToast, clearToast } =
  uiSlice.actions;
export default uiSlice.reducer;
