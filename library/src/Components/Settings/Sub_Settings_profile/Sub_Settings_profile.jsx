import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SubSettingsProfile({
    handle_profile_changes,
    name,
    setName,
    last_name,
    setLast_name,
    email,
    setEmail,
    profChange,
    isProfLoaded,
}) {
    return (
        <div>
            <h3 className="sub-heading">Profile</h3>
            <div className="name-container">
                <div className="input-feild-settings">
                    <TextField
                        className="input-feild-settings"
                        id="standard-basic"
                        label="First Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="input-feild-settings">
                    <TextField
                        className="input-feild-settings"
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        value={last_name}
                        onChange={(e) => {
                            setLast_name(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div>
                <div className="input-feild-settings">
                    <TextField
                        className="input-feild-settings"
                        id="standard-basic"
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="button-wrapper">
                <div
                    className={
                        isProfLoaded && profChange
                            ? "save-btn"
                            : "save-btn height-zero"
                    }
                >
                    <Button
                        onClick={() => {
                            handle_profile_changes();
                        }}
                        className="save-changes-btn"
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SubSettingsProfile;
