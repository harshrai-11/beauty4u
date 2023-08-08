
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, NativeSelect, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { useEffect, useState } from 'react';
import { CITY_GENDER_API, GET_PROFILE_ACCOUNTS_ENGAGED, GET_PROFILE_VIEWS, INSIGHTS } from '../routes';
import { pickHighest, countryCodesWithNames, calculateGenderDataTotal } from '../helper';
import { SimpleBarChart } from './charts/barChart';
import axios from 'axios';

import countriesImg from './images/countries.jpeg';
import ageRangeImg from './images/ageRange.jpeg';
import cityImg from './images/city.jpeg';
import genderImg from './images/gender.webp';
import { cardBarGraphData, dateFilter, reachTimeNumberDays, reachTimePeriod, statsHeader } from '../utils.js/constant';
import { CardGraph } from './charts/card-graph';
import { getWeekDatesFromNDaysAgo } from '../utils.js/helper';
import { AppLayout } from '../layout/app-layout';
import RadialPieChart from './charts/pieChart';

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
    const [profileViewsResponse, setProfileViewsResponse] = useState([]);
    const [barGraphProfileViewsApi, setBarGraphProfileViewsApi] = useState([]);
    const [barGraphAccountsEngagedApi, setBarGraphAccountsEngagedApi] = useState([]);
    const [accountsEngagedResponse, setAccountsEngagedResponse] = useState(null);

    const [activeHeaderOption, setActiveHeaderOption] = useState('Profile Insights');
    const [dateRangeFilterValue, setDateRangeFilterValue] = useState("1");
    const [currentActiveChart, setCurrentActiveChart] = useState(1);
    const [impressions, setImpressions] = useState(0);

    const getProfileViews = () => {
        if (dateRangeFilterValue === "1") {
            axios(GET_PROFILE_VIEWS, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            }).then(profileViewResponse => {
                if (profileViewResponse.data.data) {
                    const profileViews = profileViewResponse.data.data.data.filter(val => val.name === 'profile_views')[0]
                    setProfileViewsResponse(profileViews.values);
                }
            });
            axios(GET_PROFILE_ACCOUNTS_ENGAGED, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            }).then(profileViewResponse => {
                if (profileViewResponse.data.data) {
                    const accountsEngaged = profileViewResponse.data.data.data[0].total_value.value
                    setAccountsEngagedResponse(accountsEngaged);
                }
            })
        }
    }

    const setBarGraphReachResult = (dateRangeFilterValue) => {
        const reachData = reachApiResponse.data.filter(val => val.name === 'reach' && val.period === reachTimePeriod[dateRangeFilterValue])[0];
        let barGraphReachData = [{ uv: reachData.values[0].value, pv: reachData.values[1].value }];
        setBarGraphReachApi(barGraphReachData);
    }

    const calculateAndSetImpression = (dateRangeFilterValue) => {
        const impressionsData = reachApiResponse.data.filter(val => val.name === 'impressions' && val.period === reachTimePeriod[dateRangeFilterValue])[0];
        let totalImpressions = 0;
        impressionsData.values.forEach(item => {
            totalImpressions = totalImpressions + item.value
        })
        console.log(totalImpressions)
        setImpressions(totalImpressions)
    }

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
        })
        getProfileViews();
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
            setBarGraphReachResult(dateRangeFilterValue);
            calculateAndSetImpression(dateRangeFilterValue);
        }
    }, [reachApiResponse])

    useEffect(() => {
        if (profileViewsResponse.length) {
            let barGraphProfileViewData = [{ uv: profileViewsResponse[0].value, pv: profileViewsResponse[1].value }];
            setBarGraphProfileViewsApi(barGraphProfileViewData);
        }
        if (accountsEngagedResponse) {
            let barGraphAccountsEngaged = [{ uv: accountsEngagedResponse, pv: null }];
            setBarGraphAccountsEngagedApi(barGraphAccountsEngaged)
        }
    }, [profileViewsResponse, accountsEngagedResponse])

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
        const dateRange = e.target.value
        setDateRangeFilterValue(dateRange);
        setBarGraphReachResult(dateRange);
        calculateAndSetImpression(dateRange)
        if (dateRange !== '1') {
            setCurrentActiveChart(1);
        }
    }

    const getGraphData = (currentCard) => {
        switch (currentCard) {
            case 1:
                return barGraphReachApi;
            case 2:
                return barGraphAccountsEngagedApi;
            case 3:
                return barGraphProfileViewsApi;
            default: 
                return barGraphReachApi;
        }
    }

    const getPieChartData = () => {
        const pieChartFormat = [];
        if (currentActiveChart === 3) {
            profileViewsResponse.forEach((item, index) => {
                item.name = index === 0 ? cardBarGraphData[currentActiveChart - 1].legendLabel1 : cardBarGraphData[currentActiveChart - 1].legendLabel2
                pieChartFormat.push(item)
            })
        } else if (currentActiveChart === 2) {
            pieChartFormat.push({ value: accountsEngagedResponse, name: cardBarGraphData[currentActiveChart - 1].legendLabel1 })
        } else {
            const reachData = reachApiResponse?.data.filter(val => val.name === 'reach' && val.period === reachTimePeriod[dateRangeFilterValue])[0];
            reachData && reachData.values.forEach((item, index) => {
                item.name = index === 0 ? cardBarGraphData[currentActiveChart - 1].legendLabel1 : cardBarGraphData[currentActiveChart - 1].legendLabel2
                pieChartFormat.push(item)
            })
        }

        return pieChartFormat;
    }

    const leftDivChildren = () => {
        return <><div className='stats-select'>
            <div className='stats-select-div'>
                <FormControl className='native-select' sx={{ m: 1, width: 300, mt: 3 }}>
                    <NativeSelect
                        defaultValue={"1"}
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
                            IMPRESSIONS
                        </Typography>
                        <div className='stats-observation-details'>
                            <TrendingUpRoundedIcon className='icon'></TrendingUpRoundedIcon>
                            <div className='details-text'>
                                <span> You have <span style={{ color: '#6EE6B8' }}> {impressions} </span> impressions </span>
                                <Typography align='left' sx={{ fontSize: 10, marginTop: '5px' }} color="#A3ADBD" gap={5}>
                                    {`SINCE LAST ${reachTimeNumberDays[dateRangeFilterValue]} DAY(S)`}
                                </Typography>
                            </div>

                        </div>
                        {/* <div className='stats-observation-value'>
                            <div className='info'>
                                <span><span style={{ color: '#6EE6B8' }}>+33%</span> from Ads</span>
                            </div>
                            <div className='info'>
                                <span><span style={{ color: '#6EE6B8' }}>$450</span> on Ad Spend</span>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
            <div className="left-div-chart">
                {
                    cardBarGraphData.map((data, index) => {
                        return (
                            dateRangeFilterValue !== "1" && data.value === 1 ? <CardGraph key={index} graphData={getGraphData(data.value)} barData={data} currentActiveChart={currentActiveChart} setCurrentActiveChart={setCurrentActiveChart}></CardGraph> : dateRangeFilterValue === "1" && <CardGraph key={index} graphData={getGraphData(data.value)} barData={data} currentActiveChart={currentActiveChart} setCurrentActiveChart={setCurrentActiveChart}></CardGraph>
                        )
                    })
                }
            </div>
        </>
    }

    const rightDivChildren = () => {
        return <>

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
                                        {getWeekDatesFromNDaysAgo(reachTimeNumberDays[dateRangeFilterValue])}
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
                    <Typography align='left' marginTop={5} marginLeft={5} sx={{ fontSize: 16, fontWeight: '600' }} color="white" gap={5}>
                        {cardBarGraphData[currentActiveChart - 1].label}
                    </Typography>
                    <RadialPieChart graphData={getPieChartData()}></RadialPieChart>
                </div>


                <div className='divider' style={{ borderBottomColor: '#363D50', padding: '10px', marginLeft: '10px', marginRight: '10px' }}></div>
                <div className='info-charts'>
                    <div className='top-countries-cities-div'>
                        <Card className='top-countries'>
                            <CardContent className='top-data-content'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Countries</Typography>
                                <img src={countriesImg} alt='countries'></img>
                                <SimpleBarChart data={barGraphCountryData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} backgroundFill="#363D50" xAxisLabelPosition={350} />
                                <Button onClick={() => showEntireGraph('country')}>See More</Button>
                            </CardContent>
                        </Card>

                        <Card className='top-cities'>
                            <CardContent className='top-data-content'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Cities</Typography>
                                <img src={cityImg} alt=''></img>
                                <SimpleBarChart data={barGraphCityData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} backgroundFill="#363D50" xAxisLabelPosition={350}/>
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
                                <SimpleBarChart data={barGraphAgeData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} backgroundFill="#363D50" xAxisLabelPosition={350}/>
                                <Button onClick={() => showEntireGraph('age')}>See More</Button>
                            </CardContent>

                        </Card>
                        <Card className='top-cities'>
                            <CardContent className='top-data-content'>
                                <Typography color={'white'} align="left" sx={{ fontSize: '18px', paddingBottom: '10px' }} fontWeight={600}>Top Gender</Typography>
                                <img src={genderImg} alt=''></img>
                                <SimpleBarChart data={barGraphGenderData} xKey="name" yKey="pv" height={300} fontFillColor={"#fff"} backgroundFill="#363D50" xAxisLabelPosition={350}/>
                            </CardContent>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    }
    return (
        <>
            <AppLayout layoutId={1} leftHeaderData={statsHeader} rightHeaderData={{ name: 'Dr. Mendeita Videos', socialMediaUsername: '@drmendetavideos' }} leftHeaderType={'navigation'} rightHeaderType={'username-display'} handleTabChange={handleTabChange} leftDivChildren={leftDivChildren()} rightDivChildren={rightDivChildren()} activeHeaderOption={activeHeaderOption}></AppLayout>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{popupTitle}</DialogTitle>
                <DialogContent>
                    <SimpleBarChart data={popupData} xKey="name" yKey="pv" width={600} height={2400} fontFillColor={"#000"} showXAxis fontSize={14} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>)
}

export default StatsPage;