import { path } from "@/constants/path";
import authApis from "@/features/Auth/apis/auth.apis";
import { clearTokens, getTokenFromLocalStorage } from "@/lib/auth";
import { refreshTokenHelper } from "@/utils/helpers";
import axios, {
  AxiosError,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

let refreshTokenInProgress: Promise<string> | null = null;
let failedQueue: FailedQueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
}

function parseErrorMessageFromBlob(
  data: Blob,
  onMessage: (msg: string) => void
) {
  const reader = new FileReader();
  reader.onloadend = function () {
    try {
      const result = reader.result;
      let base64 = "";
      if (typeof result === "string") {
        base64 = result.split(",")[1] || "";
      }
      const decodedMessage = atob(base64);
      const message = new TextDecoder().decode(
        Uint8Array.from(decodedMessage, (c) => c.charCodeAt(0))
      );
      onMessage(message || "Đã có lỗi xảy ra");
    } catch {
      onMessage("Đã có lỗi xảy ra");
    }
  };
  reader.readAsDataURL(data);
}

async function handleTokenRefresh(refreshToken: string): Promise<string> {
  const resp = await authApis.PostRefreshToken({ refreshToken });
  const newAccessToken = await refreshTokenHelper(resp.data.Item);
  if (!newAccessToken) throw new Error("Failed to refresh the token");
  return newAccessToken;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "*/*" },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = getTokenFromLocalStorage();
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    const { refreshToken } = getTokenFromLocalStorage();
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };
    const errorResponse: ErrorResponse = error?.response?.data as ErrorResponse;
    console.log(errorResponse);

    if (
      ![HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(
        error.response?.status as number
      )
    ) {
      const contentType = error?.response?.headers?.["content-type"];
      if (contentType && contentType.includes("application/json")) {
        const data = error.response?.data;
        if (data instanceof Blob) {
          parseErrorMessageFromBlob(data, (msg) => toast.error(msg));
        }
      } else if (error.message) {
        toast.error(error.message);
      }

      return Promise.reject(error);
    }

    if (
      (error.response?.status === HttpStatusCode.Unauthorized &&
        errorResponse?.message?.includes("InvalidToken")) ||
      errorResponse?.message?.includes("Invalid or expired refresh token")
    ) {
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.replace(path.Login);
      }
      return Promise.reject(error);
    }

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      errorResponse?.message?.includes("Token hết hạn") &&
      refreshToken &&
      !originalRequest._retry
    ) {
      if (refreshTokenInProgress) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers)
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            originalRequest._retry = true;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      } else {
        refreshTokenInProgress = new Promise<string>(
          async (resolve, reject) => {
            try {
              const newAccessToken = await handleTokenRefresh(refreshToken);
              resolve(newAccessToken);
              processQueue(null, newAccessToken);
            } catch (err) {
              processQueue(err, null);
              reject(err);
              clearTokens();
              if (typeof window !== "undefined") {
                window.location.replace(path.Login);
              }
            }
          }
        ).finally(() => {
          refreshTokenInProgress = null;
        });
        try {
          const newAccessToken = await refreshTokenInProgress;
          if (originalRequest.headers)
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          originalRequest._retry = true;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
