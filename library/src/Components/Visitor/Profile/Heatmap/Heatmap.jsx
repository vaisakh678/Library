import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import "react-d3-calendar-heatmap/dist/react.d3.calendar.heatmap.css";
import CalendarHeatMap from "react-d3-calendar-heatmap";

function Heatmap() {
    const [year, setYear] = useState(0);
    const [fetched_year, setFetched_Year] = useState([]);
    const [max, setMax] = useState(0);
    const [logs, setLogs] = useState([]);
    const [fetched_logs, setFetched_logs] = useState([]);

    useEffect(() => {
        setYear(2022);
        setLogs(fetched_logs);
    }, [max, fetched_logs]);

    useEffect(() => {
        let register_no = "kh.sc.p2mca21032";
        async function fetch_logs() {
            const response = await fetch(
                "http://localhost:3001/api/logs/fetch-heatmap-log",
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
                setMax(Math.max(...data.years));
                setFetched_Year([2020, 2021, 2022]);
            }
            // console.log(data);
        }

        fetch_logs();
    }, []);

    const timeRange = {
        from: new Date(`${year}-01-01`),
        to: new Date(`${year}-12-31`),
    };

    return (
        <div>
            <div className="year-select">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
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

            <CalendarHeatMap
                weekday="weekend"
                cellSize={15}
                timeRange={timeRange}
                data={logs}
                cellShape="square"
                tooltipOffsetX={200}
                tooltipOffsetY={-300}
            />
        </div>
    );
}

export default Heatmap;
