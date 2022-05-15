import React, { useEffect, useState } from "react";
import "./css/visitors.css";
import moment from "moment";
import Options from "./Options/Options";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Visitors() {
    const [fetched, setFetched] = useState([]);
    const [active, setActive] = useState([]);
    console.log(active);

    useEffect(() => {
        setActive(fetched);
    }, [fetched]);

    async function init() {
        const response = await fetch(
            "http://localhost:3001/api/logs/fetch-active-visitors",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    status: "ok",
                }),
            }
        );

        const data = await response.json();
        if (data.status === "ok") {
            setFetched(data.active_visitors);
            console.log(data);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="visitors">
            <Options fetched={fetched} active={active} setActive={setActive} />
            {active.length ? (
                <TableContainer
                    component={Paper}
                    sx={{ maxHeight: "85%", minWidth: "70%" }}
                >
                    <Table
                        sx={{ minWidth: 550 }}
                        stickyHeader
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Serial</TableCell>
                                <TableCell>Register no.</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>CheckedIn</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {active.map((row, idx) => (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.register_number}
                                    </TableCell>
                                    <TableCell>
                                        {/* {row.type} */}
                                        student
                                    </TableCell>
                                    <TableCell>
                                        {moment(new Date(row.checkin)).format(
                                            "hh:mm a"
                                        )}
                                    </TableCell>
                                    <TableCell>{"current time"}</TableCell>
                                    <TableCell>{"active"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className="no-res">no result</div>
            )}
            {/* <div className="fuck"></div> */}
        </div>
    );
}

export default Visitors;
