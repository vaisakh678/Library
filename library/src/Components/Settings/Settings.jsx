import React, { useState, useEffect } from "react";
import "./settings.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import SubSettingsProfile from "./Sub_Settings_profile/Sub_Settings_profile";

function Settings({ _setSmart_catching }) {
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");

    const [qr_delay, setQr_delay] = useState(0);
    const [s_caching, setS_caching] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    const [initial_values, setInitial_values] = useState({});
    const [profChange, setProfChange] = useState(false);
    const [prefChange, setPrefChange] = useState(false);

    const [isProfLoaded, setIsProfLoaded] = useState(false);
    const [isPrefLoaded, setIsPrefLoaded] = useState(false);

    useEffect(() => {
        if (
            name === initial_values.name &&
            last_name === initial_values.last_name &&
            email === initial_values.email
        ) {
            setIsProfLoaded(true);
            setProfChange(false);
        } else {
            setProfChange(true);
        }
    }, [initial_values, name, last_name, email]);

    useEffect(() => {
        if (
            qr_delay === initial_values.qr_delay &&
            s_caching === initial_values.s_caching &&
            darkTheme === initial_values.darkTheme
        ) {
            setIsPrefLoaded(true);
            setPrefChange(false);
        } else {
            setPrefChange(true);
        }
    }, [initial_values, qr_delay, s_caching, darkTheme]);

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
            setLast_name(data.lastname);
            setEmail(data.email);
            setQr_delay(data.qr_delay);
            setS_caching(data.smart_catching);
            setDarkTheme(data.darkTheme);

            setInitial_values({
                name: data.name,
                last_name: data.lastname,
                email: data.email,
                qr_delay: data.qr_delay,
                s_caching: data.smart_catching,
                darkTheme: data.darkTheme,
            });
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function handle_profile_changes() {
        const response = await fetch(
            "http://localhost:3001/api/settings/profile-changes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name,
                    last_name,
                    email,
                }),
            }
        );

        const data = await response.json();
        if (data.status === "ok") {
            setProfChange(false);
            initial_values.name = name;
            initial_values.last_name = last_name;
            initial_values.email = email;
        }
        console.log(data);
    }

    async function handle_preferences_changes() {
        const response = await fetch(
            "http://localhost:3001/api/settings/preferences-changes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    qr_delay,
                    s_caching,
                    darkTheme,
                }),
            }
        );

        const data = await response.json();
        if (data.status === "ok") {
            setPrefChange(false);
            initial_values.qr_delay = qr_delay;
            initial_values.s_caching = s_caching;
            initial_values.darkTheme = darkTheme;
            _setSmart_catching(s_caching);
        }
        console.log(data);
    }

    return (
        <div className="settings">
            <h1 className="heading">Settings</h1>
            <div className="sub-setting-options">
                <SubSettingsProfile
                    handle_profile_changes={handle_profile_changes}
                    name={name}
                    setName={setName}
                    last_name={last_name}
                    setLast_name={setLast_name}
                    email={email}
                    setEmail={setEmail}
                    profChange={profChange}
                    isProfLoaded={isProfLoaded}
                />
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
                            setQr_delay(Number(e.target.value));
                        }}
                    />
                    <label htmlFor="xx" className="label">
                        This delay is for scanning the qr code, delay in second
                    </label>
                    <div className="toggle-op">
                        Smart caching{" "}
                        <Switch
                            checked={s_caching}
                            onClick={() => {
                                setS_caching(!s_caching);
                            }}
                        />
                        <br />
                        Dark theme{" "}
                        <Switch
                            checked={darkTheme}
                            onClick={() => {
                                setDarkTheme(!darkTheme);
                            }}
                        />
                    </div>
                    <div className="button-wrapper">
                        <div
                            className={
                                prefChange && isPrefLoaded
                                    ? "save-btn"
                                    : "save-btn height-zero"
                            }
                        >
                            <Button
                                className="save-changes-btn"
                                onClick={() => {
                                    handle_preferences_changes();
                                }}
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
