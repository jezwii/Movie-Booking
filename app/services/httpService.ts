import axios, { AxiosRequestConfig, ResponseType } from "axios";

export const JSON_RESPONSE_TYPE: ResponseType = "json";

export const request = async <T = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  onSuccess: (data: T) => void,
  onFailure?: (error: unknown) => void,
  additionalHeaders: Record<string, string> = {},
  responseType: ResponseType = JSON_RESPONSE_TYPE,
  body?: unknown,
): Promise<void> => {
  const config: AxiosRequestConfig = {
    method,
    url: path,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
    responseType,
    data: body,
  };

  try {
    const response = await axios.request<T>(config);
    onSuccess(response.data);
  } catch (error) {
    if (onFailure) onFailure(error);
  }
};
