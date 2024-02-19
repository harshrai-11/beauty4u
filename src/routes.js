const BASE_API_URL = "https://shikhardubey85.pythonanywhere.com/";

// Stats APIs
export const FOLLOWERS_DEMOGRAPHY_API =
  BASE_API_URL + "/ig-user/user-insights-city-age-gender/";
export const GET_PROFILE_ACCOUNTS_REACHED = (userId) =>
  BASE_API_URL +
  `/ig-user/user-insights/?metric=reach,impressions&period=days_28,week,day&ig_user_id=${userId}`;
export const GET_PROFILE_ACCOUNTS_ENGAGED = (userId) =>
  BASE_API_URL +
  `/ig-user/user-insights/?metric=accounts_engaged&period=day&metric_type=total_value&ig_user_id=${userId}`;
export const GET_PROFILE_VIEWS = (userId) =>
  BASE_API_URL +
  `/ig-user/user-insights/?metric=impressions,reach,profile_views&period=day&ig_user_id=${userId}`;
export const ACCOUNTS_REACHED_DEMOGRAPHY_API = (breakdown, userId) =>
  BASE_API_URL +
  `/ig-user/user-insights-reached-demo/?period=lifetime&breakdown=${breakdown}&ig_user_id=${userId}`;
export const ACCOUNTS_ENGAGED_DEMOGRAPHY_API = (breakdown) =>
  BASE_API_URL +
  `/ig-user/user-insights-engaged-demo/?period=lifetime&breakdown=${breakdown}`;

// Instagram Feed Data
export const INSTAGRAM_FEED_DETAILS = (userId) =>
  BASE_API_URL + `/ig-user/media-fields/?ig_user_id=${userId}`;

export const INSTAGRAM_FEED_DETAILS_LIST = (
  isFirstPage,
  cursorToken,
  beforeOrAfter
) =>
  BASE_API_URL +
  "/ig-user/media-fields-insights-v2?limit=30" +
  (isFirstPage ? "" : `&${beforeOrAfter}=${cursorToken}`);

export const GET_PER_MEDIA_INSIGHT = (mediaType, mediaId) =>
  BASE_API_URL +
  `ig-user/media-insights/?media_id=${mediaId}&media_type=${mediaType}`;

// Tag
// export const UPDATE_TAG = BASE_API_URL + "ig-user/tag/";
export const UPDATE_MEDIA_TAG = BASE_API_URL + "ig-user/media-insights-update/";
export const GET_TAG_LIST = BASE_API_URL + "ig-user/tag-list";
export const ADD_TAGS = BASE_API_URL + "ig-user/tag-list/";
export const UPDATE_TAG = BASE_API_URL + "ig-user/tag-update/";
export const DELETE_TAG = BASE_API_URL + "ig-user/tag-delete/";

// User Info
export const GET_USER_LIST = BASE_API_URL + "/ig-user/id-details/";
export const INSTAGRAM_USER_INFO = (userId) =>
  BASE_API_URL + `/ig-user/user-fields/?ig_user_id=${userId}`;

// Ads
export const GET_ADS_INFO =
  BASE_API_URL + "/ad/advertisement/?endpoint=business";

//signup
export const SIGNUP = BASE_API_URL + "/users/signup/";
export const GET_OTP = BASE_API_URL + "/users/otp/";
export const VERIFY_CONTACT_NO = BASE_API_URL + "/users/otp/";
// export const LOGIN = BASE_API_URL + "/users/token/";
export const LOGIN = BASE_API_URL + "/users/token-login/";
export const LOGOUT = BASE_API_URL + "/users/token-logout/";

//business
export const ADS = BASE_API_URL + "ad/advertisement-ed/?endpoint=ads";
export const ADS_SETS = BASE_API_URL + "ad/advertisement-ed/?endpoint=adsets";

export const REVENUE = BASE_API_URL + "ad/advertisement-ads/";
