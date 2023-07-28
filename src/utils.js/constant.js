import { getWeekDatesFromNDaysAgo } from "./helper";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const statsHeader = ['Post Insights', 'View DMs', 'Profile Insights'];
export const dateFilter = [{
    labelFirst: 'Last 7 days',
    labelSecond: `${getWeekDatesFromNDaysAgo(7)}`,
    value: 7
},
{
    labelFirst: 'Last 30 days',
    labelSecond: `${getWeekDatesFromNDaysAgo(30)}`,
    value: 30
}, {
    labelFirst: 'Last 60 days',
    labelSecond: `${getWeekDatesFromNDaysAgo(60)}`,
    value: 60
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
    legendLabel1: "Followers",
    legendLabel2: "Non Followers"
}, {
    value: 3,
    label: "ACCOUNTS FOLLOWED",
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
