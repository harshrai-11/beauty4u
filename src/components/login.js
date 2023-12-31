import React, { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, GET_OTP } from "../routes";
import { Loader } from "../layout/loader";
import { isAuthenticated } from "../utils.js/helper";

const Login = () => {
  const navigate = useNavigate();
  const [contactNo, setContactNo] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    if (isLoggedIn) {
      navigate("/");
    }
  });

  const getOtp = async () => {
    var requestOptions = {
      method: "GET",
    };

    const resp = await fetch(`${GET_OTP}${contactNo}`, requestOptions);
    const result = await resp.json();
    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const otp = await getOtp();
    setOtp(otp.OTP);
    setIsloading(false);
  };

  const handleLogin = async () => {
    setIsloading(true);
    let body = JSON.stringify({
      mobile: contactNo,
      otp: otp,
    });

    // var requestOptions = {
    //   method: "POST",
    //   body: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const resp = await fetch(`${LOGIN}`, requestOptions);
    // const result = await resp.json();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("mobile", contactNo);
    urlencoded.append("otp", otp);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const resp = await fetch(`${LOGIN}`, requestOptions);
    const result = await resp.json();

    setIsloading(false);
    if (result.success) {
      const token = result.access_token;
      localStorage.setItem("access_token", token);
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <React.Fragment>
      <div className="signup">
        {isLoading && <Loader />}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ marginBottom: 4 }}>
            <h1>Login</h1>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              variant="outlined"
              label="Contact No"
              onChange={(e) => setContactNo(e.target.value)}
              value={contactNo}
              fullWidth
              required
            />
            {otp && (
              <TextField
                type="text"
                variant="outlined"
                label="otp"
                value={otp}
              />
            )}
          </Stack>
          {!otp && (
            <Button variant="contained" type="submit">
              Get Otp
            </Button>
          )}
          {otp && (
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          )}
        </form>
        <h2>
          Need an account?{" "}
          <Link to="/signup" style={{ color: "white" }}>
            Register here
          </Link>
        </h2>
      </div>
    </React.Fragment>
  );
};

export default Login;
