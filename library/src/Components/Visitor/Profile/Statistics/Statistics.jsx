import React, { useEffect, useState } from "react";
import "./statistics.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import moment from "moment";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Statistics({ register_no }) {
    // let register_no = "kh.sc.p2mca21032";
    const [year, setYear] = useState("all");
    const [logs, setLogs] = useState([]);
    const [fetchedLogs, setFetchedLogs] = useState([]);

    const [range1, setRange1] = useState(null);
    const [range2, setRange2] = useState(null);
    const [custom, setCustom] = useState(null);

    useEffect(() => {
        setLogs(fetchedLogs);
    }, [fetchedLogs]);

    useEffect(() => {
        if (year === "all") {
            setLogs(fetchedLogs);
        } else if (year === "custom") {
            fetchedLogs.map((e) => {
                if (e.day === custom) {
                    console.log(e);
                    setLogs([e]);
                }
            });
        } else if (year === "range") {
            if (
                range1 != null &&
                range2 != null &&
                range1 !== "Invalid date" &&
                range2 !== "Invalid date"
            ) {
                console.log({ range1 });
                console.log({ range2 });
                let res = fetchedLogs.filter((e) => {
                    if (moment(e.day).isBetween(range1, range2)) {
                        return e.day;
                    }
                });
                setLogs(res);
            }
        }
    }, [year, fetchedLogs, custom, range1, range2]);

    useEffect(() => {
        async function fetch_logs() {
            const response = await fetch(
                "http://localhost:3001/api/logs/fetch-stat-log",
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
                console.log(data);
                setFetchedLogs(data.logs);
            }
        }

        fetch_logs();
    }, [register_no]);

    function handle_download_csv() {
        const rows = [["Serial", "Date", "Time spend (minutes)"]];
        logs.map((e, idx) => {
            console.log(e);
            rows.push([idx + 1, e.day, e.value]);
        });

        let csvContent =
            "data:text/csv;charset=utf-8," +
            rows.map((e) => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);

        link.setAttribute("download", `${register_no.toUpperCase()}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
        // window.open(encodedUri);
    }

    return (
        <div className="statistics">
            <h3>Statistics</h3>
            <div className="statistics-wrapper">
                <div className="range-selector">
                    <div className="year-select-input">
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
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"range"}>Range</MenuItem>
                                <MenuItem value={"custom"}>Custom</MenuItem>
                                {/* {fetched_year.map((e, idx) => {
                                    return (
                                        <MenuItem key={idx} value={e}>
                                            {e}
                                        </MenuItem>
                                    );
                                })} */}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="custom">
                        {year === "range" && (
                            <div className="custom-range">
                                <div className="range-field">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label="To"
                                            value={range1}
                                            onChange={(newValue) => {
                                                setRange1(
                                                    moment(newValue).format(
                                                        "MM-DD-YYYY"
                                                    )
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="range-field">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label="From"
                                            value={range2}
                                            onChange={(newValue) => {
                                                setRange2(
                                                    moment(newValue).format(
                                                        "MM-DD-YYYY"
                                                    )
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        )}
                        {year === "custom" && (
                            <div className="custom-date">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        label="Date"
                                        value={custom}
                                        onChange={(newValue) => {
                                            setCustom(
                                                moment(newValue).format(
                                                    "MM-DD-YYYY"
                                                )
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                size="small"
                                                {...params}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 50 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Serial</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time Spend</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs.map((row, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.day}
                                        </TableCell>
                                        <TableCell>
                                            {Math.floor(row.value)}
                                            {/* {moment
                                                .utc(row.value)
                                                .format("HH:mm")} */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="csv-download">
                    <Button onClick={handle_download_csv} variant="contained">
                        Download csv
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
