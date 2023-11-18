import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP, GET_OTP, VERIFY_CONTACT_NO } from "../routes";
import { Loader } from "../layout/loader";
import { isAuthenticated } from "../utils.js/helper";

const Signup = () => {
  const navigate = useNavigate();
  const [contactNo, setContactNo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("male");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    if (isLoggedIn) {
      navigate("/");
    }
  });

  const verfiyContact = async () => {
    let body = JSON.stringify({
      otp: otp,
    });

    var requestOptions = {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const resp = await fetch(
      `${VERIFY_CONTACT_NO}${contactNo}/`,
      requestOptions
    );
    await resp.json();
    return resp.status;
  };

  const handleRegister = async () => {
    setIsloading(true);
    let verifyResp = await verfiyContact();
    setIsloading(false);
    if (verifyResp === 200) {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert("OTP is wrong/expired");
    }
  };

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
    var formdata = new FormData();
    formdata.append("mobile", contactNo);
    formdata.append("is_staff", "1");
    formdata.append("state", state);
    formdata.append("city", city);
    formdata.append("gender", gender);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    const resp = await fetch(SIGNUP, requestOptions);
    const result = await resp.json();
    setIsloading(false);
    if (result.success) {
      const otp = await getOtp();
      setOtp(otp.OTP);
    } else {
      alert(result.message);
    }
  };

  return (
    <React.Fragment>
      <div className="signup">
        {isLoading && <Loader />}
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} action={<Link to="/login" />}>
          <Stack spacing={2} sx={{ marginBottom: 4 }}>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              variant="outlined"
              label="Contact No"
              onChange={(e) => setContactNo(e.target.value)}
              value={contactNo}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              label="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
              fullWidth
              required
              // sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              label="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              fullWidth
              required
            />
            <FormControl>
              {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
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
            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
          )}
        </form>
        <h2>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "white" }}>
            Login Here
          </Link>
        </h2>
      </div>
    </React.Fragment>
  );
};

export default Signup;
