import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Arrowsvg from "./images/Arrowsvg.svg";
import Save from "./images/save-icon.png";
import pageView from "./images/page_view.png";
import post from "./images/post.png";
import reply from "./images/reply.png";
import website from "./images/website.png";
import click from "./images/click.png";
import desktop from "./images/desktop_view.png";
import mobile from "./images/mobile_view.png";
import summation from "./images/summation.png";
import ads_insta from "./images/ads_insta.jpeg";
import { formatNumber } from "../utils.js/helper";

const AdsPerformance = () => {
  const { state } = useLocation();
  const [activeItem, setActiveItem] = useState(1);
  const permaLink = state?.adcreatives?.data[0]?.instagram_permalink_url;
  const adVideoUrl = state?.adcreatives?.data[0]?.thumbnail_url;
  const actionType = state?.insights?.data?.[0].cost_per_action_type;
  const actions = state?.insights?.data?.[0].actions;
  const spent = formatNumber(state?.insights?.data[0].spend, 2);

  const videoInfo = state?.insights?.data[0];

  let obj = {};
  for (let key in videoInfo) {
    if (key === "video_play_curve_actions") {
      if (videoInfo[key][0]?.value)
        obj["Video Play Curve Actions"] = Math.max(...videoInfo[key][0].value);
    }

    if (key === "video_avg_time_watched_actions") {
      obj["Video Avg Time Watched"] = videoInfo[key][0].value;
    }

    if (key === "video_play_actions") {
      obj["Video Play Actions"] = videoInfo[key][0].value;
    }
    if (key === "video_p25_watched_actions") {
      obj["Video P25 watched"] = videoInfo[key][0].value;
    }

    if (key === "video_p75_watched_actions") {
      obj["Video p75 Watched"] = videoInfo[key][0].value;
    }

    if (key === "video_p100_watched_actions") {
      obj["Video p100 Watched"] = videoInfo[key][0].value;
    }

    if (key === "video_30_sec_watched_actions") {
      obj["Video 30 sec Watched"] = videoInfo[key][0].value;
    }
  }

  let leads = 0;
  let webLead = 0;
  let conversions = 0;

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  let actionsUpdated = actions.map((key) => {
    if (key.action_type === "lead") {
      webLead = key.value;
    }

    if (
      key.action_type === "landing_page_view" ||
      key.action_type === "landing page view"
    ) {
      conversions = key.value;
    }

    if (
      key.action_type.includes("post") ||
      key.action_type.includes("comment")
    ) {
      key.icon = post;
    }

    if (key.action_type.includes("save")) {
      key.icon = Save;
    }

    if (key.action_type.includes("page") || key.action_type.includes("video")) {
      key.icon = pageView;
    }

    if (key.action_type.includes("lead") || key.action_type.includes("fb")) {
      key.icon = website;
    }

    if (key.action_type.includes("click")) {
      key.icon = click;
    }

    if (
      key.action_type.includes("reply") ||
      key.action_type.includes("messaging")
    ) {
      key.icon = reply;
    }

    if (key.action_type.includes("onsite_conversion")) {
      let replacedVal = key.action_type.replace("onsite_conversion", "");
      replacedVal = replacedVal.replace(/[\W_]+/g, " ");
      key["action_type"] = replacedVal;
      return key;
    }

    if (key.action_type.includes("offsite_conversion")) {
      let replacedVal = key.action_type.replace("offsite_conversion", "");
      replacedVal = replacedVal.replace(/[\W_]+/g, " ");
      key["action_type"] = replacedVal;
      return key;
    }

    key.action_type = key.action_type.replace(/[\W_]+/g, " ");
    return key;
  });

  let sum = 0;

  const actionTypeUpdated = actionType?.map((key) => {
    sum += +key.value;

    if (key.action_type === "lead") {
      // eslint-disable-next-line no-unused-vars
      leads = formatNumber(key.value, 2);
    }

    if (key.action_type.includes("onsite_conversion")) {
      let replacedVal = key.action_type.replace("onsite_conversion", "");
      replacedVal = replacedVal.replace(/[\W_]+/g, " ");
      key["action_type"] = replacedVal;
      return key;
    }

    if (key.action_type.includes("offsite_conversion")) {
      let replacedVal = key.action_type.replace("offsite_conversion", "");
      replacedVal = replacedVal.replace(/[\W_]+/g, " ");
      key["action_type"] = replacedVal;
      return key;
    }

    key.action_type = key.action_type.replace(/[\W_]+/g, " ");
    return key;
  });

  return (
    <div className="adsPerformance">
      <Card>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className="ad-video border">
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                align="left"
              >
                Ad
              </Typography>
              <img
                src={ads_insta}
                alt="advideo"
                width="500px"
                height="300px"
              ></img>
              <div className="views">
                <div className="view-keys">
                  <Typography sx={{ fontSize: "18px" }} align="left">
                    Click on this{" "}
                    <a href={permaLink} target="_blank">
                      link{" "}
                    </a>
                    to see the ad
                  </Typography>
                </div>
              </div>
            </div>
            <div className="ad-views">
              <div style={{ margin: "20px", position: "relative" }}>
                <Typography
                  sx={{ fontSize: "25px", fontWeight: "bold", color: "white" }}
                >
                  Desktop View
                </Typography>
                <img
                  src={desktop}
                  alt="desktop"
                  width="400px"
                  height="300px"
                ></img>
                <img
                  src={adVideoUrl}
                  alt="advideo"
                  width="100px"
                  height="100px"
                  style={{
                    position: "absolute",
                    left: "54px",
                    top: "110px",
                    width: "292px",
                  }}
                ></img>
              </div>

              <div style={{ margin: "20px", position: "relative" }}>
                <Typography
                  sx={{ fontSize: "25px", fontWeight: "bold", color: "white" }}
                >
                  Mobile View
                </Typography>
                <img
                  src={mobile}
                  alt="mobile"
                  width="500px"
                  height="300px"
                ></img>
                <img
                  src={adVideoUrl}
                  alt="advideo"
                  width="100px"
                  height="100px"
                  style={{
                    position: "absolute",
                    left: "180px",
                    top: "125px",
                    width: "140px",
                  }}
                ></img>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
            align="left"
          >
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
                sx={{ fontSize: "26px", color: "#d9d9d9" }}
                align="left"
              >
                Website Leads
              </Typography>
              <Typography
                sx={{ fontSize: "26px", color: "#6de6b5" }}
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
                sx={{ fontSize: "26px", color: "#d9d9d9" }}
                align="left"
              >
                Per Leads
              </Typography>
              <Typography
                sx={{ fontSize: "26px", color: "#6de6b5" }}
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
                sx={{ fontSize: "26px", color: "#d9d9d9" }}
                align="left"
              >
                Amount Spent
              </Typography>
              <Typography
                sx={{ fontSize: "26px", color: "#6de6b5" }}
                align="left"
              >
                ${spent}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className="ad-video">
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                align="left"
              >
                Ad Video
              </Typography>
              <iframe
                title="advideo"
                width="500"
                height="460"
                src="https://www.instagram.com/constantinomendietamd/embed?utm_source=ig_embed&amp;utm_campaign=loading"
                frameborder="0"
              ></iframe>
            </div>
            <div className="views">
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                align="left"
              >
                Views / Watches
              </Typography>
              <div style={{ overflow: "scroll", height: "450px" }}>
                {Object.entries(obj).map((key, i) => (
                  <div className="view-keys">
                    <Typography sx={{ fontSize: "18px" }} align="left">
                      {key[0]}: {key[1]}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Typography
        sx={{ fontSize: "20px", color: "white", paddingLeft: "20px" }}
        align="left"
      >
        Detailed Metric Readings
      </Typography>

      <Card>
        <CardContent>
          <div>
            <Typography sx={{ fontSize: "20px", color: "white" }} align="left">
              <strong>Results</strong>
            </Typography>
            <div className="results">
              <div className="conversion border">
                <Typography
                  sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                  align="left"
                >
                  Conversion
                </Typography>
                <div className="conv-data">
                  <Typography
                    sx={{ fontSize: "20px", color: "black" }}
                    align="center"
                  >
                    Landing Page View
                  </Typography>
                  <strong>{conversions}</strong>
                </div>
                <img src={Arrowsvg} alt="arrow" width="30px" height="200px" />
                <div className="conv-data">
                  <Typography
                    sx={{ fontSize: "20px", color: "black" }}
                    align="center"
                  >
                    Leads
                  </Typography>
                  <strong>{webLead}</strong>
                </div>
                <Typography
                  sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                  align="left"
                >
                  Total Leads
                </Typography>
              </div>
              <div className="metric-values">
                <Typography
                  sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                >
                  Metrics
                </Typography>

                <div className="metric-col">
                  {actionsUpdated.map((type) => (
                    <div className="metric-data">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "start",
                          width: "15%",
                        }}
                      >
                        <img
                          src={type.icon}
                          alt="save"
                          width="40px"
                          height="40px"
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "18px", color: "black" }}
                          align="center"
                        >
                          {type.action_type}
                        </Typography>
                        <strong>{type.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className="cost-break-down border">
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
                align="left"
              >
                Cost Break Down
              </Typography>
            </div>

            <div className="views">
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
              >
                Cost Per Action
              </Typography>

              <div style={{ overflow: "scroll", height: "450px" }}>
                {actionTypeUpdated?.map((type) => (
                  <div className="view-keys">
                    <Typography sx={{ fontSize: "18px" }} align="left">
                      {type.action_type}:{" "}
                      <strong>${formatNumber(type.value, 2)}</strong>
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="cost-action-sum">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "start",
                    width: "15%",
                  }}
                >
                  <img src={summation} alt="save" width="40px" height="40px" />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "85%",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "18px", color: "black" }}
                    align="center"
                  >
                    Total Cost Per Action
                  </Typography>
                  <strong>${formatNumber(sum, 2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdsPerformance;
