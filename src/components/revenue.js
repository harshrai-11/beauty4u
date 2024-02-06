import React, { useEffect, useState } from "react";
import { REVENUE } from "../routes";
import { ApiHeaders } from "../utils.js/constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Loader } from "../layout/loader";
import Typography from "@mui/material/Typography";

export const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    setShowLoader(true);
    getRevenue().catch((error) => {
      console.log("error", error);
    });
  }, []);

  const rows = [];
  const getRevenue = async () => {
    const resp = await fetch(`${REVENUE}`, ApiHeaders);
    let result = await resp.json();
    result = result.data?.data;

    setTotalSpend(result.total_spend);
    for (let key in result) {
      if (key !== "total_spend")
        rows.push(createData(key, result[key]["spend"]));
    }
    setRevenueData(rows);
    setShowLoader(false);
  };

  function createData(adName, spend) {
    return { adName, spend };
  }

  return (
    <div>
      <div>
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "white",
            margin: "20px",
          }}
          align="center"
        >
          Previous Month Ad Spends
        </Typography>
      </div>
      <div
        style={{
          width: "500px",
          margin: "0px auto",
          height: "600px",
          overflow: "scroll",
        }}
      >
        {showLoader && <Loader></Loader>}
        <TableContainer component={Paper}>
          <Table sx={{ width: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Active Ad</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Total Spend</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revenueData?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.adName}
                  </TableCell>
                  <TableCell align="right">${row.spend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
          align="center"
        >
          Total Spend:
        </Typography>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
          align="center"
        >
          ${totalSpend}
        </Typography>
      </div>
    </div>
  );
};
