import format from "date-fns/format";

export const numberWithCommans = (num: Number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function formatDate(
  date: string | Date | number | undefined,
  formatText:
    | "date"
    | "time"
    | "datetime"
    | "year_month_date"
    | (string & {}) = "date"
): string {
  let formatString;
  switch (formatText) {
    case "date": {
      formatString = "dd/MM/yyyy";
      break;
    }
    case "time": {
      formatString = "HH:mm";
      break;
    }
    case "datetime": {
      formatString = "HH:mm dd/MM/yyyy";
      break;
    }
    case "year_month_date": {
      formatString = "yyyy-MM-dd";
      break;
    }
    default: {
      formatString = formatText;
      break;
    }
  }
  return date ? format(new Date(date), formatString) : "";
}
