import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TAGS, GET_TAG_LIST, UPDATE_TAG, DELETE_TAG } from "../routes";
import { Loader } from "../layout/loader";
import {
  ApiHeaders,
  PostApiHeaders,
  PatchApiHeaders,
  DeleteApiHeaders,
} from "../utils.js/constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Settings = () => {
  const [tags, setTags] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState({});

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
      window.location.reload();
    } else {
      alert("api failed");
    }
  };

  const handleEditClick = (tag) => {
    setSelectedTag(tag);
    setOpenEdit(true);
  };

  const handleDeleteClick = (tag) => {
    setSelectedTag(tag);
    setOpenDeleteDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleTagEdit = (ev) => {
    setSelectedTag((prev) => ({
      ...prev,
      tag: ev.target.value,
    }));
  };

  const handleTagDelete = async () => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      },
    };

    const resp = await fetch(DELETE_TAG + selectedTag.id, DeleteApiHeaders);
    const result = await resp.json();
    setOpenDeleteDialog(false);
    window.location.reload();
  };

  const handleTagUpdate = async () => {
    var raw = JSON.stringify({
      tag: selectedTag.tag,
    });

    PatchApiHeaders.body = raw;

    const resp = await fetch(UPDATE_TAG + selectedTag.id, PatchApiHeaders);
    const result = await resp.json();
    setOpenEdit(false);
    window.location.reload();
  };

  function editDialog() {
    return (
      <Dialog
        open={openEdit}
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle>Update Category Value</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Update Category Value</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="category"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={selectedTag?.tag}
            onChange={(ev) => handleTagEdit(ev)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button type="button" onClick={handleTagUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function deleteDialog() {
    return (
      <Dialog
        open={openDeleteDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Delete the Category?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button autoFocus onClick={handleTagDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <React.Fragment>
      <div className="settings">
        {isLoading && <Loader />}
        <div>
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
        </div>
        {editDialog()}
        {deleteDialog()}
        <div
          style={{
            margin: "0px auto",
            marginTop: "20px",
            marginBottom: "20px",
            height: "500px",
            overflow: "scroll",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Categories</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Edit</strong>
                  </TableCell>

                  <TableCell align="right">
                    <strong>Delete</strong>
                  </TableCell>
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
                        onClick={() => handleEditClick(row)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(row)}
                        startIcon={<DeleteIcon />}
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
    </React.Fragment>
  );
};

export default Settings;
