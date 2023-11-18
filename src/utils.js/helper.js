export function getWeekDatesFromNDaysAgo(N) {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate); // Create a copy of the current date object

  // Calculate the date N days ago
  startOfWeek.setDate(currentDate.getDate() - N);

  // Calculate the date of the last day (today)
  const endOfWeek = new Date(currentDate);

  // Format the dates in the desired format "Month Day-Month Day"
  const options = { month: "long", day: "numeric" };
  const formattedStartDate = startOfWeek.toLocaleDateString(undefined, options);
  const formattedEndDate = endOfWeek.toLocaleDateString(undefined, options);

  return `${formattedStartDate}-${formattedEndDate}`;
}

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const isDesktop = () => {
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  return !isMobile;
};

export const isTablet = () => {
  const userAgent = navigator?.userAgent?.toLowerCase() ?? "";
  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent
    );
  return isTablet;
};

export const getStatsNumber = (data, id) => {
  switch (id) {
    case 1:
      return data.like_count;
    case 2:
      return data.comments_count;
    default:
      return data.comments_count;
  }
};

export const getStatsNumberList = (data, id) => {
  switch (id) {
    case 1:
      return data.insights.data.filter((val) => val.name === "plays")[0]
        .values[0].value;
    case 2:
      return data.insights.data.filter(
        (val) => val.name === "total_interactions"
      )[0].values[0].value;
    case 3:
      return data.insights.data.filter((val) => val.name === "shares")[0]
        .values[0].value;
    default:
      return data.insights.data.filter((val) => val.name === "saved")[0]
        .values[0].value;
  }
};

export const getSearchParam = (key) => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};
