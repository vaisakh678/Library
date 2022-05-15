import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "./css/options.css";

function Dropdown({ fetched, active, setActive }) {
    const [type, setType] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        let res = fetched.filter((e) => {
            if (type === "all") {
                return e;
            } else if (type === "student" && fetched.type === "student") {
                return e;
            } else if (type === "staff" && fetched.type === "staff") {
                return e;
            }
            return "";
        });
        setActive(res);
    }, [type, fetched, setActive]);

    useEffect(() => {
        setActive(
            fetched.filter((e) => {
                if (search === "") {
                    return e;
                } else if (e.register_number.toLowerCase().includes(search)) {
                    return e;
                }
                return "";
            })
        );
    }, [fetched, search, setActive]);

    return (
        <div className="options">
            <div className="visitors button">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Type</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        value={type}
                        label="Type"
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"student"}>Student</MenuItem>
                        <MenuItem value={"staff"}>Staff</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                size="small"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                }}
            />
        </div>
    );
}

export default Dropdown;
