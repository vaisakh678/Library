import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./profile.css";
import { purple } from "@mui/material/colors";

import Heatmap from "./Heatmap/Heatmap";
import Statistics from "./Statistics/Statistics";

function Profile() {
    // useEffect(() => {
    //     let register_no = "kh.sc.p2mca21032";
    //     async function fetch_logs() {
    //         const response = await fetch(
    //             "http://localhost:3001/api/logs/fetch-visitor-log",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "x-access-token": localStorage.getItem("token"),
    //                 },
    //                 body: JSON.stringify({
    //                     register_no,
    //                 }),
    //             }
    //         );

    //         const data = await response.json();
    //         if (data.status === "ok") {
    //             setFetched_logs(data.logs);
    //             setFetched_Year(data.years);
    //             setFetched_Year([2020, 2021, 2022]);
    //             setMax(Math.max(...data.years));
    //         }
    //         console.log(data);
    //     }

    //     fetch_logs();
    // }, []);

    return (
        <div className="profile">
            <div className="nav-heading">
                <ArrowBackIcon className="back-icon" />
                <h1 className="title">Profile</h1>
            </div>
            <div className="profile-container">
                <div className="profile-details">
                    <div className="profile-picture">
                        <Avatar
                            sx={{
                                bgcolor: purple,
                                width: "10rem",
                                height: "10rem",
                            }}
                        >
                            OP
                        </Avatar>
                    </div>
                    <div className="details">
                        <ul>
                            <li>
                                <h3>Vaisakh</h3>
                            </li>
                            <li>
                                <h4>kh.sc.p2mca21032</h4>
                            </li>
                            <li>vaisakh2077@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="heatmap">
                    <div className="chart-field">
                        <Heatmap />
                    </div>
                </div>
                <div className="statistics-wrapper">
                    <Statistics />
                </div>
            </div>
        </div>
    );
}

export default Profile;
