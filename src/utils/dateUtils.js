import moment from 'moment';

export const formatDate = (date) => {
  const currentDate = moment(date);
  const now = moment();

  // Calculate differences in various units
  const diffMinutes = now.diff(currentDate, 'minutes');
  const diffHours = now.diff(currentDate, 'hours');
  const diffDays = now.diff(currentDate, 'days');
  const diffWeeks = now.diff(currentDate, 'weeks');
  const diffMonths = now.diff(currentDate, 'months');
  const diffYears = now.diff(currentDate, 'years');

  if (diffMinutes < 5) {
    return "Now";
  } else if (diffMinutes < 60) {
    return currentDate.fromNow(); // Utilizes Moment.js's relative time
  } else if (diffHours < 12) {
    return currentDate.fromNow(); // Utilizes Moment.js's relative time
  } else if (diffDays < 7) {
    return currentDate.fromNow(); // Utilizes Moment.js's relative time
  } else if (diffWeeks < 4) {
    return `${diffWeeks} weeks ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} months ago`;
  } else if (diffYears >= 1) {
    return `${diffYears} years ago`;
  } else {
    // Fallback for any other case
    return currentDate.format('DD/MM/YYYY'); // Formats date as "DD/MM/YYYY"
  }
};
