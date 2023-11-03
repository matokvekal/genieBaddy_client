
export const formatDate = (date) => {
  const now = new Date();
  const currentDate = new Date(date); // assuming 'date' is valid Date string

  // Calculate the difference in milliseconds
  const diffTime = now - currentDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Create an object with options to format the time part
  const timeOptions = { hour: "numeric", minute: "numeric" };

  if (diffDays === 0) {
    // If the message was sent today, return just the time
    return currentDate.toLocaleTimeString("en-US", timeOptions);
  } else if (diffDays === 1) {
    // If it was sent yesterday, return the word "Yesterday"
    return "Yesterday";
  } else if (diffDays < 7) {
    // If it was sent less than a week ago, return the number of days
    return `${diffDays} days ago`;
  } else if (diffDays >= 7 && diffDays < 365) {
    // If it was sent more than a week ago but less than a year ago, return the date in "DD/MM" format
    return currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    });
  } else {
    // If it was sent more than a year ago, return the date in "DD/MM/YYYY" format
    return currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
};
