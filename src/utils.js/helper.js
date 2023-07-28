export function getWeekDatesFromNDaysAgo(N) {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate); // Create a copy of the current date object

  // Calculate the date N days ago
  startOfWeek.setDate(currentDate.getDate() - N);

  // Calculate the date of the last day (today)
  const endOfWeek = new Date(currentDate);

  // Format the dates in the desired format "Month Day-Month Day"
  const options = { month: 'long', day: 'numeric' };
  const formattedStartDate = startOfWeek.toLocaleDateString(undefined, options);
  const formattedEndDate = endOfWeek.toLocaleDateString(undefined, options);

  return `${formattedStartDate}-${formattedEndDate}`;
}

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}