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
