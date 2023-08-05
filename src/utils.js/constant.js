import { getWeekDatesFromNDaysAgo } from "./helper";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const statsHeader = ['Post Insights', 'View DMs', 'Profile Insights'];
export const dateFilter = [{
    labelFirst: 'Last 1 day',
    labelSecond: `${getWeekDatesFromNDaysAgo(1)}`,
    value: 1
},
{
    labelFirst: 'Last 7 days',
    labelSecond: `${getWeekDatesFromNDaysAgo(7)}`,
    value: 2
}, {
    labelFirst: 'Last 28 days',
    labelSecond: `${getWeekDatesFromNDaysAgo(28)}`,
    value: 3
}
]

export const cardBarGraphData = [{
    value: 1,
    label: "ACCOUNTS REACHED",
    legendLabel1: "Followers",
    legendLabel2: "Non Followers"
}, {
    value: 2,
    label: "ACCOUNTS ENGAGED",
    legendLabel1: "Accounts",
}, {
    value: 3,
    label: "PROFILE VIEWS",
    legendLabel1: "Followers",
    legendLabel2: "Non Followers"
}]

export const InstaInsightsbuttons = [{
    buttonLabel: 'View DMs',
    variant: 'text'
}, {
    buttonLabel: 'Profile Stats',
    variant: 'text'
}]

export const postStatsItems = [{
    id: 1,
    icon: <FavoriteIcon></FavoriteIcon>,
    label: 'LIKES'
}, {
    id: 2,
    icon: <ModeCommentIcon></ModeCommentIcon>,
    label: 'COMMENTS'
}, {

    id: 3,
    icon: <ShareIcon></ShareIcon>,
    label: 'SHARE'
}, {

    id: 4,
    icon: <BookmarkIcon></BookmarkIcon>,
    label: 'SAVED'
}]

export const userPageHeader = ['Instagram', 'Facebook', 'TikTok'];

export const reachTimePeriod = {
    1: 'day',
    2: 'week',
    3: 'days_28'
}