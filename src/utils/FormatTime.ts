export const formatTime = (date: Date) => {
  date = new Date(date);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
};
