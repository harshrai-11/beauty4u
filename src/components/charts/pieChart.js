import React from 'react';
import { Pie, ResponsiveContainer, PieChart, Cell, Tooltip, Legend } from 'recharts';

const RadialPieChart = ({ graphData }) => {

    const COLORS = ['#82ca9d', '#fff'];

    return <ResponsiveContainer height={400}>
        <PieChart height={500} width={500}>
            <Pie dataKey="value" data={graphData} innerRadius={70} outerRadius={90} label paddingAngle={5} >
                {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}</Pie>
            <Tooltip></Tooltip>
            <Legend />
        </PieChart>
    </ResponsiveContainer>

}

export default RadialPieChart;