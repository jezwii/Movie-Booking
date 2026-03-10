import paymentReducer, {
  setTotalAmount,
  setDescription,
  clearPayment,
} from "./paymentSlice";

describe("paymentSlice", () => {
  const initialState = { totalAmount: 0, description: "" };

  it("should return the initial state", () => {
    expect(paymentReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("setTotalAmount", () => {
    it("should set the total amount", () => {
      const state = paymentReducer(undefined, setTotalAmount(750));
      expect(state.totalAmount).toBe(750);
    });

    it("should overwrite a previously set total amount", () => {
      let state = paymentReducer(undefined, setTotalAmount(500));
      state = paymentReducer(state, setTotalAmount(1000));
      expect(state.totalAmount).toBe(1000);
    });
  });

  describe("setDescription", () => {
    it("should set the description", () => {
      const state = paymentReducer(undefined, setDescription("Inception — A1, A2"));
      expect(state.description).toBe("Inception — A1, A2");
    });

    it("should overwrite a previously set description", () => {
      let state = paymentReducer(undefined, setDescription("Old desc"));
      state = paymentReducer(state, setDescription("New desc"));
      expect(state.description).toBe("New desc");
    });
  });

  describe("clearPayment", () => {
    it("should reset totalAmount and description to defaults", () => {
      let state = paymentReducer(undefined, setTotalAmount(500));
      state = paymentReducer(state, setDescription("Test description"));
      state = paymentReducer(state, clearPayment());
      expect(state).toEqual(initialState);
    });

    it("should be safe to call on the initial state", () => {
      const state = paymentReducer(undefined, clearPayment());
      expect(state).toEqual(initialState);
    });
  });
});
