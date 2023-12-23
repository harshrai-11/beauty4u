import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
import { Loader } from "../layout/loader";
import { ADS_SETS } from "../routes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Performance = () => {
  const { state } = useLocation();
  const [activeItem, setActiveItem] = useState(1);
  const [graphData, setGraphData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [graphOption, setGraphOption] = useState("age");
  const [adsets, setAdsets] = useState([]);
  const [key1, setkey1] = useState("min");
  const [key2, setKey2] = useState("max");

  const leadData = state?.insights?.data?.[0].cost_per_action_type;
  const webLeadData = state?.insights?.data?.[0].actions;
  const spent = state?.insights?.data[0].spend;
  let leads = 0;
  let webLead = 0;
  let ageData = [];

  var requestOptions = {
    method: "GET",
  };

  const getAdsets = async () => {
    const resp = await fetch(`${ADS_SETS}`, requestOptions);
    setShowLoader(false);
    const result = await resp.json();
    let adSetsData = result?.data?.data?.data;
    setAdsets(adSetsData);

    adSetsData.forEach((key) => {
      let obj = {};
      obj["name"] = `${key.targeting.age_min} - ${key.targeting.age_max}`;
      obj["min"] = key.targeting.age_min;
      obj["max"] = key.targeting.age_max;
      ageData.push(obj);
    });

    setGraphData(ageData);
  };

  useEffect(() => {
    getAdsets().catch((error) => {
      console.log("error", error);
    });
  }, []);

  webLeadData.forEach((key) => {
    if (key.action_type === "lead") {
      webLead = key.value;
    }
  });

  leadData.forEach((key) => {
    if (key.action_type === "lead") {
      // eslint-disable-next-line no-unused-vars
      leads = key.value;
    }
  });

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  const handleSelectChange = (ev) => {
    setGraphOption(ev.target.value);

    if (ev.target.value === "amount") {
      setkey1("reach");
      setKey2("spend");

      adsets.forEach((key) => {
        let obj = {};
        obj["name"] = "amount";
        obj["reach"] = key.insights?.data?.[0].reach;
        obj["spend"] = key.insights?.data?.[0].spend;
        ageData.push(obj);
      });
    } else if (ev.target.value === "reach") {
      setkey1("spend");
      setKey2("reach");

      adsets.forEach((key) => {
        let obj = {};
        obj["name"] = "reach";
        obj["reach"] = key.insights?.data?.[0].reach;
        obj["spend"] = key.insights?.data?.[0].spend;
        ageData.push(obj);
      });
    } else if (ev.target.value === "age") {
      setkey1("min");
      setKey2("max");

      adsets.forEach((key) => {
        let obj = {};
        obj["name"] = `${key.targeting.age_min} - ${key.targeting.age_max}`;
        obj["min"] = key.targeting.age_min;
        obj["max"] = key.targeting.age_max;
        ageData.push(obj);
      });
    }
    setGraphData(ageData);
  };

  return (
    <div className="performance">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: "16px", color: "white" }} align="left">
            Performace Overview
          </Typography>
          <div className="performance-data">
            <div
              id="1"
              className={
                activeItem === 1
                  ? "performance-item active-item"
                  : "performance-item"
              }
              onClick={() => handleItemClick(1)}
            >
              <Typography
                sx={{ fontSize: "16px", color: "#d9d9d9" }}
                align="left"
              >
                Website Leads
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#6de6b5" }}
                align="left"
              >
                {webLead}
              </Typography>
            </div>
            <div
              id="2"
              className={
                activeItem === 2
                  ? "performance-item active-item"
                  : "performance-item"
              }
              onClick={() => handleItemClick(2)}
            >
              <Typography
                sx={{ fontSize: "16px", color: "#d9d9d9" }}
                align="left"
              >
                Per Leads
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#6de6b5" }}
                align="left"
              >
                ${leads}
              </Typography>
            </div>
            <div
              id="3"
              className={
                activeItem === 3
                  ? "performance-item active-item"
                  : "performance-item"
              }
              onClick={() => handleItemClick(3)}
            >
              <Typography
                sx={{ fontSize: "16px", color: "#d9d9d9" }}
                align="left"
              >
                Amount Spent
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#6de6b5" }}
                align="left"
              >
                ${spent}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {showLoader && <Loader></Loader>}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: "16px", color: "white" }} align="left">
            Age and Gender Distribution
          </Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={graphOption}
            label="Age"
            onChange={handleSelectChange}
          >
            <MenuItem value="age">Age</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="reach">Reach</MenuItem>
          </Select>

          <div className="performance-data">
            <BarChart width={930} height={400} data={graphData}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={key1} fill="#8884d8" />
              <Bar dataKey={key2} fill="#82ca9d" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;
