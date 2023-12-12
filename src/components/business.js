import React, { useState, useEffect } from "react";
import { SearchBar } from "./searchBar";
import { adsHeader, adsetsHeader } from "../utils.js/constant";
import { ADS, ADS_SETS } from "../routes";
import { Grid, Button } from "@mui/material";
import { AppLayoutWrapper } from "../layout/AppLayoutWrapper";
import { Loader } from "../layout/loader";
import DataTable from "react-data-table-component";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import { useParams, useNavigate } from "react-router-dom";

export const Business = () => {
  const [activeHeaderOption, setActiveHeaderOption] = useState("Running Ads");
  // Loader State
  const [showLoader, setShowLoader] = useState(false);
  const [userData, setUserData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [runningAds, setRunningAds] = useState([]);
  const [inactiveAds, setInactiveAds] = useState([]);
  const [rejectedAds, setRejectedAds] = useState([]);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [currentHeader, setCurrentHeader] = useState(adsetsHeader);

  const { type } = useParams();
  const navigate = useNavigate();

  const running = [];
  const inactive = [];
  const rejected = [];

  useEffect(() => {
    setShowLoader(true);
    if (type === "ads") {
      setCurrentHeader(adsHeader);
      setActiveHeaderOption(adsHeader[0]);
      getAds().catch((error) => {
        console.log("error", error);
      });
    } else if (type === "adsets") {
      setValue(1);
      setCurrentHeader(adsetsHeader);
      setActiveHeaderOption(adsetsHeader[0]);
      getAdsets().catch((error) => {
        console.log("error in adsets", error);
      });
    } else if (type === "campaign") {
      setValue(2);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      navigate("/business/ads");
    }
    if (newValue === 1) {
      navigate("/business/adsets");
    }
  };

  var requestOptions = {
    method: "GET",
  };

  const getAds = async () => {
    const resp = await fetch(`${ADS}`, requestOptions);
    setShowLoader(false);
    const result = await resp.json();
    setNextUrl(result?.data?.data?.paging?.next);
    createAdsRows(result?.data?.data);
  };

  const getAdsets = async () => {
    const resp = await fetch(`${ADS_SETS}`, requestOptions);
    setShowLoader(false);
    const result = await resp.json();
    createAdsRows(result?.data?.data);
  };

  const handlePageChange = async (value) => {
    if (value === "home") {
      window.location.reload();
      return;
    }

    setShowLoader(true);
    let url = "";

    if (value === "next") {
      url = nextUrl;
    } else {
      url = prevUrl;
    }

    if (url) {
      const resp = await fetch(url, requestOptions);
      const result = await resp.json();
      if (result?.paging?.next) {
        setNextUrl(result?.paging?.next);
        setShowNext(true);
      } else {
        setShowNext(false);
      }

      if (result?.paging?.previous) {
        setPrevUrl(result?.paging?.previous);
        setShowPrev(true);
      } else {
        setShowPrev(false);
      }

      createAdsRows(result);
    }

    setShowLoader(false);
  };

  const handleTabChange = (e) => {
    setActiveHeaderOption(e.target.textContent);
    let activeHeader = e.target.textContent;
    setTableData(activeHeader);
  };

  const handleLinkClick = (e, data) => {
    e.preventDefault();
    navigate("/performance", { state: data });
  };

  const setTableData = (activeHeader) => {
    if (activeHeader === "Running Ads" || activeHeader === "Running Ad Set") {
      setUserData(runningAds);
      return;
    }

    if (activeHeader === "Inactive Ads" || activeHeader === "Inactive Ad Set") {
      setUserData(inactiveAds);
    }

    if (activeHeader === "Rejected Ads" || activeHeader === "Rejected Ad Set") {
      setUserData(rejectedAds);
      return;
    }
  };

  let node;

  const handleMouseEnter = (e) => {
    if (type === "adsets") {
      node = e.target.children[0];
      if (node) {
        node.style.display = "flex";
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (node) {
      node.style.display = "none";
    }
  };

  const createDataObj = (data, index) => {
    let obj = {};

    obj = {
      id: index + 1,
      adName: (
        <div
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100px",
          }}
        >
          {data.name}
          <div className="campaign-analysis-links" id="adname">
            <Button href="/" onClick={(e) => handleLinkClick(e, data)}>
              View charts
            </Button>
          </div>
        </div>
      ),
      budget: data?.insights?.data[0].spend,
      amountSpent: data?.insights?.data[0].spend,
      costPerResult: data?.insights?.data[0].cpc,
      results: data?.insights?.data[0].ctr,
      delivery: data?.insights?.data[0].objective,
      ends: data?.insights?.data[0].quality_ranking,
      status: data.effective_status,
      reach: data?.insights?.data[0].reach,
      impressions: data?.insights?.data[0].impressions,
    };

    return obj;
  };

  const createAdsRows = (rowsData) => {
    rowsData?.data?.forEach((data, index) => {
      let obj = {};

      if (data.effective_status === "ACTIVE") {
        obj = createDataObj(data, index);
        running.push(obj);
      }

      if (data.effective_status === "PAUSED") {
        obj = createDataObj(data, index);
        inactive.push(obj);
      }

      if (data.effective_status === "DISAPPROVED") {
        obj = createDataObj(data, index);
        rejected.push(obj);
      }
    });

    setRunningAds(running);
    setRejectedAds(rejected);
    setInactiveAds(inactive);

    if (
      activeHeaderOption === "Running Ads" ||
      activeHeaderOption === "Running Ad Set"
    ) {
      setUserData(running);
      return;
    }

    if (
      activeHeaderOption === "Inactive Ads" ||
      activeHeaderOption === "Inactive Ad Set"
    ) {
      setUserData(inactive);
      return;
    }

    if (
      activeHeaderOption === "Rejected Ads" ||
      activeHeaderOption === "Rejected Ad Set"
    ) {
      setUserData(rejected);
      return;
    }
  };

  const columns = [
    {
      name: "Ends",
      selector: (row) => row.ends,
      wrap: true,
    },
    {
      name: "Delivery",
      selector: (row) => row.delivery,
      wrap: true,
    },
    {
      name: "Results",
      selector: (row) => row.results,
      wrap: true,
    },
    {
      name: "Amount Spent",
      selector: (row) => row.amountSpent,
      wrap: true,
    },
    {
      name: "Budget",
      selector: (row) => row.budget,
      wrap: true,
    },
    {
      name: "Cost Per Result",
      selector: (row) => row.costPerResult,
      wrap: true,
    },
    {
      name: "Ad Name",
      selector: (row) => row.adName,
    },
  ];

  const expandedComponent = ({ data }) => {
    return (
      <div className="expand-list">
        <span>
          <strong style={{ color: "#6de6b5" }}>Ad Set Name:</strong>
          {data.adName.props.children[0]}
        </span>
        <span>
          <strong style={{ color: "#6de6b5" }}>Reach:</strong>
          {data.reach}
        </span>
        <span>
          <strong style={{ color: "#6de6b5" }}>Impressions: </strong>
          {data.impressions}
        </span>
      </div>
    );
  };

  return (
    <AppLayoutWrapper
      layoutId={2}
      headerData={currentHeader}
      headerType="navigation"
      activeHeaderOption={activeHeaderOption}
      handleTabChange={handleTabChange}
    >
      {showLoader && <Loader></Loader>}

      <div className="search-layout-ads">
        <div className="search-bar">
          <SearchBar searchBarPlaceholder="Search and filter"></SearchBar>
        </div>
      </div>

      <div className="ads-page-layout">
        <div className="ads-tab">
          <Tabs
            value={value}
            orientation="vertical"
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab icon={<CloudUploadIcon />} iconPosition="start" label="Ads" />
            <Tab icon={<GridViewIcon />} iconPosition="start" label="Ad sets" />
            <Tab
              icon={<FolderOutlinedIcon />}
              iconPosition="start"
              label="Campaign"
            />
          </Tabs>
        </div>

        <Grid spacing={2} container>
          <DataTable
            columns={columns}
            data={userData}
            fixedHeader
            responsive
            expandableRows
            expandableRowsComponent={expandedComponent}
          />
        </Grid>
      </div>

      {type === "ads" && (
        <div
          className="table-footer"
          style={{ background: "#293346", padding: "20px" }}
        >
          <div className="feed-next-back-button">
            <Button
              className="feed-next-button-list"
              onClick={() => handlePageChange("home")}
              variant="outlined"
              startIcon={<HomeIcon />}
            >
              {" "}
              Go To Home
            </Button>

            {showPrev && (
              <Button
                className="feed-next-button-list"
                onClick={() => handlePageChange("previous")}
                variant="outlined"
                startIcon={<ArrowLeftIcon />}
              >
                {" "}
                Previous{" "}
              </Button>
            )}
            {showNext && (
              <Button
                className="feed-next-button-list"
                onClick={() => handlePageChange("next")}
                variant="outlined"
                endIcon={<ArrowRightIcon></ArrowRightIcon>}
              >
                {" "}
                Next{" "}
              </Button>
            )}
          </div>
        </div>
      )}
    </AppLayoutWrapper>
  );
};
