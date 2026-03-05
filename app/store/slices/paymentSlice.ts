import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  totalAmount: number; // in INR
  description: string; // booking details description``
}

const initialState: PaymentState = {
  totalAmount: 0,
  description: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    clearPayment: (state) => {
      state.totalAmount = 0;
      state.description = "";
    },
  },
});

export const { setTotalAmount, setDescription, clearPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
