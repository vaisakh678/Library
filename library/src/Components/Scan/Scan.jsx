import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

import { LinearProgress } from "@mui/material";
import QrScanner from "./QrScanner/QrScanner";
import Input from "./Input/Input";
import "./scan.css";

function Scan({ smart_catching }) {
    const [reg, setReg] = useState("");
    const [wait, setWait] = useState(false);
    const [option, setOption] = useState("scanner");

    //snackbar
    const [open, setOpen] = useState(false);
    const [mgs, setMsg] = useState("");
    const [bg, setBg] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (localStorage.getItem("scanner-menu")) {
            setOption(localStorage.getItem("scanner-menu"));
        } else {
            setOption("scanner");
        }
    }, []);

    useEffect(() => {
        setWait(false);
        if (smart_catching) {
            localStorage.setItem("scanner-menu", option);
        } else {
            localStorage.setItem("scanner-menu", "scanner");
        }
    }, [option, smart_catching]);

    async function handle_submit(e) {
        console.log(`fuck yoooo: ${reg}`);
        if (e) {
            e.preventDefault();
        }
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

        setReg("");
        const data = await response.json();
        console.log(data);

        if (data.action === "checkin") {
            setOpen(true);
            setMsg(`${data.reg} has successfuly checkin!`);
            setBg("green");
        } else if (data.action === "checkout") {
            setOpen(true);
            setMsg(`${data.reg} has successfuly checkedout!`);
            setBg("#1b73e8");
        }
    }

    return (
        <div className="scan">
            <h1>Scan</h1>
            <Snackbar
                // message="KH.SC.P2MCA21032 hash succesfully checked in"
                message={mgs}
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
                sx={{
                    width: 400,
                    color: "secondary",
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: bg,
                        // backgroundColor: "green",
                        // backgroundColor: "#1b73e8",
                    },
                }}
            />
            <div className="scan-wrapper">
                <div className="scanner">
                    {option === "cam" && (
                        <QrScanner
                            setOpen={setOpen}
                            setBg={setBg}
                            setMsg={setMsg}
                            setWait={setWait}
                            wait={wait}
                            handle_submit={handle_submit}
                        />
                    )}
                    {option === "input" && (
                        <Input
                            handle_submit={handle_submit}
                            reg={reg}
                            setReg={setReg}
                        />
                    )}
                </div>

                {wait && <LinearProgress className="wait" />}

                <div className="menu">
                    <div className="btns">
                        <div
                            onClick={() => {
                                setOption("scanner");
                            }}
                            className={
                                option === "scanner" ? "btn active" : "btn"
                            }
                        >
                            Scanner
                        </div>
                        <div
                            onClick={() => {
                                setOption("cam");
                            }}
                            className={option === "cam" ? "btn active" : "btn"}
                        >
                            Cam
                        </div>
                        <div
                            onClick={() => {
                                setOption("input");
                            }}
                            className={
                                option === "input" ? "btn active" : "btn"
                            }
                        >
                            Input
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Scan;
