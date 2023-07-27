
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, NativeSelect, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { XAxis, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { CITY_GENDER_API, INSIGHTS } from '../routes';
import { pickHighest, countryCodesWithNames, calculateGenderDataTotal, mockResponse, mockResponseReach } from '../helper';
import { SimpleBarChart } from './charts/barChart';
import axios from 'axios';

import countriesImg from './images/countries.jpeg';
import ageRangeImg from './images/ageRange.jpeg';
import cityImg from './images/city.jpeg';
import genderImg from './images/gender.webp';
import { cardBarGraphData, dateFilter, statsHeader } from '../utils.js/constant';
import { CardGraph } from './charts/card-graph';
import { getWeekDatesFromNDaysAgo } from '../utils.js/helper';

const data = [
    {
        name: 'Page A',
        uv: 2000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 3000,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 4000,
        pv: 3000,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 5000,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 7000,
        pv: 500,
        amt: 2181,
    }
];

const StatsPage = () => {

    const [countryData, setCountryData] = useState([]);
    const [barGraphCountryData, setBarGraphCountryData] = useState([]);
    const [open, setOpen] = useState(false);
    const [popupTitle, setPopupTtile] = useState('');
    const [cityData, setCityData] = useState([]);
    const [barGraphCityData, setBarGraphCityData] = useState([]);
    const [apiResponse, setApiResponse] = useState(undefined);
    const [ageData, setAgeData] = useState([]);
    const [barGraphAgeData, setBarGraphAgeData] = useState([]);
    const [popupData, setPopupData] = useState(undefined);

    const [barGraphGenderData, setBarGraphGenderData] = useState([]);
    const [reachApiResponse, setReachApiResponse] = useState(undefined);
    const [barGraphReachApi, setBarGraphReachApi] = useState([]);

    const [activeHeaderOption, setActiveHeaderOption] = useState('Profile Insights');
    const [dateRangeFilterValue, setDateRangeFilterValue] = useState(7);
    const [currentActiveChart, setCurrentActiveChart] = useState(1);

    useEffect(() => {

        axios(CITY_GENDER_API, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
        }).then(ageCityGenderResponse => {
            if (ageCityGenderResponse.data.data) {
                const apiResponse = ageCityGenderResponse.data.data
                setApiResponse(apiResponse)
            }
        }).catch(err => {
            console.log('ERROR', err);
            setApiResponse(mockResponse)
        })

        axios(INSIGHTS, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
        }).then(insightResponse => {
            if (insightResponse.data.data) {
                const apiResponse = insightResponse.data.data
                setReachApiResponse(apiResponse)
            }
        }).catch(err => {
            console.log('ERROR', err);
            setApiResponse(mockResponseReach)
        })
    }, []);

    useEffect(() => {
        if (apiResponse) {
            // Country Data
            let countryData = [];
            const countryDataRes = apiResponse.data.filter(val => val.name === 'audience_country')[0];
            const countryDataValues = countryDataRes.values[0].value;
            Object.keys(countryDataValues).forEach(val => {
                countryData.push({ name: countryCodesWithNames[val], pv: countryDataValues[val] })
            })
            setCountryData(countryData);
            const CountryDataTop3 = pickHighest(countryDataValues, 3)
            let barGraphCountryData = [];
            Object.keys(CountryDataTop3).forEach(val => {
                barGraphCountryData.push({ name: countryCodesWithNames[val], pv: CountryDataTop3[val] })
            });

            setBarGraphCountryData(barGraphCountryData);

            // City Data
            let cityData = [];
            const cityDatRes = apiResponse.data.filter(val => val.name === 'audience_city')[0];
            const cityDataValues = cityDatRes.values[0].value;
            Object.keys(cityDataValues).forEach(val => {
                cityData.push({ name: val.split(',')[0], pv: cityDataValues[val] })
            })
            setCityData(cityData);
            const cityDataTop3 = pickHighest(cityDataValues, 3)
            let barGraphCityData = [];
            Object.keys(cityDataTop3).forEach(val => {
                barGraphCityData.push({ name: val.split(',')[0], pv: cityDataTop3[val] })
            });
            setBarGraphCityData(barGraphCityData);

            // Age Range
            let ageData = [];
            const ageDataRes = apiResponse.data.filter(val => val.name === 'audience_gender_age')[0];
            const ageDataValues = ageDataRes.values[0].value;
            Object.keys(ageDataValues).forEach(val => {
                ageData.push({ name: val, pv: ageDataValues[val] })
            })
            setAgeData(ageData);
            const ageDataTop3 = pickHighest(ageDataValues, 3)
            let barGraphAgeData = [];
            Object.keys(ageDataTop3).forEach(val => {
                barGraphAgeData.push({ name: val, pv: ageDataTop3[val] })
            });
            setBarGraphAgeData(barGraphAgeData);

            // Gender
            let barGraphGenderData = [];
            const genderTop3 = calculateGenderDataTotal(ageDataValues);
            Object.keys(genderTop3).forEach(val => {
                barGraphGenderData.push({ name: val, pv: genderTop3[val] })
            });
            setBarGraphGenderData(barGraphGenderData)
        }


    }, [apiResponse])

    useEffect(() => {
        if (reachApiResponse) {
            const reachData = reachApiResponse.data.filter(val => val.name === 'reach')[0];
            let barGraphReachData = [{ uv: reachData.values[0].value, pv: reachData.values[1].value }];
            setBarGraphReachApi(barGraphReachData);
        }
    }, [reachApiResponse])

    const handleClose = () => {
        setOpen(false);
    };
    const showEntireGraph = (type) => {
        setOpen(true)
        if (type === 'country') {
            setPopupTtile('Country Data')
            setPopupData(countryData)
        } else if (type === 'city') {
            setPopupTtile('City Data')
            setPopupData(cityData)
        } else if (type === 'age') {
            setPopupTtile('Age Data')
            setPopupData(ageData)
        }
    }


    const handleTabChange = (e) => {
        setActiveHeaderOption(e.target.textContent)
    }

    const handleOptionChange = (e) => {
        setDateRangeFilterValue(e.target.value);
    }

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
            <div className='left-div' style={{ backgroundColor: '#22293A' }}>
                <div className='stats-section-header'>
                    {statsHeader.map((val, index) => {
                        return <span key={index} className={`header-option ${activeHeaderOption === val ? 'active' : ''}`} onClick={(e) => handleTabChange(e)}>{val}</span>
                    })}
                </div>
                <div className='stats-select'>
                    <div className='stats-select-div'>
                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                            <NativeSelect
                                defaultValue={7}
                                inputProps={{
                                    name: 'date',
                                    id: 'uncontrolled-native',
                                }}
                                className='select-input'
                                onChange={(e) => handleOptionChange(e)}
                            >
                                {dateFilter.map(({ labelFirst, labelSecond, value }, index) => {
                                    return <option className='select-input-option' value={value} key={index}>{labelFirst}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{labelSecond}</option>
                                })
                                }
                            </NativeSelect>
                        </FormControl>
                    </div>
                </div>
                <div className='stats-observation'>
                    <Card className='stats-observation-card'>
                        <CardContent>
                            <Typography align='left' sx={{ fontSize: 12, fontWeight: '600', marginBottom: '20px' }} color="white" gutterBottom>
                                OBSERVATION
                            </Typography>
                            <div className='stats-observation-details'>
                                <TrendingUpRoundedIcon className='icon'></TrendingUpRoundedIcon>
                                <div className='details-text'>
                                    <span> You have reached<span style={{ color: '#6EE6B8' }}> +70% </span> more than usual days</span>
                                    <Typography align='left' sx={{ fontSize: 10, marginTop: '5px' }} color="#A3ADBD" gap={5}>
                                        {`SINCE LAST ${dateRangeFilterValue} DAYS`}
                                    </Typography>
                                </div>

                            </div>
                            <div className='stats-observation-value'>
                                <div className='info'>
                                    <span><span style={{ color: '#6EE6B8' }}>+33%</span> from Ads</span>
                                </div>
                                <div className='info'>
                                    <span><span style={{ color: '#6EE6B8' }}>$450</span> on Ad Spend</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="left-div-chart">
                    {
                        cardBarGraphData.map((data, index) => {
                            return <CardGraph key={index} graphData={barGraphReachApi} barData={data} currentActiveChart={currentActiveChart} setCurrentActiveChart={setCurrentActiveChart}></CardGraph>
                        })
                    }
                </div>
            </div>
            <div className='right-div' style={{ backgroundColor: '#22293A' }}>
                <div className='stats-section-header'>
                    <img src='https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces' alt=''></img>
                    <div>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>Dr. Mendeta Videos</span>
                        <div className='social-media-username'>@drmendetavideos</div>
                    </div>
                </div>

                <div className='stats-observation'>
                    <Card className='stats-observation-card'>
                        <CardContent className='stats-observation-card-content'>
                            <div className='stats-observation-details'>
                                <div className='stats-boost-profile'>
                                    <TrendingUpRoundedIcon className='icon'></TrendingUpRoundedIcon>
                                    <div className='details-text'>
                                        <Typography align='left' sx={{ fontSize: 16, fontWeight: '600' }} color="white" gap={5}>
                                            33% from Ads
                                        </Typography>
                                        <Typography align='left' sx={{ fontSize: 12 }} color="#A3ADBD" gap={5}>
                                            {getWeekDatesFromNDaysAgo(dateRangeFilterValue)}
                                        </Typography>
                                    </div>
                                </div>

                                <div className='top-buttons'>
                                    <Button className='boost-profile-button' variant="contained">Boost Profile</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className=''>
                    <div className='right-div-chart'>
                        <ResponsiveContainer height={400}>
                            <AreaChart
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
                                <Area type="monotone" dataKey="uv" stackId="1" stroke="#956fe6" fill="#956fe6" />
                                <Area type="monotone" dataKey="pv" stackId="1" stroke="#f4b25a" fill="#f4b25a" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>


                    <div className='divider' style={{ borderBottomColor: '#363D50', padding: '10px', marginLeft: '10px', marginRight: '10px' }}></div>
                    <div className='info-charts'>
                        <div className='top-countries-cities-div'>
                            <Card className='top-countries'>
                                <CardContent className='top-data-content'>
                                    <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Countries</Typography>
                                    <img src={countriesImg} alt='countries'></img>
                                    <SimpleBarChart data={barGraphCountryData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                    <Button onClick={() => showEntireGraph('country')}>See More</Button>
                                </CardContent>
                            </Card>

                            <Card className='top-cities'>
                                <CardContent className='top-data-content'>
                                    <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Cities</Typography>
                                    <img src={cityImg} alt=''></img>
                                    <SimpleBarChart data={barGraphCityData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                    <Button onClick={() => showEntireGraph('city')}>See More</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='divider' style={{ borderBottomColor: '#363D50' }}></div>
                        <div className='top-gender-age-div'>
                            <Card className='top-countries'>
                                <CardContent className='top-data-content'>
                                    <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Age Range</Typography>
                                    <img src={ageRangeImg} alt=''></img>
                                    <SimpleBarChart data={barGraphAgeData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                    <Button onClick={() => showEntireGraph('age')}>See More</Button>
                                </CardContent>

                            </Card>
                            <Card className='top-cities'>
                                <CardContent className='top-data-content'>
                                    <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Gender</Typography>
                                    <img src={genderImg} alt=''></img>
                                    <SimpleBarChart data={barGraphGenderData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                </CardContent>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{popupTitle}</DialogTitle>
            <DialogContent>
                <SimpleBarChart data={popupData} xKey="name" yKey="pv" height={500} fontFillColor={"#000"} showXAxis fontSize={10} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>)

}

export default StatsPage;