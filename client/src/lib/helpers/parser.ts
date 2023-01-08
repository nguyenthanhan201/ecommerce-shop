export const numberWithCommans = (num: Number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
