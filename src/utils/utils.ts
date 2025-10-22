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
