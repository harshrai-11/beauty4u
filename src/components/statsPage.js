import * as React from "react";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  NativeSelect,
  Switch,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { useEffect, useState } from "react";
import {
  ACCOUNTS_ENGAGED_DEMOGRAPHY_API,
  ACCOUNTS_REACHED_DEMOGRAPHY_API,
  FOLLOWERS_DEMOGRAPHY_API,
  GET_PROFILE_ACCOUNTS_ENGAGED,
  GET_PROFILE_VIEWS,
  GET_PROFILE_ACCOUNTS_REACHED,
} from "../routes";
import {
  pickHighest,
  countryCodesWithNames,
  calculateGenderDataTotal,
} from "../helper";
import { SimpleBarChart } from "./charts/barChart";
import axios from "axios";

import countriesImg from "./images/countries.jpeg";
import ageRangeImg from "./images/ageRange.jpeg";
import cityImg from "./images/city.jpeg";
import genderImg from "./images/gender.webp";
import {
  ApiHeaders,
  breakdownValues,
  cardBarGraphData,
  dateFilter,
  reachTimeNumberDays,
  reachTimePeriod,
  statsHeader,
} from "../utils.js/constant";
import { CardGraph } from "./charts/card-graph";
import { getSearchParam, getWeekDatesFromNDaysAgo } from "../utils.js/helper";
import { AppLayout } from "../layout/app-layout";
import RadialPieChart from "./charts/pieChart";
import { Loader } from "../layout/loader";

const StatsPage = () => {
  // Overall country city data
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  // Top 3 countyr, city, age, gender data
  const [barGraphCountryData, setBarGraphCountryData] = useState([]);
  const [barGraphCityData, setBarGraphCityData] = useState([]);
  const [barGraphAgeData, setBarGraphAgeData] = useState([]);
  const [barGraphGenderData, setBarGraphGenderData] = useState([]);

  // Overall API Response save followers demography
  const [followersDemographyApiResponse, setFollowersDemographyApiResponse] =
    useState(undefined);

  // Popup data and its state
  const [open, setOpen] = useState(false);
  const [popupTitle, setPopupTtile] = useState("");
  const [popupData, setPopupData] = useState(undefined);

  // Overall Accounts Reached and its bar chart (left chart)
  const [reachApiResponse, setReachApiResponse] = useState(undefined);
  const [barGraphReachApi, setBarGraphReachApi] = useState([]);

  // Overall Profile views and its bar chart (left chart)
  const [profileViewsResponse, setProfileViewsResponse] = useState([]);
  const [barGraphProfileViewsApi, setBarGraphProfileViewsApi] = useState([]);

  // Overall Accounts engaged and its bar chart (left chart)
  const [accountsEngagedResponse, setAccountsEngagedResponse] = useState(null);
  const [barGraphAccountsEngagedApi, setBarGraphAccountsEngagedApi] = useState(
    []
  );

  // Active Header Left Side
  const [activeHeaderOption, setActiveHeaderOption] =
    useState("Profile Insights");
  const [dateRangeFilterValue, setDateRangeFilterValue] = useState("1");

  // Current active left chart card
  const [currentActiveChart, setCurrentActiveChart] = useState(1);

  // Impressions
  const [impressions, setImpressions] = useState(0);

  // Error state
  const [error, setError] = useState("");

  // Loader State
  const [showLoader, setShowLoader] = useState(false);

  const [showPercentage, setShowPercentage] = useState(false);

  // user info
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [profileName, setProfileName] = useState("");

  // Getting Left Card Data
  // Accounts Reached (1) will be shown for all date ranges
  // Accounts Engaged and Profile Views is for 1 day data only
  const getLeftCardsStatData = (userId) => {
    setShowLoader(true);
    if (dateRangeFilterValue === "1") {
      axios(GET_PROFILE_VIEWS(userId), ApiHeaders).then(
        (profileViewResponse) => {
          if (profileViewResponse.data.data) {
            const profileViews = profileViewResponse.data.data.data.filter(
              (val) => val.name === "profile_views"
            )[0];
            setProfileViewsResponse(profileViews.values);
          }
        }
      );
      axios(GET_PROFILE_ACCOUNTS_ENGAGED(userId), ApiHeaders).then(
        (profileViewResponse) => {
          if (profileViewResponse.data.data) {
            const accountsEngaged =
              profileViewResponse.data.data.data[0].total_value.value;
            setAccountsEngagedResponse(accountsEngaged);
          }
        }
      );
    }

    axios(GET_PROFILE_ACCOUNTS_REACHED(userId), ApiHeaders)
      .then((insightResponse) => {
        if (insightResponse.data.data) {
          const followersDemographyApiResponse = insightResponse.data.data;
          setReachApiResponse(followersDemographyApiResponse);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getFollowersDemography = (userId) => {
    if (currentActiveChart === 4) {
      let apiResponseArray = [];
      breakdownValues.forEach(async (value, index) => {
        axios(
          FOLLOWERS_DEMOGRAPHY_API(Object.values(value)[0], userId),
          ApiHeaders
        )
          .then((ageCityGenderResponse) => {
            if (ageCityGenderResponse.data.data) {
              const data =
                ageCityGenderResponse.data.data.data[0].total_value
                  .breakdowns[0].results;
              let keyValuePairs = {};
              if (data) {
                data.forEach(
                  (result) =>
                    (keyValuePairs[
                      `${result.dimension_values.reverse().join(".")}`
                    ] = result.value)
                );
                let name = Object.keys(value)[0];
                apiResponseArray.push({
                  name,
                  values: [{ value: keyValuePairs }],
                });
                if (name === "audience_gender_age") {
                  updateAgeGenderDataState({ data: apiResponseArray });
                } else if (name === "audience_city") {
                  updateCityDataState({ data: apiResponseArray });
                } else {
                  updateCountryDataState({ data: apiResponseArray });
                }
              } else {
                setErrorMessage("Demographic Data not available");
              }
              setShowLoader(false);
            }
          })
          .catch((err) => {
            console.log("ERROR", err);
            setErrorMessage(err?.response.data.errors.error.error_user_title);
          });
      });
    }
    if (currentActiveChart === 1) {
      let apiResponseArray = [];
      breakdownValues.forEach(async (value, index) => {
        axios(
          ACCOUNTS_REACHED_DEMOGRAPHY_API(Object.values(value)[0], userId),
          ApiHeaders
        )
          .then(async (response) => {
            if (response.data.data) {
              const data =
                response.data.data.data[0].total_value.breakdowns[0].results;
              let keyValuePairs = {};
              if (data) {
                data.forEach(
                  (result) =>
                    (keyValuePairs[
                      `${result.dimension_values.reverse().join(".")}`
                    ] = result.value)
                );
                let name = Object.keys(value)[0];
                apiResponseArray.push({
                  name,
                  values: [{ value: keyValuePairs }],
                });
                if (name === "audience_gender_age") {
                  updateAgeGenderDataState({ data: apiResponseArray });
                } else if (name === "audience_city") {
                  updateCityDataState({ data: apiResponseArray });
                } else {
                  updateCountryDataState({ data: apiResponseArray });
                }
              } else {
                setErrorMessage("Demographic Data not available");
              }
              setShowLoader(false);
            }
          })
          .catch((err) => {
            console.log("ERROR", err);
            setErrorMessage(err?.response.data.errors.error.error_user_title);
          });
      });
      setFollowersDemographyApiResponse({ data: apiResponseArray });
    }
    if (currentActiveChart === 2) {
      let apiResponseArray = [];
      breakdownValues.forEach(async (value, index) => {
        axios(
          ACCOUNTS_ENGAGED_DEMOGRAPHY_API(Object.values(value)[0]),
          ApiHeaders
        )
          .then(async (response) => {
            if (response.data.data) {
              const data =
                response.data.data.data[0].total_value.breakdowns[0].results;
              let keyValuePairs = {};
              data.forEach(
                (result) =>
                  (keyValuePairs[
                    `${result.dimension_values.reverse().join(".")}`
                  ] = result.value)
              );
              let name = Object.keys(value)[0];
              apiResponseArray.push({
                name,
                values: [{ value: keyValuePairs }],
              });
              if (name === "audience_gender_age") {
                updateAgeGenderDataState({ data: apiResponseArray });
              } else if (name === "audience_city") {
                updateCityDataState({ data: apiResponseArray });
              } else {
                updateCountryDataState({ data: apiResponseArray });
              }
              setShowLoader(false);
            }
          })
          .catch((err) => {
            console.log("ERROR", err);
            setErrorMessage(err?.response.data.errors.error.error_user_title);
          });
      });
      setFollowersDemographyApiResponse({ data: apiResponseArray });
    }
    if (currentActiveChart === 3) {
      setShowLoader(false);
    }
  };

  const updateAgeGenderDataState = (arrayResponse) => {
    // Age Range
    let ageData = [];
    const ageDataRes = arrayResponse.data.filter(
      (val) => val.name === "audience_gender_age"
    )[0];
    const ageDataValues = ageDataRes.values[0].value;
    let ageValueSum = Object.values(ageDataValues).reduce(function (a, b) {
      return a + b;
    });
    Object.keys(ageDataValues).forEach((val) => {
      ageData.push({
        name: val,
        pv: ((ageDataValues[val] / ageValueSum) * 100).toFixed(2),
        uv: ageDataValues[val],
      });
    });
    setAgeData(ageData);
    const ageDataTop3 = pickHighest(ageDataValues, 3);
    let barGraphAgeData = [];
    Object.keys(ageDataTop3).forEach((val) => {
      barGraphAgeData.push({
        name: val,
        pv: ((ageDataTop3[val] / ageValueSum) * 100).toFixed(2),
        uv: ageDataTop3[val],
      });
    });
    setBarGraphAgeData(barGraphAgeData);

    // Gender
    let barGraphGenderData = [];
    const genderTop3 = calculateGenderDataTotal(ageDataValues);
    Object.keys(genderTop3).forEach((val) => {
      barGraphGenderData.push({
        name: val,
        pv: ((genderTop3[val] / ageValueSum) * 100).toFixed(2),
        uv: genderTop3[val],
      });
    });
    setBarGraphGenderData(barGraphGenderData);
  };

  const updateCityDataState = (arrayResponse) => {
    // City Data
    let cityData = [];
    const cityDatRes = arrayResponse.data.filter(
      (val) => val.name === "audience_city"
    )[0];
    const cityDataValues = cityDatRes.values[0].value;
    let cityValueSum = Object.values(cityDataValues).reduce(function (a, b) {
      return a + b;
    });
    Object.keys(cityDataValues).forEach((val) => {
      cityData.push({
        name: val.split(",")[0],
        pv: ((cityDataValues[val] / cityValueSum) * 100).toFixed(2),
        uv: cityDataValues[val],
      });
    });

    setCityData(cityData);
    const cityDataTop3 = pickHighest(cityDataValues, 3);
    let barGraphCityData = [];
    Object.keys(cityDataTop3).forEach((val) => {
      barGraphCityData.push({
        name: val.split(",")[0],
        pv: ((cityDataTop3[val] / cityValueSum) * 100).toFixed(2),
        uv: cityDataTop3[val],
      });
    });
    setBarGraphCityData(barGraphCityData);
  };

  const updateCountryDataState = (arrayResponse) => {
    // Country Data
    let countryData = [];
    const countryDataRes = arrayResponse.data.filter(
      (val) => val.name === "audience_country"
    )[0];
    const countryDataValues = countryDataRes.values[0].value;
    let countryValueSum = Object.values(countryDataValues).reduce(function (
      a,
      b
    ) {
      return a + b;
    });
    Object.keys(countryDataValues).forEach((val) => {
      countryData.push({
        name: countryCodesWithNames[val],
        pv: ((countryDataValues[val] / countryValueSum) * 100).toFixed(2),
        uv: countryDataValues[val],
      });
    });
    setCountryData(countryData);
    const CountryDataTop3 = pickHighest(countryDataValues, 3);
    let barGraphCountryData = [];
    Object.keys(CountryDataTop3).forEach((val) => {
      barGraphCountryData.push({
        name: countryCodesWithNames[val],
        pv: ((CountryDataTop3[val] / countryValueSum) * 100).toFixed(2),
        uv: CountryDataTop3[val],
      });
    });

    setBarGraphCountryData(barGraphCountryData);
  };

  const setErrorMessage = (message) => {
    setError(message);
    setShowLoader(false);
  };

  // Bar graph Accounts Reach Data Function
  const setBarGraphReachResult = (dateRangeFilterValue) => {
    const reachData = reachApiResponse.data.filter(
      (val) =>
        val.name === "reach" &&
        val.period === reachTimePeriod[dateRangeFilterValue]
    )[0];
    let barGraphReachData = [
      { uv: reachData.values[0].value, pv: reachData.values[1].value },
    ];
    setBarGraphReachApi(barGraphReachData);
  };

  const calculateAndSetImpression = (dateRangeFilterValue) => {
    const impressionsData = reachApiResponse.data.filter(
      (val) =>
        val.name === "impressions" &&
        val.period === reachTimePeriod[dateRangeFilterValue]
    )[0];
    let totalImpressions = 0;
    impressionsData.values.forEach((item) => {
      totalImpressions = totalImpressions + item.value;
    });
    setImpressions(totalImpressions);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showEntireGraph = (type) => {
    setOpen(true);
    if (type === "country") {
      setPopupTtile("Country Data");
      setPopupData(countryData);
    } else if (type === "city") {
      setPopupTtile("City Data");
      setPopupData(cityData);
    } else if (type === "age") {
      setPopupTtile("Age Data");
      setPopupData(ageData);
    }
  };

  const handleTabChange = (e) => {
    setActiveHeaderOption(e.target.textContent);
  };

  const handleOptionChange = (e) => {
    const dateRange = e.target.value;
    setDateRangeFilterValue(dateRange);
    setBarGraphReachResult(dateRange);
    calculateAndSetImpression(dateRange);
    if (dateRange !== "1") {
      setCurrentActiveChart(1);
    }
  };

  // Left card graph data
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
  };

  const getPieChartData = () => {
    const pieChartFormat = [];
    if (currentActiveChart === 3) {
      profileViewsResponse.forEach((item, index) => {
        item.name =
          index === 0
            ? cardBarGraphData[currentActiveChart - 1].legendLabel1
            : cardBarGraphData[currentActiveChart - 1].legendLabel2;
        pieChartFormat.push(item);
      });
    } else if (currentActiveChart === 2) {
      pieChartFormat.push({
        value: accountsEngagedResponse,
        name: cardBarGraphData[currentActiveChart - 1].legendLabel1,
      });
    } else {
      const reachData = reachApiResponse?.data.filter(
        (val) =>
          val.name === "reach" &&
          val.period === reachTimePeriod[dateRangeFilterValue]
      )[0];
      reachData &&
        reachData.values.forEach((item, index) => {
          item.name =
            index === 0
              ? cardBarGraphData[currentActiveChart - 1].legendLabel1
              : cardBarGraphData[currentActiveChart - 1].legendLabel2;
          pieChartFormat.push(item);
        });
    }

    return pieChartFormat;
  };

  const percentageToggleHandler = () => {
    setShowPercentage(!showPercentage);
  };
  const leftDivChildren = () => {
    return (
      <>
        <div className="stats-select">
          <div className="stats-select-div">
            <FormControl
              className="native-select"
              sx={{ m: 1, width: 300, mt: 3 }}
            >
              <NativeSelect
                defaultValue={"1"}
                inputProps={{
                  name: "date",
                  id: "uncontrolled-native",
                }}
                className="select-input"
                onChange={(e) => handleOptionChange(e)}
              >
                {dateFilter.map(({ labelFirst, labelSecond, value }, index) => {
                  return (
                    <option
                      className="select-input-option"
                      value={value}
                      key={index}
                    >
                      {labelFirst}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {labelSecond}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <div className="stats-observation">
          <Card className="stats-observation-card">
            <CardContent>
              <Typography
                align="left"
                sx={{ fontSize: 12, fontWeight: "600", marginBottom: "20px" }}
                color="white"
                gutterBottom
              >
                IMPRESSIONS
              </Typography>
              <div className="stats-observation-details">
                <TrendingUpRoundedIcon className="icon"></TrendingUpRoundedIcon>
                <div className="details-text">
                  <span>
                    {" "}
                    You have{" "}
                    <span style={{ color: "#6EE6B8" }}>
                      {" "}
                      {impressions}{" "}
                    </span>{" "}
                    impressions{" "}
                  </span>
                  <Typography
                    align="left"
                    sx={{ fontSize: 10, marginTop: "5px" }}
                    color="#A3ADBD"
                    gap={5}
                  >
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
          {cardBarGraphData.map((data, index) => {
            return (dateRangeFilterValue !== "1" && data.value === 1) ||
              data.value === 4 ? (
              <CardGraph
                key={index}
                cardIndex={data.value}
                graphData={getGraphData(data.value)}
                barData={data}
                currentActiveChart={currentActiveChart}
                setCurrentActiveChart={setCurrentActiveChart}
                userId={userId}
              ></CardGraph>
            ) : (
              dateRangeFilterValue === "1" && (
                <CardGraph
                  key={index}
                  cardIndex={data.value}
                  graphData={getGraphData(data.value)}
                  barData={data}
                  currentActiveChart={currentActiveChart}
                  setCurrentActiveChart={setCurrentActiveChart}
                  userId={userId}
                ></CardGraph>
              )
            );
          })}
        </div>
      </>
    );
  };

  const rightDivChildren = () => {
    return (
      <>
        <div className="stats-observation">
          <Card className="stats-observation-card">
            <CardContent className="stats-observation-card-content">
              <div className="stats-observation-details">
                <div className="stats-boost-profile">
                  <TrendingUpRoundedIcon className="icon"></TrendingUpRoundedIcon>
                  <div className="details-text">
                    <Typography
                      align="left"
                      sx={{ fontSize: 16, fontWeight: "600" }}
                      color="white"
                      gap={5}
                    >
                      33% from Ads
                    </Typography>
                    <Typography
                      align="left"
                      sx={{ fontSize: 12 }}
                      color="#A3ADBD"
                      gap={5}
                    >
                      {getWeekDatesFromNDaysAgo(
                        reachTimeNumberDays[dateRangeFilterValue]
                      )}
                    </Typography>
                  </div>
                </div>

                <div className="top-buttons">
                  <Button className="boost-profile-button" variant="contained">
                    Boost Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="">
          <div className="right-div-chart">
            <Typography
              align="left"
              marginTop={5}
              marginLeft={5}
              sx={{ fontSize: 16, fontWeight: "600" }}
              color="white"
              gap={5}
            >
              {cardBarGraphData[currentActiveChart - 1].label}
            </Typography>
            {currentActiveChart !== 4 && (
              <RadialPieChart graphData={getPieChartData()}></RadialPieChart>
            )}
          </div>

          <div
            className="divider"
            style={{
              borderBottom: "1px solid #363D50",
              padding: "10px",
              margin: "10px",
            }}
          ></div>
          {currentActiveChart !== 3 && error === "" && (
            <div className="info-charts">
              <FormGroup style={{ alignItems: "end", color: "#fff" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showPercentage}
                      color="warning"
                      onClick={() => percentageToggleHandler()}
                    />
                  }
                  label="Show Percentage"
                  labelPlacement="bottom"
                />
              </FormGroup>
              <div className="top-countries-cities-div">
                <Card className="top-countries">
                  <CardContent className="top-data-content">
                    <Typography
                      color={"white"}
                      align="left"
                      sx={{ fontSize: "18px", paddingBottom: "10px" }}
                      fontWeight={600}
                    >
                      Top Countries
                    </Typography>
                    <img src={countriesImg} alt="countries"></img>
                    <SimpleBarChart
                      data={barGraphCountryData}
                      xKey="name"
                      yKey={showPercentage ? "pv" : "uv"}
                      height={300}
                      fontFillColor={"#fff"}
                      backgroundFill="#363D50"
                      xAxisLabelPosition={350}
                      isPercentage={showPercentage}
                    />
                    <Button onClick={() => showEntireGraph("country")}>
                      See More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="top-cities">
                  <CardContent className="top-data-content">
                    <Typography
                      color={"white"}
                      align="left"
                      sx={{ fontSize: "18px", paddingBottom: "10px" }}
                      fontWeight={600}
                    >
                      Top Cities
                    </Typography>
                    <img src={cityImg} alt=""></img>
                    <SimpleBarChart
                      data={barGraphCityData}
                      xKey="name"
                      yKey={showPercentage ? "pv" : "uv"}
                      height={300}
                      fontFillColor={"#fff"}
                      backgroundFill="#363D50"
                      xAxisLabelPosition={350}
                      isPercentage={showPercentage}
                    />
                    <Button onClick={() => showEntireGraph("city")}>
                      See More
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div
                className="divider"
                style={{
                  borderBottom: "1px solid #363D50",
                  padding: "10px",
                  margin: "10px",
                }}
              ></div>

              <div className="top-gender-age-div">
                <Card className="top-countries">
                  <CardContent className="top-data-content">
                    <Typography
                      color={"white"}
                      align="left"
                      sx={{ fontSize: "18px", paddingBottom: "10px" }}
                      fontWeight={600}
                    >
                      Top Age Range
                    </Typography>
                    <img src={ageRangeImg} alt=""></img>
                    <SimpleBarChart
                      data={barGraphAgeData}
                      xKey="name"
                      yKey={showPercentage ? "pv" : "uv"}
                      height={300}
                      fontFillColor={"#fff"}
                      backgroundFill="#363D50"
                      xAxisLabelPosition={350}
                      isPercentage={showPercentage}
                    />
                    <Button onClick={() => showEntireGraph("age")}>
                      See More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="top-cities">
                  <CardContent className="top-data-content">
                    <Typography
                      color={"white"}
                      align="left"
                      sx={{ fontSize: "18px", paddingBottom: "10px" }}
                      fontWeight={600}
                    >
                      Top Gender
                    </Typography>
                    <img src={genderImg} alt=""></img>
                    <SimpleBarChart
                      data={barGraphGenderData}
                      xKey="name"
                      yKey={showPercentage ? "pv" : "uv"}
                      height={300}
                      fontFillColor={"#fff"}
                      backgroundFill="#363D50"
                      xAxisLabelPosition={350}
                      isPercentage={showPercentage}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {error !== "" && (
            <Typography fontSize={18} fontWeight="bold" color="white">
              Oops! {error}
            </Typography>
          )}
        </div>
      </>
    );
  };

  // On Load
  useEffect(() => {
    const userId = getSearchParam("userId");
    const userName = getSearchParam("userName");
    const profileName = getSearchParam("profilename");
    setUserName(userName);
    setUserId(userId);
    setProfileName(profileName);
    getLeftCardsStatData(userId);
    getFollowersDemography(userId);
  }, []);

  // Country, City, Age, Gender Data graph top 3 for followers
  useEffect(() => {
    if (
      followersDemographyApiResponse &&
      followersDemographyApiResponse.data &&
      followersDemographyApiResponse.data.length
    ) {
      updateCountryDataState(followersDemographyApiResponse);
      updateCityDataState(followersDemographyApiResponse);
      updateAgeGenderDataState(followersDemographyApiResponse);
    }
  }, [followersDemographyApiResponse]);

  // From reach API setting bar graph data
  useEffect(() => {
    if (reachApiResponse) {
      setBarGraphReachResult(dateRangeFilterValue);
      calculateAndSetImpression(dateRangeFilterValue);
    }
  }, [reachApiResponse]);

  // Profile views and accounts Engaged
  useEffect(() => {
    if (profileViewsResponse.length) {
      let barGraphProfileViewData = [
        {
          uv: profileViewsResponse[0].value,
          pv: profileViewsResponse[1].value,
        },
      ];
      setBarGraphProfileViewsApi(barGraphProfileViewData);
    }
    if (accountsEngagedResponse) {
      let barGraphAccountsEngaged = [{ uv: accountsEngagedResponse, pv: null }];
      setBarGraphAccountsEngagedApi(barGraphAccountsEngaged);
    }
  }, [profileViewsResponse, accountsEngagedResponse]);

  // getting user demography on the current chart
  useEffect(() => {
    setShowLoader(true);
    const userId = getSearchParam("userId");
    setError("");
    getFollowersDemography(userId);
  }, [currentActiveChart]);

  return (
    <>
      {showLoader && <Loader></Loader>}
      <AppLayout
        layoutId={1}
        leftHeaderData={statsHeader}
        rightHeaderData={{ name: userName, socialMediaUsername: profileName }}
        leftHeaderType={"navigation"}
        rightHeaderType={"username-display"}
        handleTabChange={handleTabChange}
        leftDivChildren={leftDivChildren()}
        rightDivChildren={rightDivChildren()}
        activeHeaderOption={activeHeaderOption}
      ></AppLayout>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{popupTitle}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showPercentage}
                  color="warning"
                  onClick={() => percentageToggleHandler()}
                />
              }
              label="Show Percentage"
            />
          </FormGroup>
          <SimpleBarChart
            data={popupData?.sort((a, b) => b.pv - a.pv)}
            xKey="name"
            yKey={showPercentage ? "pv" : "uv"}
            width={600}
            height={2400}
            fontFillColor={"#000"}
            showXAxis
            fontSize={14}
            isPercentage={showPercentage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatsPage;
