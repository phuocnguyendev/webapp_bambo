export const PAGE_DEFAULT = 1;
export const PAGE_SIZE_DEFAULT = 10;

export const STATUS_ACTIVE = [
  { label: "Đang hoạt động", value: "true" },
  { label: "Ngừng hoạt động", value: "false" },
];

export const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export const STATUS_WAREHOUSE_OPTIONS = [
  { label: "Đang hoạt động", value: 1 },
  { label: "Ngừng hoạt động", value: 2 },
  { label: "Bảo trì", value: 3 },
  { label: "Chờ phê duyệt", value: 4 },
];
