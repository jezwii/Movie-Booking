import axios, { AxiosRequestConfig, ResponseType } from "axios";

export const JSON_RESPONSE_TYPE: ResponseType = "json";

export const request = async (
  method: "GET",
  path: string,
  onSuccess: (data: any) => void,
  onFailure?: (data: any) => void,
  additionalHeaders: any = {},
  responseType: ResponseType = JSON_RESPONSE_TYPE,
) => {
  const config: AxiosRequestConfig = {
    method,
    url: path,
    headers: {
      ...additionalHeaders,
    },
    responseType,
  };

  try {
    const response = await axios.request(config);
    onSuccess(response.data);
  } catch (error) {
    if (onFailure) onFailure(error);
  }
};
