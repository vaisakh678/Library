import "./css/visitors.css";
import React, { useState, useEffect } from "react";
import Profile from "./Profile/Profile";

function Visitor() {
    const [page_selected, setPage_selected] = useState("profile");

    useEffect(() => {
        setPage_selected("profile");
    }, []);

    return (
        <div className="visitor">
            {page_selected === "profile" && <Profile />}
            {/* <Profile /> */}
        </div>
    );
}

export default Visitor;
