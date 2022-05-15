import React, { useEffect, useState } from "react";
import "./statistics.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Statistics({ fetched_logs }) {
    const [year, setYear] = useState("All");
    const [fetched_year, setFetched_year] = useState([2021, 2022]);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        setLogs(fetched_logs);
        console.log(fetched_logs);
    }, [fetched_logs]);

    const [range1, setRange1] = useState(null);
    const [range2, setRange2] = useState(null);

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
                                <MenuItem value={"All"}>All</MenuItem>
                                <MenuItem value={"custom"}>Custom</MenuItem>
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
                    {year === "custom" && (
                        <div className="custom-range">
                            <div className="range-field">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        label="To"
                                        value={range1}
                                        onChange={(newValue) => {
                                            setRange1(newValue);
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
                                            setRange2(newValue);
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
                                            {row.value}
                                            {moment
                                                .utc(row.value)
                                                .format("HH:mm")}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
