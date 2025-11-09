import { z } from "zod";
export const serialize = (obj: any) => {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p) && obj[p] !== undefined) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const handleTrimSpaces = (value?: string) => {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ");
};

export const formatToVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const getFileNameFromContentDisposition = (
  contentDisposition: string
): string => {
  let filename = "export.xlsx";

  // Check for filename* (RFC 5987 encoding)
  const filenameStarMatch = contentDisposition.match(
    /filename\*\=UTF-8''([^;]+)/i
  );
  if (filenameStarMatch && filenameStarMatch[1]) {
    filename = decodeURIComponent(filenameStarMatch[1]);
  } else {
    // Fallback to plain filename=
    const filenameMatch = contentDisposition.match(
      /filename="?([^;\r\n"]+)"?/i
    );
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  return filename;
};

export const downloadFile = (text: any, filename: string) => {
  const blob = new Blob([text], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

/**
 * requiredNumber – ép kiểu số linh hoạt cho cả bắt buộc và không bắt buộc.
 *
 * @param requiredMsg Thông báo lỗi khi để trống (chỉ dùng nếu isRequired = true)
 * @param invalidMsg  Thông báo lỗi khi nhập không hợp lệ
 * @param isRequired  Mặc định true (bắt buộc). Nếu false => cho phép rỗng/null/undefined
 */
export const requiredNumber = (
  requiredMsg: string,
  invalidMsg = "Giá trị phải là số hợp lệ",
  isRequired: boolean = true
) =>
  z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .superRefine((v, ctx) => {
      // Nếu bắt buộc và rỗng hoặc NaN → báo lỗi required
      if (isRequired) {
        const empty =
          v === null ||
          typeof v === "undefined" ||
          (typeof v === "string" && v.trim() === "") ||
          (typeof v === "number" && Number.isNaN(v));
        if (empty)
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: requiredMsg });
      }
    })
    .transform((v) => {
      // Xử lý khi rỗng mà không bắt buộc
      if (v === null || typeof v === "undefined") return undefined;
      if (typeof v === "string") {
        const s = v.trim();
        if (!isRequired && s === "") return undefined;
        const n = Number(s.replace(/,/g, ""));
        return n;
      }
      return v;
    })
    .refine((v) => v === undefined || Number.isFinite(v), {
      message: invalidMsg,
    });

export const coerceBool = z.preprocess((val) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") {
    const v = val.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(v)) return true;
    if (["false", "0", "no", "off"].includes(v)) return false;
    if (v === "") return undefined;
  }
  if (val == null) return undefined;
  return val;
}, z.boolean());
