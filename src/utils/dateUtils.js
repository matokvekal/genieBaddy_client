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
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (currentDate.isSame(now, 'week')) {
    return "This week";
  } else if (currentDate.isSame(now, 'month')) {
    return "This month";
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  } else {
    return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
  }
};