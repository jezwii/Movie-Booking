import axios from "axios";
import { request } from "./httpService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("httpService - request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls onSuccess with response data for a successful GET", async () => {
    const mockData = { results: [{ id: 1, title: "Inception" }] };
    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    await request("GET", "/api/movies", onSuccess, onFailure);

    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(mockData);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it("calls onFailure with the error when the request fails", async () => {
    const mockError = new Error("Network Error");
    mockedAxios.request.mockRejectedValueOnce(mockError);

    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    await request("GET", "/api/movies", onSuccess, onFailure);

    expect(onFailure).toHaveBeenCalledWith(mockError);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("sends a POST request with the correct body and Content-Type header", async () => {
    const payload = { title: "Inception", amount: 500 };
    mockedAxios.request.mockResolvedValueOnce({ data: { url: "https://stripe.com" } });

    const onSuccess = jest.fn();

    await request("POST", "/api/checkout", onSuccess, undefined, {}, "json", payload);

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/checkout",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
        data: payload,
      })
    );
  });

  it("merges additional headers into the request", async () => {
    mockedAxios.request.mockResolvedValueOnce({ data: {} });

    const onSuccess = jest.fn();
    const extraHeaders = { Authorization: "Bearer token123" };

    await request("GET", "/api/protected", onSuccess, undefined, extraHeaders);

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token123" }),
      })
    );
  });

  it("does not throw if onFailure is not provided and request fails", async () => {
    mockedAxios.request.mockRejectedValueOnce(new Error("Boom"));
    const onSuccess = jest.fn();

    await expect(request("GET", "/api/fail", onSuccess)).resolves.toBeUndefined();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
