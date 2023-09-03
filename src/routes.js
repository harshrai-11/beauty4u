const BASE_API_URL = 'https://shikhardubey85.pythonanywhere.com/'

export const FOLLOWERS_DEMOGRAPHY_API = BASE_API_URL + '/ig-user/user-insights-city-age-gender/'
export const GET_PROFILE_ACCOUNTS_REACHED = BASE_API_URL + '/ig-user/user-insights/?metric=reach,impressions&period=days_28,week,day';
export const INSTAGRAM_FEED_DETAILS = BASE_API_URL + '/ig-user/media-fields/'
export const INSTAGRAM_FEED_DETAILS_LIST = (isFirstPage, cursorToken, beforeOrAfter) => BASE_API_URL + '/ig-user/media-fields-insights?limit=30' + (isFirstPage ? '' : `&${beforeOrAfter}=${cursorToken}`)
export const INSTAGRAM_USER_INFO = BASE_API_URL + '/ig-user/user-fields/'
export const GET_PROFILE_ACCOUNTS_ENGAGED = BASE_API_URL + '/ig-user/user-insights/?metric=accounts_engaged&period=day&metric_type=total_value';
export const GET_PROFILE_VIEWS = BASE_API_URL + '/ig-user/user-insights/?metric=impressions,reach,profile_views&period=day';
export const GET_PER_MEDIA_INSIGHT = (mediaType, mediaId) => BASE_API_URL + `ig-user/media-insights/?media_id=${mediaId}&media_type=${mediaType}`;
export const ACCOUNTS_REACHED_DEMOGRAPHY_API = (breakdown) => BASE_API_URL + `/ig-user/user-insights-reached-demo/?period=lifetime&breakdown=${breakdown}`;
export const ACCOUNTS_ENGAGED_DEMOGRAPHY_API = (breakdown) => BASE_API_URL + `/ig-user/user-insights-engaged-demo/?period=lifetime&breakdown=${breakdown}`;
export const UPDATE_TAG = BASE_API_URL + '/ig-user/tag/'