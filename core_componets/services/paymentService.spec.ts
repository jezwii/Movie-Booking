import { createCheckoutSession, getCheckoutSession } from "./paymentService";
import * as httpService from "./httpService";

jest.mock("./httpService");
const mockedRequest = httpService.request as jest.Mock;

describe("paymentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCheckoutSession", () => {
    const payload = {
      totalAmount: 500,
      movieTitle: "Inception",
      movieImage: "https://example.com/inception.jpg",
      movieId: "1",
      bookingDate: "2025-06-01",
      bookingTime: "7:00 PM",
      seats: "A1,A2",
      ticketCount: 2,
    };

    it("resolves with url on success", async () => {
      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess({ url: "https://stripe.com/checkout/test" });
        return Promise.resolve();
      });

      const result = await createCheckoutSession(payload);
      expect(result).toEqual({ url: "https://stripe.com/checkout/test" });
    });

    it("calls request with POST and the correct endpoint", async () => {
      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess({ url: "https://stripe.com/pay" });
        return Promise.resolve();
      });

      await createCheckoutSession(payload);

      expect(mockedRequest).toHaveBeenCalledWith(
        "POST",
        "/api/create-checkout-session",
        expect.any(Function),
        expect.any(Function),
        {},
        "json",
        payload
      );
    });

    it("rejects when the request fails", async () => {
      const mockError = new Error("Server Error");
      mockedRequest.mockImplementationOnce((_method, _url, _onSuccess, onFailure) => {
        onFailure(mockError);
        return Promise.resolve();
      });

      await expect(createCheckoutSession(payload)).rejects.toBe(mockError);
    });
  });

  describe("getCheckoutSession", () => {
    const sessionId = "cs_test_abc123";

    it("resolves with status and metadata on success", async () => {
      const mockResponse = {
        status: "paid",
        metadata: { movieTitle: "Inception", seats: "A1,A2" },
      };

      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess(mockResponse);
        return Promise.resolve();
      });

      const result = await getCheckoutSession(sessionId);
      expect(result).toEqual(mockResponse);
    });

    it("calls request with GET and encodes the session ID in the URL", async () => {
      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess({ status: "paid", metadata: {} });
        return Promise.resolve();
      });

      await getCheckoutSession(sessionId);

      expect(mockedRequest).toHaveBeenCalledWith(
        "GET",
        `/api/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`,
        expect.any(Function),
        expect.any(Function)
      );
    });

    it("rejects when the request fails", async () => {
      const mockError = new Error("Not found");
      mockedRequest.mockImplementationOnce((_method, _url, _onSuccess, onFailure) => {
        onFailure(mockError);
        return Promise.resolve();
      });

      await expect(getCheckoutSession(sessionId)).rejects.toBe(mockError);
    });
  });
});
