import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  HttpStatusCode,
} from "axios";
import axiosInstance from "./apiConfig";

async function fetchWithAuthRetry<T>(
  apiCall: () => Promise<AxiosResponse<T>>,
  maxRetries: number = 1
): Promise<AxiosResponse<T>> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error: unknown) {
      if (
        (error as AxiosError)?.response?.status ===
          HttpStatusCode.Unauthorized &&
        attempt < maxRetries
      ) {
        continue;
      }
      lastError = error;
      break;
    }
  }
  throw lastError;
}

const HttpService = {
  GET: async <TResponse>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() => axiosInstance.get<TResponse>(url, options));
  },

  POST: async <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() =>
      axiosInstance.post<TResponse>(url, data, options)
    );
  },

  POSTFORM: async <
    TResponse,
    TRequest extends FormData | Record<string, unknown> = FormData
  >(
    url: string,
    data?: TRequest,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() =>
      axiosInstance.postForm<TResponse>(url, data, options)
    );
  },

  PUT: async <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() =>
      axiosInstance.put<TResponse>(url, data, options)
    );
  },

  PUTFORM: async <
    TResponse,
    TRequest extends FormData | Record<string, unknown> = FormData
  >(
    url: string,
    data?: TRequest,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() =>
      axiosInstance.putForm<TResponse>(url, data, options)
    );
  },

  DELETE: async <TResponse>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return fetchWithAuthRetry(() =>
      axiosInstance.delete<TResponse>(url, options)
    );
  },
};

export default HttpService;
