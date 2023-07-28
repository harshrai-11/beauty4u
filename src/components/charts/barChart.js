import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";


export const SimpleBarChart = ({ data, yKey, xKey, height, fontFillColor, showXAxis = false, fontSize = 14, width = 400 }) => {
    return (
        <ResponsiveContainer width={width} height={height} debounce={1} >
            <BarChart layout="vertical" data={data} {...{
                overflow: 'visible'
            }} barGap={100}>
                {showXAxis && <CartesianGrid opacity={0.5} />}
                <XAxis hide type="number" />
                <YAxis interval={0} dataKey={xKey} type="category" tick={{ fill: fontFillColor, fontSize }} tickLine={false} axisLine={showXAxis} />
                <Tooltip />
                <Bar dataKey={yKey} fill="#f4b25a" label={{ position: "right", fill: fontFillColor, fontSize }} barSize={13} />
            </BarChart>
        </ResponsiveContainer>

    );
};
