import createKeccakHash from "keccak";

export function calcTextWidth(text: string, font: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = font;
  const { width } = context.measureText(text);
  return width;
}

export function toRealAddress(address: string) {
  address = address.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

export const getStorage = (key: string, defaultValue: any = "null"): string => {
  return JSON.parse(localStorage.getItem(key) || defaultValue);
};

export const setStorage = (key: string, value: any): string => {
  const stringifyValue = JSON.stringify(value);
  localStorage.setItem(key, stringifyValue);
  return stringifyValue;
};

export const removeStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const dateLocale = {
  en: {
    month_names: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    month_names_short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};
export function dateFormat(date: Date, withoutDate?: boolean) {
  return `${dateLocale["en"].month_names_short[date.getMonth()]}${
    withoutDate ? "" : " " + date.getDate()
  }, ${date.getFullYear()}`;
}

export function convertDate(date: string) {
  const arr = date.split(/[- T :]/);
  return new Date(
    // @ts-ignore
    arr[0],
    // @ts-ignore
    arr[1] - 1,
    arr[2] || null
  );
}

export const dateConvertor = (date: number) => {
  return new Date(date * 1000).toLocaleDateString("en-us", {
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
