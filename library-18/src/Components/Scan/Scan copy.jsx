import React, { useState } from "react";
import "./scan.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function Scan() {
    const [reg, setReg] = useState("");

    async function handle_submit(e) {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:3001/api/handle-in-out",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    reg,
                }),
            }
        );

        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="scan">
            <h1>Scan</h1>
            <form onSubmit={handle_submit}>
                <div>
                    <TextField
                        onChange={(e) => {
                            setReg(e.target.value);
                        }}
                        size="small"
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                    />
                </div>
                <div>
                    <Button variant="contained" type="submit">
                        Scan
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Scan;
