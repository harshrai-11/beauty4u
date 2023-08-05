const BASE_API_URL = 'https://shikhardubey85.pythonanywhere.com/'

export const CITY_GENDER_API = BASE_API_URL + '/ig-user/user-insights-city-age-gender/'
export const INSIGHTS = BASE_API_URL + '/ig-user/user-insights/?metric=reach,impressions&period=days_28,week,day';
export const INSTAGRAM_FEED_DETAILS = BASE_API_URL + '/ig-user/media-fields/'
export const INSTAGRAM_USER_INFO = BASE_API_URL + '/ig-user/user-fields/'
export const GET_PROFILE_ACCOUNTS_ENGAGED = BASE_API_URL + '/ig-user/user-insights/?metric=accounts_engaged&period=day&metric_type=total_value';
export const GET_PROFILE_VIEWS = BASE_API_URL + '/ig-user/user-insights/?metric=impressions,reach,profile_views&period=day';
