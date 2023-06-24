
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';


const lineChartData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const StatsPage = () => {
    return (<div className='stats-page-layout'>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="lightgrey" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="white"
                href="/"
            >
                Instagram
            </Link>
        </Breadcrumbs>
        <div className='stats-section'>
            <div className='left-div' style={{ backgroundColor: '#273047' }}>
                <div className='stats-section-header'>
                    <span>Post Insights</span>
                    <span>View DMs</span>
                    <span className='active'>Profile Insights</span>

                </div>
                <div className='stats-select'>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Last 7 days</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Last 7 days"
                                className='stats-select-class'
                            >
                                <MenuItem value={10}>Last 7 days</MenuItem>
                                <MenuItem value={20}>Last 30 days</MenuItem>
                                <MenuItem value={30}>Last 60 days</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Female</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                className='stats-select-class'
                            >
                                <MenuItem value={10}>Female</MenuItem>
                                <MenuItem value={20}>Male</MenuItem>
                                <MenuItem value={30}>Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='stats-observation'>
                    <Card style={{ backgroundColor: '#273047' }}>
                        <CardContent>
                            <Typography align='left' sx={{ fontSize: 14 }} color="white" gutterBottom>
                                OBSERVATION
                            </Typography>
                            <div className='stats-observation-details'>
                                <TrendingUpRoundedIcon className='icon'></TrendingUpRoundedIcon>
                                <div className='details-text'>
                                    <Typography align='left' sx={{ fontSize: 14 }} color="white" gap={5}>
                                        You have reached 70% more than usual days
                                    </Typography>
                                    <Typography align='left' sx={{ fontSize: 10 }} color="white" gap={5}>
                                        SINCE LAST 7 DAYS
                                    </Typography>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="left-div-chart">
                    <Card style={{ backgroundColor: '#273047' }}>
                        <Typography style={{ paddingLeft: '10px' }} align='left' sx={{ fontSize: 12 }} color="white" gap={5}>
                            ACCOUNTS REACHED                                    </Typography>
                        <Typography align='left' style={{ paddingLeft: '10px', fontWeight: 'bold' }} sx={{ fontSize: 16 }} color="white" gap={5}>
                            6345  <span style={{ fontWeight: 'normal', color: '#7cd985' }}>+45%</span>                               </Typography>
                        <BarChart
                            width={400}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <Tooltip />
                            <Legend />
                            <Bar label="Followers" name='Followers' dataKey="pv" fill="#8884d8" />
                            <Bar label="Non Followers" name='Non Followers' dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </Card>

                </div>
            </div>
            <div className='right-div' style={{ backgroundColor: '#273047' }}>
                <div className='stats-section-header'>
                    <img src='https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces'></img>
                    <span>Dr. Mendeta Videos</span>
                </div>
                <div className='right-div-chart'>
                    <AreaChart
                        width={450}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>

                    <Card style={{ backgroundColor: '#273047' }}>
                        <Typography style={{ paddingLeft: '10px' }} align='left' sx={{ fontSize: 12 }} color="white" gap={5}>
                            Content Reach                                    
                        </Typography>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <Tooltip />
                            <Legend />
                            <Bar label="Followers" name='Followers' dataKey="pv" fill="#8884d8" />
                            <Bar label="Non Followers" name='Non Followers' dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </Card>
                </div>
            </div>

        </div>
    </div>)

}

export default StatsPage;