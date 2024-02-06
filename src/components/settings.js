import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TAGS } from "../routes";
import { Loader } from "../layout/loader";
import { PostApiHeaders } from "../utils.js/constant";

const Signup = () => {
  const [tags, setTags] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {});

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
    </React.Fragment>
  );
};

export default Signup;
