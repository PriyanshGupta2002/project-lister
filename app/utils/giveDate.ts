const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit", // This will display the day as a two-digit number
};

export const giveDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", options);
};
