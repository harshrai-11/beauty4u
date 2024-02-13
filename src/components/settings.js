import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TAGS, GET_TAG_LIST } from "../routes";
import { Loader } from "../layout/loader";
import { ApiHeaders, PostApiHeaders } from "../utils.js/constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Signup = () => {
  const [tags, setTags] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    setIsloading(true);
    getTags().catch((error) => {
      console.log("get tags error", error);
    });
  }, []);

  const getTags = async () => {
    const resp = await fetch(GET_TAG_LIST, ApiHeaders);
    const result = await resp.json();
    setTagList(result);
    setIsloading(false);
  };

  function createData(adName, spend) {
    return { adName, spend };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);

    var raw = JSON.stringify({
      tag: tags,
    });

    PostApiHeaders.body = raw;

    const resp = await fetch(ADD_TAGS, PostApiHeaders);
    setIsloading(false);
    if (resp.status === 201) {
      alert("tag added successfully");
      setTags("");
    } else {
      alert("api failed");
    }
  };

  return (
    <React.Fragment>
      <div className="settings">
        {isLoading && <Loader />}
        {/* <div> */}
        <h1 style={{ color: "white" }}>Add Category For Post</h1>
        <form onSubmit={handleSubmit} action={<Link to="/" />}>
          <Stack spacing={2} sx={{ marginBottom: 4 }}>
            <TextField
              variant="outlined"
              label="Category"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              fullWidth
              required
            />
          </Stack>
          <Button variant="contained" type="submit">
            Add Category
          </Button>
        </form>

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ width: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Categories</strong>
                  </TableCell>
                  {/* <TableCell align="right">
                    <strong>Total Spend</strong>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {tagList?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.tag}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {}}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {}}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default Signup;
