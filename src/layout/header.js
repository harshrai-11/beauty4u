import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { LOGOUT } from "../routes";
import { PostApiHeaders } from "../utils.js/constant";
import { useNavigate } from "react-router-dom";
import logout from "../components/images/logout.svg";
import Icon from "@material-ui/core/Icon";

export default function SearchAppBar() {
  const navigate = useNavigate();

  const logoutIcon = (
    <Icon>
      <img
        src={logout}
        alt="logout"
        width="20"
        height="20"
        style={{ marginBottom: "5px" }}
      ></img>
    </Icon>
  );

  const handleLogout = async () => {
    localStorage.removeItem("access_token");

    let resp = await fetch(LOGOUT, PostApiHeaders);
    if (resp.status === 200) {
      navigate("/");
    } else {
      alert("logout api failed");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="header-toolbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
            style={{ color: "white" }}
          >
            Home
          </Typography>
          <Button
            variant="contained"
            startIcon={logoutIcon}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
