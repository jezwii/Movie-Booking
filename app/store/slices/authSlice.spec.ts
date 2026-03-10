import authReducer, {
  setUser,
  clearUser,
  AuthUser,
} from "./authSlice";

const mockUser: AuthUser = {
  uid: "user-123",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: null,
};

describe("authSlice", () => {
  const initialState = { user: null, isLoading: true };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("setUser", () => {
    it("should set the user and mark loading as false", () => {
      const state = authReducer(undefined, setUser(mockUser));
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
    });

    it("should overwrite an existing user", () => {
      const stateWithUser = authReducer(undefined, setUser(mockUser));
      const updatedUser: AuthUser = {
        uid: "user-456",
        email: "other@example.com",
        displayName: "Other User",
        photoURL: "https://example.com/photo.jpg",
      };
      const state = authReducer(stateWithUser, setUser(updatedUser));
      expect(state.user).toEqual(updatedUser);
      expect(state.isLoading).toBe(false);
    });
  });

  describe("clearUser", () => {
    it("should clear the user when one exists and mark loading as false", () => {
      const stateWithUser = authReducer(undefined, setUser(mockUser));
      const state = authReducer(stateWithUser, clearUser());
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
    });

    it("should handle clearUser when user is already null", () => {
      const state = authReducer(initialState, clearUser());
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
    });
  });
});
