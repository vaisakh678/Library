import React, { useState } from "react";
import "./style.css";
import { TextField, Button, Checkbox } from "@mui/material";
import lib2 from "./lib2.jpeg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRem, setIsRem] = useState(true);

  if (localStorage.getItem("token")) {
    window.location.href = "/dashboard";
  }

  async function handle_login(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(isRem);

    let response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    let data = await response.json();
    console.log(data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/dashboard";
    } else {
      localStorage.removeItem("token");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <form action="" onSubmit={handle_login}>
            <h1 className="login-title">Login</h1>
            <div className="username-input">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="user-pass">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="remember-forgot">
              <Checkbox
                checked={isRem}
                onClick={() => {
                  setIsRem(!isRem);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span>Keep me logged in</span>
            </div>
            <div className="login-btn">
              <Button type="submit" variant="contained">
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="login-right">
          <img className="login-image" src={lib2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
