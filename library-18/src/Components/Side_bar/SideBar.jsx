import React from "react";
import "./side-bar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LogoutIcon from "@mui/icons-material/Logout";

function SideBar({ selected_page, setSelected_page, user }) {
    function handleLogout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
        console.log("log outtttt.");
    }

    return (
        <div className="side-bar">
            <div className="top-section">
                <div className="avatar">
                    <div className="avatar-icon">
                        <AccountCircleOutlinedIcon fontSize="large" />
                    </div>
                    {user}
                </div>

                <ul>
                    <li>
                        <div
                            onClick={() => setSelected_page("library")}
                            className={
                                selected_page === "library"
                                    ? "bar-item bar-item-selected"
                                    : "bar-item bar-item-hover"
                            }
                        >
                            <LocalLibrary className="icon" />
                            Library
                        </div>
                    </li>

                    <li>
                        <div
                            onClick={() => setSelected_page("visitor")}
                            className={
                                selected_page === "visitor"
                                    ? "bar-item bar-item-selected"
                                    : "bar-item bar-item-hover"
                            }
                        >
                            <PersonIcon className="icon" />
                            Visitors
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => setSelected_page("settings")}
                            className={
                                selected_page === "settings"
                                    ? "bar-item bar-item-selected"
                                    : "bar-item bar-item-hover"
                            }
                        >
                            <SettingsIcon className="icon" />
                            Settings
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => setSelected_page("add-visitor")}
                            className={
                                selected_page === "add-visitor"
                                    ? "bar-item bar-item-selected"
                                    : "bar-item bar-item-hover"
                            }
                        >
                            <PersonAddAltIcon className="icon" />
                            Add Visitor
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => setSelected_page("scan")}
                            className={
                                selected_page === "scan"
                                    ? "bar-item bar-item-selected"
                                    : "bar-item bar-item-hover"
                            }
                        >
                            <QrCodeScannerIcon className="icon" />
                            Scan
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bottom-section">
                <ul>
                    <li>
                        <div
                            onClick={handleLogout}
                            className="bar-item bar-item-hover end"
                        >
                            <LogoutIcon />
                            Logout
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
