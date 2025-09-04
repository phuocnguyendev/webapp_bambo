export interface PasswordOptions {
  length?: number;
  lower?: boolean;
  upper?: boolean;
  number?: boolean;
  symbol?: boolean;
  excludeAmbiguous?: boolean; // loại bỏ ký tự dễ nhầm: 0,O,o,1,l,I,|, etc.
}

const BASE_LOWER = "abcdefghijklmnopqrstuvwxyz";
const BASE_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE_NUMBER = "0123456789";
const BASE_SYMBOL = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";
const AMBIGUOUS = new Set(["0", "O", "o", "1", "l", "I", "|"]);

export function generatePassword(opts: PasswordOptions = {}): string {
  const {
    length = 12,
    lower = true,
    upper = true,
    number = true,
    symbol = true,
    excludeAmbiguous = false,
  } = opts;

  const pools: string[] = [];

  const maybeFilter = (s: string) =>
    excludeAmbiguous ? [...s].filter((ch) => !AMBIGUOUS.has(ch)).join("") : s;

  const lowerPool = lower ? maybeFilter(BASE_LOWER) : "";
  const upperPool = upper ? maybeFilter(BASE_UPPER) : "";
  const numberPool = number ? maybeFilter(BASE_NUMBER) : "";
  const symbolPool = symbol ? maybeFilter(BASE_SYMBOL) : "";

  if (lowerPool) pools.push(lowerPool);
  if (upperPool) pools.push(upperPool);
  if (numberPool) pools.push(numberPool);
  if (symbolPool) pools.push(symbolPool);

  if (pools.length === 0) {
    throw new Error("At least one character set must be enabled.");
  }
  if (length < pools.length) {
    throw new Error(
      `Length must be >= ${pools.length} to include all required character sets.`
    );
  }

  // 1) Đảm bảo có ít nhất 1 ký tự từ mỗi nhóm bật
  const chars: string[] = [];
  for (const pool of pools) {
    chars.push(randomChar(pool));
  }

  // 2) Phần còn lại chọn ngẫu nhiên từ hợp các pool
  const all = pools.join("");
  for (let i = chars.length; i < length; i++) {
    chars.push(randomChar(all));
  }

  // 3) Xáo trộn Fisher–Yates với nguồn crypto
  shuffleInPlace(chars);

  return chars.join("");
}

/** Chọn 1 ký tự ngẫu nhiên từ chuỗi s (không lệch phân phối, dùng crypto) */
function randomChar(s: string): string {
  const n = s.length;
  if (n <= 0) throw new Error("Pool is empty.");
  // rejection sampling để tránh modulo bias
  const max = 256;
  const limit = Math.floor(max / n) * n; // giá trị lớn nhất chấp nhận
  let x = 0;
  do {
    x = getRandomByte();
  } while (x >= limit);
  const idx = x % n;
  return s.charAt(idx);
}

/** Xáo trộn tại chỗ bằng Fisher–Yates, chỉ số ngẫu nhiên dùng crypto */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomIntInclusive(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/** random integer trong [min, max] dùng crypto (rejection sampling) */
function randomIntInclusive(min: number, max: number): number {
  if (max < min) throw new Error("max must be >= min");
  const range = max - min + 1;
  const maxByte = 256;
  const limit = Math.floor(maxByte / range) * range;
  let x = 0;
  do {
    x = getRandomByte();
  } while (x >= limit);
  return min + (x % range);
}

/** Lấy 1 byte ngẫu nhiên từ Web Crypto / Node Crypto */
function getRandomByte(): number {
  const buf = new Uint8Array(1);
  (
    globalThis.crypto ?? require("node:crypto").webcrypto.crypto
  ).getRandomValues(buf);
  return buf[0]!;
}
