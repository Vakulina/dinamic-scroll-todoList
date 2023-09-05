import { getRandomInt } from "./getPandomInt";

export const  getRandomFormattedTimestamp = () => {
  const now = new Date();
  const oneHundredYearsAgo = new Date(now);
  oneHundredYearsAgo.setFullYear(now.getFullYear() - 100);
  const randomTimestamp = getRandomInt(
    oneHundredYearsAgo.getTime(),
    now.getTime()
  );
  const randomDate = new Date(randomTimestamp);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formatter.format(randomDate);
};
