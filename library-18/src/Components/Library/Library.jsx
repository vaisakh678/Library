import React from "react";
import Visitors from "./Visitors/Visitors";
import "./library.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function Library() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="library">
            <h1 className="library-heading">Library</h1>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Active Visitors" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ height: "90%" }}>
                    <Visitors />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </div>
    );
}

export default Library;
