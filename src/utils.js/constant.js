import { getWeekDatesFromNDaysAgo } from "./helper";

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