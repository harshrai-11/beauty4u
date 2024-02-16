import { getWeekDatesFromNDaysAgo } from "./helper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendIcon from "@mui/icons-material/Send";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InterestsIcon from "@mui/icons-material/Interests";

export const statsHeader = ["Post Insights", "View DMs", "Profile Insights"];

export const feedPageHeader = ["Post Stats", "Comments", "Demographic"];

export const userPageHeader = ["Instagram", "Facebook", "TikTok"];

export const adsHeader = ["Running Ads", "Inactive Ads", "Rejected Ads"];
export const adsetsHeader = [
  "Running Ad Set",
  "Inactive Ad Set",
  "Rejected Ad Set",
];

export const adPageHeader = ["Campaign", "Ad Sets", "Ads"];

export const dateFilter = [
  {
    labelFirst: "Last 1 day",
    labelSecond: `${getWeekDatesFromNDaysAgo(1)}`,
    value: 1,
  },
  {
    labelFirst: "Last 7 days",
    labelSecond: `${getWeekDatesFromNDaysAgo(7)}`,
    value: 2,
  },
  {
    labelFirst: "Last 28 days",
    labelSecond: `${getWeekDatesFromNDaysAgo(28)}`,
    value: 3,
  },
];

export const cardBarGraphData = [
  {
    value: 1,
    label: "ACCOUNTS REACHED",
    legendLabel1: "Followers",
    legendLabel2: "Non Followers",
  },
  {
    value: 2,
    label: "ACCOUNTS ENGAGED",
    legendLabel1: "Accounts",
  },
  {
    value: 3,
    label: "PROFILE VIEWS",
    legendLabel1: "Followers",
    legendLabel2: "Non Followers",
  },
  {
    value: 4,
    label: "FOLLOWERS DEMOGRAPHY",
  },
];

export const InstaInsightsbuttons = [
  {
    buttonLabel: "View DMs",
    variant: "text",
  },
  {
    buttonLabel: "Profile Stats",
    variant: "text",
    path: "stats",
  },
];

export const postStatsItems = [
  {
    id: 1,
    icon: <FavoriteIcon></FavoriteIcon>,
    label: "LIKES",
  },
  {
    id: 2,
    icon: <ModeCommentIcon></ModeCommentIcon>,
    label: "COMMENTS",
  },
  {
    id: 3,
    icon: <SendIcon className="inverted"></SendIcon>,
    label: "SHARE",
  },
  {
    id: 4,
    icon: <BookmarkIcon></BookmarkIcon>,
    label: "SAVED",
  },
];

export const listReelsStatsItems = [
  {
    id: 1,
    icon: <PlayArrowIcon></PlayArrowIcon>,
    label: "PLAYS",
  },
  {
    id: 2,
    icon: <InterestsIcon></InterestsIcon>,
    label: "TOTAL INTERACTIONS",
  },
  {
    id: 3,
    icon: <SendIcon className="inverted"></SendIcon>,
    label: "SHARE",
  },
  {
    id: 4,
    icon: <BookmarkIcon></BookmarkIcon>,
    label: "SAVED",
  },
];

export const reachTimePeriod = {
  1: "day",
  2: "week",
  3: "days_28",
};

export const reachTimeNumberDays = {
  1: 1,
  2: 7,
  3: 28,
};

export const ApiHeaders = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const PostApiHeaders = {
  method: "POST",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const PatchApiHeaders = {
  method: "PATCH",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const DeleteApiHeaders = {
  method: "DELETE",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT,DELETE, OPTIONS",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const breakdownValues = [
  { audience_gender_age: "age,gender" },
  { audience_country: "country" },
  { audience_city: "city" },
];
