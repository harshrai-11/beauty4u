import { Card, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Bar, BarChart, Legend } from 'recharts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { isTablet } from '../../utils.js/helper';

export const CardGraph = ({ graphData, barData, currentActiveChart, setCurrentActiveChart }) => {

    const handleCurrentActiveCardChange = (value) => {
        setCurrentActiveChart(value);
    }
    const isSingleValueGraph = graphData[0]?.pv ? false : true

    return <div value={barData.value} onClick={() => { handleCurrentActiveCardChange(barData.value) }}>
        <Card className={`left-div-chart-card ${currentActiveChart === barData.value ? 'active-card' : ''}`}>
            <div className='chart-text'>
                <div>
                    <Typography align='left' sx={{ fontSize: 12, fontWeight: 600 }} color="white" gap={5}>{barData.label}</Typography>
                    {isSingleValueGraph && graphData.length && <Typography align='left' style={{ fontWeight: 'bold' }} sx={{ fontSize: 16 }} color="#7cd985" gap={5}>
                        {graphData[0]?.uv}  
                        </Typography>}
                </div>
                <div className='right-arrow-icon'>
                <ArrowForwardIosIcon color='#fff'></ArrowForwardIosIcon>
                </div>
            </div>

            <BarChart
                width={isTablet() ? 150 : 300}
                height={250}
                data={graphData}
                className='bar-chart'
                barCategoryGap={10}
                barSize={50}
            >
                <Legend className='bar-chart-legend' wrapperStyle={{ position: 'relative' }} />
                <Bar label={{position: 'insideStart', fill: '#000'}} name={barData.legendLabel1} dataKey="uv" fill="#956fe6" />
                <Tooltip></Tooltip>

                {!isSingleValueGraph && <Bar label={{position: 'insideStart', fill: '#000'}} name={barData.legendLabel2} dataKey="pv" fill="#f4b25a" />}
            </BarChart>
        </Card>
    </div>
}