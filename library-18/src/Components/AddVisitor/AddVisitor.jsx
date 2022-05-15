import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./add-visitor.css";

function AddVisitor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reg, setReg] = useState("");

  async function handle_register(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/reigster-visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        email,
        reg,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="add-visitor">
      <h1>Add Visitor</h1>
      <form onSubmit={handle_register}>
        <div className="input-fields">
          <TextField
            className="input"
            id="standard-basic"
            label="Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="input"
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="input"
            id="standard-basic"
            label="Register number"
            variant="standard"
            onChange={(e) => setReg(e.target.value)}
          />
          <div>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddVisitor;
