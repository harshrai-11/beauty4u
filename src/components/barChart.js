import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";


export const SimpleBarChart = ({ data, yKey, xKey, height, fontFillColor }) => {
    return (
        <ResponsiveContainer width={400} height={height} debounce={1} >
            <BarChart layout="vertical" data={data}>
                <XAxis hide type="number" />
                <YAxis dataKey={xKey} type="category" tick={{ fill: fontFillColor, fontSize: 14 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey={yKey} fill="#f4b25a" label={{ position: "right", fill: fontFillColor, fontSize: 14 }} barSize={13} />
            </BarChart>
        </ResponsiveContainer>

    );
};
