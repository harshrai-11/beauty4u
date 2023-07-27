import { Card, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Bar, BarChart, Legend } from 'recharts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CardGraph = ({ graphData, barData, currentActiveChart, setCurrentActiveChart }) => {

    const handleCurrentActiveCardChange = (value) => {
        setCurrentActiveChart(value);
    }

    return <div value={barData.value} onClick={() => { handleCurrentActiveCardChange(barData.value) }}>
        <Card className={`left-div-chart-card ${currentActiveChart === barData.value ? 'active-card' : ''}`}>
            <div className='chart-text'>
                <div>
                    <Typography align='left' sx={{ fontSize: 12, fontWeight: 600 }} color="white" gap={5}>{barData.label}</Typography>
                    <Typography align='left' style={{ fontWeight: 'bold' }} sx={{ fontSize: 16 }} color="white" gap={5}>
                        6345  <span style={{ fontWeight: 'normal', color: '#7cd985' }}>+45%</span></Typography>
                </div>
                <div className='right-arrow-icon'>
                <ArrowForwardIosIcon color='#fff'></ArrowForwardIosIcon>
                </div>
            </div>

            <BarChart
                width={300}
                height={250}
                data={graphData}
                className='bar-chart'
                barCategoryGap={10}
                barSize={50}
            >
                <Tooltip />
                <Legend className='bar-chart-legend' wrapperStyle={{ position: 'relative' }} />
                <Bar label={barData.legendLabel1} name={barData.legendLabel1} dataKey="pv" fill="#956fe6" />
                <Bar label={barData.legendLabel2} name={barData.legendLabel2} dataKey="uv" fill="#f4b25a" />
            </BarChart>
        </Card>
    </div>
}