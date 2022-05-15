import React, { useState, useEffect } from "react";
import "./settings.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

function Settings() {
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [qr_delay, setQr_delay] = useState(0);
    const [s_caching, setS_caching] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    // profile hookz
    const [_name, _setName] = useState("");
    const [_last_name, _setLast_name] = useState("");
    const [_email, _setEmail] = useState("");
    const [isProChanged, setisProChanged] = useState(false);
    console.log({ isProChanged });
    useEffect(() => {
        if (_name === name && _last_name === last_name && _email === email) {
            setisProChanged(false);
        }
    }, [name, _name, last_name, _last_name, email, _email]);

    // pref hookz
    const [_qr_delay, _setQr_delay] = useState(0);
    const [_s_caching, _setS_caching] = useState(false);
    const [_darkTheme, _setDarkTheme] = useState(false);
    const [isPrefChanged, setisPrefChanged] = useState(false);
    console.log({ isPrefChanged });
    useEffect(() => {
        if (
            _qr_delay == qr_delay &&
            _s_caching === s_caching &&
            _darkTheme === darkTheme
        ) {
            setisPrefChanged(false);
        }
    }, [_qr_delay, qr_delay, _s_caching, s_caching, _darkTheme, darkTheme]);

    async function init() {
        const response = await fetch("http://localhost:3001/api/fetch-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ status: "ok" }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === "ok") {
            setName(data.name);
            _setName(data.name);
            setLast_name(data.lastname);
            _setLast_name(data.lastname);
            setEmail(data.email);
            _setEmail(data.email);
            setQr_delay(data.qr_delay);
            _setQr_delay(data.qr_delay);
            setS_caching(data.smart_catching);
            _setS_caching(data.smart_catching);
            setDarkTheme(data.darkTheme);
            _setDarkTheme(data.darkTheme);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="settings">
            <h1 className="heading">Settings</h1>
            <div className="profile sub-setting-options">
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
                                setisProChanged(true);
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
                                setisProChanged(true);
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
                                setisProChanged(true);
                            }}
                        />
                    </div>
                </div>
                <div className="button-wrapper">
                    <div
                        className={
                            isProChanged ? "save-btn" : "save-btn height-zero"
                        }
                    >
                        <Button
                            className="save-changes-btn"
                            variant="contained"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
            <div className="preferences">
                <h3 className="sub-heading sub-heading">Preferences</h3>
                <div className="pref-setting">
                    <TextField
                        className="input-feild input-delay-feild xx"
                        type="number"
                        id="xx"
                        InputProps={{
                            inputProps: {
                                max: 10,
                                min: 1,
                            },
                        }}
                        label="qr-code delay"
                        value={qr_delay}
                        size="small"
                        onChange={(e) => {
                            setQr_delay(e.target.value);
                            setisPrefChanged(true);
                        }}
                    />
                    <label htmlFor="xx" className="label">
                        This delay is for scanning the qr code, delay in second
                    </label>
                    <div className="toggle-op">
                        Smart caching{" "}
                        <Switch
                            // defaultChecked
                            // value={s_caching}
                            checked={s_caching}
                            onClick={() => {
                                setS_caching(!s_caching);
                                setisPrefChanged(true);
                            }}
                        />
                        <br />
                        Dark theme{" "}
                        <Switch
                            // defaultChecked
                            // value={darkTheme}
                            checked={darkTheme}
                            onClick={() => {
                                setDarkTheme(!darkTheme);
                                setisPrefChanged(true);
                            }}
                        />
                    </div>
                    <div className="button-wrapper">
                        <div
                            className={
                                isPrefChanged
                                    ? "save-btn"
                                    : "save-btn height-zero"
                            }
                        >
                            <Button
                                className="save-changes-btn"
                                variant="contained"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
