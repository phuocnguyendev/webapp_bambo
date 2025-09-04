import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Function to convert UTC time to local time
export const convertToLocalTime = (
  utcTime: string | number | Date | null | undefined
) => {
  return dayjs.utc(utcTime).local(); // Hoặc định dạng bạn cần
};

export default dayjs;
