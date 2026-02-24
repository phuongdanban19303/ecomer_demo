// Thêm chữ 'type' vào trước PayloadAction
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../api/apiClient";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    Poprd: null as Product | null,
  },
  reducers: {
    openPop: (state, action: PayloadAction<Product>) => {
      state.isOpen = true;
      state.Poprd = action.payload;
    },
    closePop: (state) => {
      state.isOpen = false;
      state.Poprd = null;
    },
  },
});

export const { openPop, closePop } = popupSlice.actions;
export default popupSlice.reducer;