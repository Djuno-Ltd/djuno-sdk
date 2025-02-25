export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg",
} as const;

export function detectMimeType(b64: string) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return `data:${signatures[s as keyof typeof signatures]};base64,${b64}`;
    }
  }
}

const lookup = [
  { value: 1, binaryValue: 1, symbol: "" },
  { value: 1e3, binaryValue: 1024, symbol: "K" },
  { value: 1e6, binaryValue: Math.pow(1024, 2), symbol: "M" },
  { value: 1e9, binaryValue: Math.pow(1024, 3), symbol: "G" },
  { value: 1e12, binaryValue: Math.pow(1024, 4), symbol: "T" },
  { value: 1e15, binaryValue: Math.pow(1024, 5), symbol: "P" },
  { value: 1e18, binaryValue: Math.pow(1024, 6), symbol: "E" },
];

export function humanizeSize(
  num: number,
  option?: { fractionDigits?: number }
) {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.binaryValue);
  const _number = item
    ? (num / item.binaryValue).toFixed(option?.fractionDigits).replace(rx, "$1")
    : 0;
  return {
    number: _number,
    symbol: item?.symbol,
    join: (unit: string) =>
      _number
        ? `${_number}${item?.symbol ? ` ${item?.symbol}` : ""}${unit}`
        : `${_number}`,
  };
}
