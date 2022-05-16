import React from "react";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./profile.css";
import { purple } from "@mui/material/colors";

import Heatmap from "./Heatmap/Heatmap";
import Statistics from "./Statistics/Statistics";

function Profile() {
    let register_no = "kh.sc.p2mca21032";
    return (
        <div className="profile">
            <div className="nav-heading">
                <ArrowBackIcon className="back-icon" />
                <h2 className="title-x">Profile</h2>
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
                        <Heatmap register_no={register_no} />
                    </div>
                </div>
                <div className="statistics-wrapper">
                    <Statistics register_no={register_no} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
