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


export const SimpleBarChart = ({ data, yKey, xKey, height, fontFillColor, showXAxis = false, fontSize = 14, width = 400, backgroundFill = 'none', labelPosition = 'insideEnd', fontFill = '#000', graphFill = '#f4b25a' }) => {
    return (
        <ResponsiveContainer width={width} height={height} debounce={1} >
            <BarChart layout="vertical" data={data} {...{
                overflow: 'visible'
            }} barGap={100}>
                {showXAxis && <CartesianGrid opacity={0.5} />}
                <XAxis hide type="number" />
                <YAxis interval={0} dataKey={xKey} type="category" tick={{ fill: fontFillColor, fontSize }} tickLine={false} axisLine={showXAxis} ></YAxis>
                <Tooltip />
                <Bar dataKey={yKey} fill={graphFill} label={{ position: labelPosition, fill: fontFill, fontSize }} barSize={13} background={{ fill: backgroundFill }} />
            </BarChart>
        </ResponsiveContainer>

    );
};
