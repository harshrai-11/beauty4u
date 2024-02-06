import * as React from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { INSTAGRAM_FEED_DETAILS_LIST } from "../routes";
import { ApiHeaders, listReelsStatsItems } from "../utils.js/constant";
import { Loader } from "../layout/loader";
import DataTable from "react-data-table-component";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";
import { formatDate, getStatsNumberList } from "../utils.js/helper";
import { AppLayoutWrapper } from "../layout/AppLayoutWrapper";

const ExpandedComponent = ({ data }) => {
  return (
    <div
      style={{ display: "flex", padding: "20px" }}
      className="expandable-row"
    >
      {data?.media_product_type === "REELS" && (
        <div className="right-body">
          <div className="insta-active-picture-row">
            {
              <video
                width="100%"
                height="242"
                controls
                src={data?.media_url ?? "/Image_not_available.png"}
              >
                <source src={data?.media_url} type="video/mp4" />
              </video>
            }
          </div>
          <div className="image-details-text">
            <div className="post-caption">
              <p style={{ color: "#fff", margin: 0, fontSize: "12px" }}>
                {data?.caption}
              </p>
              <h6 className="date-heading">
                POSTED ON {formatDate(data?.timestamp)}
              </h6>
            </div>
            <div className="post-stats-amount">
              {listReelsStatsItems.map((item, index) => {
                return (
                  <div key={index} className="post-stats-amount-item">
                    <div className="stats-icon">{item?.icon}</div>
                    <div className="stats-type">
                      <p>{item?.label}</p>
                      <h4>{getStatsNumberList(data, item?.id)}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ListPage = () => {
  const [feedResponse, setFeedResponse] = useState([]);
  const [nextPagination, setNextPagination] = useState("");
  const [previousPagination, setPreviousPagination] = useState("");
  // Loader State
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getInstagramFeedDetails = (
    isFirstPage = false,
    cursorToken,
    beforeOrAfter
  ) => {
    axios(
      INSTAGRAM_FEED_DETAILS_LIST(isFirstPage, cursorToken, beforeOrAfter),
      ApiHeaders
    )
      .then((feedResponse) => {
        if (feedResponse?.data?.data?.data) {
          const apiResponse = feedResponse?.data?.data?.data;
          const finalResponse = [];
          apiResponse?.forEach((value) => {
            value.reach = value?.insights?.reach ?? "Not Available";
            value.image = (
              <img
                style={{ borderRadius: "10px" }}
                src={value.thumbnail_url ?? value.media_url}
                height={50}
                width={50}
                alt={`${value.id}`}
              ></img>
            );
            value.date = new Date(value.timestamp).toDateString();
            finalResponse.push(value);
          });
          setShowLoader(false);
          setFeedResponse(finalResponse);
          setNextPagination(feedResponse?.data?.data?.paging?.cursors?.after);
          setPreviousPagination(
            !isFirstPage
              ? feedResponse?.data?.data?.paging?.cursors?.before
              : ""
          );
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    setShowLoader(true);
    getInstagramFeedDetails(true, "", "");
  }, []);

  const getData = (isNextOrPrevious) => {
    if (isNextOrPrevious === "next") {
      setShowLoader(true);
      getInstagramFeedDetails(false, nextPagination, "after");
    } else {
      setShowLoader(true);
      getInstagramFeedDetails(false, previousPagination, "before");
    }
  };

  const handlePageChange = (isNextOrPrevious) => {
    if (isNextOrPrevious === "next") {
      setCurrentPage(currentPage + 1);
      getData(isNextOrPrevious);
    } else {
      setCurrentPage(currentPage - 1);
      getData(isNextOrPrevious);
    }
  };

  const handleSort = (sortRow, sortType, rows) => {
    let key = "like_count";
    if (sortRow.name === "Comments") {
      key = "comments_count";
    } else if (sortRow.name === "Reach") {
      key = "reach";
    }
    if (key !== "reach") {
      return rows.sort((rowA, rowB) => {
        if (sortType === "desc") {
          return rowB - rowA;
        } else {
          return rowA - rowB;
        }
      });
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row?.image,
      sortable: false,
      wrap: true,
    },
    {
      name: "Caption",
      selector: (row) => row?.caption,
      sortable: false,
    },
    {
      name: "Type",
      selector: (row) => row?.media_product_type,
      sortable: false,
      wrap: true,
    },
    {
      name: "Category",
      selector: (row) => row?.insights?.tag,
      wrap: true,
    },
    {
      name: "Likes",
      selector: (row) => row?.like_count,
      sortable: true,
      wrap: true,
    },
    {
      name: "Comments",
      selector: (row) => row?.comments_count,
      sortable: true,
      wrap: true,
    },
    {
      name: "Reach",
      selector: (row) => row?.reach,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date added",
      selector: (row) => row?.date,
      sortable: false,
      wrap: true,
    },
  ];

  const listPageButtons = [
    {
      buttonLabel: "Instagram",
      variant: "contained",
    },
  ];

  return (
    <AppLayoutWrapper
      layoutId={2}
      headerType="button-layout"
      headerData={{ heading: "", buttons: listPageButtons }}
      className="list-class-buttons"
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {showLoader && <Loader></Loader>}
        <DataTable
          columns={columns}
          data={feedResponse}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          onSort={handleSort}
          fixedHeader
          responsive
        />
        <div
          className="table-footer"
          style={{ background: "#293346", padding: "20px" }}
        >
          <div className="feed-next-back-button">
            {previousPagination !== "" && (
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
            {nextPagination !== "" && (
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
      </Paper>
    </AppLayoutWrapper>
  );
};
