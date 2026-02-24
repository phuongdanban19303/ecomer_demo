import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  Id: string;
  Name?: string;
  img?: string;
  price?: string | number;
  Quantity: number;
}

const getListCart = (): CartItem[] => {
  const data = localStorage.getItem("listcart");
  return data ? JSON.parse(data) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { Listcart: getListCart() },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const check = state.Listcart.find((prd) => prd.Id === action.payload.Id);
      if (!check) {
        state.Listcart.push(action.payload);
        localStorage.setItem("listcart", JSON.stringify(state.Listcart));
      }
    },
    upCart: (state, action: PayloadAction<string>) => {
      const item = state.Listcart.find((prd) => prd.Id === action.payload);
      if (item) item.Quantity += 1;
      localStorage.setItem("listcart", JSON.stringify(state.Listcart));
    },
    downCart: (state, action: PayloadAction<string>) => {
      const index = state.Listcart.findIndex((prd) => prd.Id === action.payload);
      if (index !== -1) {
        if (state.Listcart[index].Quantity === 1) {
          state.Listcart.splice(index, 1);
        } else {
          state.Listcart[index].Quantity -= 1;
        }
        localStorage.setItem("listcart", JSON.stringify(state.Listcart));
      }
    },
    deleteCart: (state, action: PayloadAction<string>) => {
      state.Listcart = state.Listcart.filter((item) => item.Id !== action.payload);
      localStorage.setItem("listcart", JSON.stringify(state.Listcart));
    },
  },
});

export const { addToCart, upCart, downCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;