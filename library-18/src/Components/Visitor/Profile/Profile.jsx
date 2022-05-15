import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./profile.css";
import Statistics from "./Statistics/Statistics";
import { purple } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Heatmap from "./Heatmap/Heatmap";

function Profile() {
    let register_no = "kh.sc.p2mca21032";
    const [fetched_logs, setFetched_logs] = useState([]);
    const [logs, setLogs] = useState([]);
    const [fetched_year, setFetched_Year] = useState([]);
    const [year, setYear] = useState(2022);

    async function fetch_logs() {
        const response = await fetch(
            "http://localhost:3001/api/logs/fetch-visitor-log",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    register_no,
                }),
            }
        );

        const data = await response.json();
        if (data.status === "ok") {
            setFetched_logs(data.logs);
            setLogs(data.logs);
            setFetched_Year(data.years);
        }
        console.log(data);
    }

    useEffect(() => {
        fetch_logs();
    }, []);

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
                    <div className="year-select">
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">
                                Year
                            </InputLabel>
                            <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Year"
                                onChange={(e) => {
                                    setYear(e.target.value);
                                }}
                            >
                                {fetched_year.map((e, idx) => {
                                    return (
                                        <MenuItem key={idx} value={e}>
                                            {e}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="chart-field">
                        <Heatmap data={logs} year={year} />
                    </div>
                </div>
                <div className="statistics-wrapper">
                    <Statistics
                        fetched_year={fetched_year}
                        fetched_logs={fetched_logs}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
