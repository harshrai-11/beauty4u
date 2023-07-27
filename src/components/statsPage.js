
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, NativeSelect, OutlinedInput, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { BarChart, Bar, XAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { useEffect, useState } from 'react';
import { CITY_GENDER_API, INSIGHTS } from '../routes';
import { pickHighest, countryCodesWithNames, calculateGenderDataTotal, mockResponse, mockResponseReach } from '../helper';
import { SimpleBarChart } from './barChart';
import axios from 'axios';

import countriesImg from './images/countries.jpeg';
import ageRangeImg from './images/ageRange.jpeg';
import cityImg from './images/city.jpeg';
import genderImg from './images/gender.webp';
import { dateFilter, statsHeader } from '../utils.js/constant';

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
                                {dateFilter.map(({labelFirst, labelSecond, value}, index) => {
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
                                    <span> You have reached<span style={{color: '#6EE6B8'}}> +70% </span> more than usual days</span>  
                                    <Typography align='left' sx={{ fontSize: 10, marginTop: '5px' }} color="#A3ADBD" gap={5}>
                                        {`SINCE LAST ${dateRangeFilterValue} DAYS`}
                                    </Typography>
                                </div>

                            </div>
                            <div className='stats-observation-value'>
                                <div className='info'>
                                    <span><span style={{color: '#6EE6B8'}}>+33%</span> from Ads</span>
                                </div>
                                <div className='info'>
                                    <span><span style={{color: '#6EE6B8'}}>$450</span> on Ad Spend</span>
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
                            width={300}
                            height={300}
                            data={barGraphReachApi}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <Tooltip />
                            <Legend />
                            <Bar label="Non Followers" name='Non Followers' dataKey="pv" fill="#956fe6" />
                            <Bar label="Followers" name='Followers' dataKey="uv" fill="#f4b25a" />
                        </BarChart>
                    </Card>

                </div>
            </div>
            <div className='right-div' style={{ backgroundColor: '#22293A' }}>
                <div className='stats-section-header'>
                    <img src='https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces' alt=''></img>
                    <div>
                        <span>Dr. Mendeta Videos</span>
                        <div className='social-media-username'>@drmendetavideos</div>
                    </div>
                </div>

                <div className='stats-observation'>
                    <Card className='stats-observation-card'>
                        <CardContent>
                            <div className='stats-observation-details'>
                                <div className='stats-boost-profile'>
                                    <TrendingUpRoundedIcon className='icon'></TrendingUpRoundedIcon>
                                    <div className='details-text'>
                                        <Typography align='left' sx={{ fontSize: 18 }} color="white" gap={5}>
                                            33% from Ads
                                        </Typography>
                                        <Typography align='left' sx={{ fontSize: 12 }} color="#5e6775" gap={5}>
                                            March 13-March 19
                                        </Typography>
                                    </div>
                                </div>

                                <div className='top-buttons'>
                                    <Button style={{ backgroundColor: '#7cd985', color: 'black', fontWeight: 'bold', display: 'flex' }} variant="contained">Boost Profile</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='right-div-chart'>
                    <AreaChart
                        width={1000}
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

                    <div className='divider' style={{ borderBottomColor: '#454e5e', padding: '10px', marginLeft: '10px', marginRight: '10px' }}></div>
                    <div className='info-charts'>
                        <div className='top-countries-cities-div'>
                            <div className='top-countries'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Countries</Typography>
                                <img src={countriesImg} alt='countries'></img>
                                <SimpleBarChart data={barGraphCountryData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                <Button onClick={() => showEntireGraph('country')}>See More</Button>
                            </div>
                            <div className='top-cities'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Cities</Typography>
                                <img src={cityImg} alt=''></img>
                                <SimpleBarChart data={barGraphCityData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                <Button onClick={() => showEntireGraph('city')}>See More</Button>

                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='top-gender-age-div'>
                            <div className='top-countries'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Age Range</Typography>
                                <img src={ageRangeImg} alt=''></img>
                                <SimpleBarChart data={barGraphAgeData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />
                                <Button onClick={() => showEntireGraph('age')}>See More</Button>

                            </div>
                            <div className='top-cities'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Gender</Typography>
                                <img src={genderImg} alt=''></img>
                                <SimpleBarChart data={barGraphGenderData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} />

                            </div>
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