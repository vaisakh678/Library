import React, { useState, useEffect } from "react";
import "./dashboard.css";
import SideBar from "../../Components/Side_bar/SideBar";
import Library from "../../Components/Library/Library";
import Settings from "../../Components/Settings/Settings";
import AddVisitor from "../../Components/AddVisitor/AddVisitor";
import Visitor from "../../Components/Visitor/Visitor";
import Scan from "../../Components/Scan/Scan";

function Dashboard() {
    const [selected_page, setSelected_page] = useState("");

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [qr_delay, setQr_delay] = useState("");
    const [smart_catching, setSmart_catching] = useState(false);
    const [darkTheme, setDarkTheme] = useState("");
    const [register_number, setRegister_number] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/login";
        }
        if (localStorage.getItem("sidebar-selected_page")) {
            setSelected_page(localStorage.getItem("sidebar-selected_page"));
        }
        fetch_user();
    }, []);

    // for caching the selected_page
    useEffect(() => {
        if (smart_catching) {
            localStorage.setItem("sidebar-selected_page", selected_page);
        } else {
            localStorage.setItem("sidebar-selected_page", "library");
        }
    }, [selected_page, smart_catching]);

    async function fetch_user() {
        const response = await fetch("http://localhost:3001/api/fetch-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ status: "ok" }),
        });

        const data = await response.json();
        if (data.status === "ok") {
            if (data.smart_catching) {
                setName(data.name);
                setLastname(data.lastname);
                setEmail(data.email);
                setQr_delay(data.qr_delay);
                setDarkTheme(data.darkTheme);
                setRegister_number(data.register_number);
                setType(data.type);
                setSmart_catching(true);
            }
            console.log(data);
            setName(data.name);
        }
    }

    return (
        <div className="dashboard">
            <SideBar
                selected_page={selected_page}
                setSelected_page={setSelected_page}
                user={name}
            />
            {selected_page === "library" && <Library />}
            {selected_page === "visitor" && <Visitor />}
            {selected_page === "settings" && (
                <Settings
                    _name={name}
                    _lastname={lastname}
                    _email={email}
                    _qr_delay={qr_delay}
                    _setSmart_catching={setSmart_catching}
                    _darkTheme={darkTheme}
                    _register_number={register_number}
                    _type={type}
                />
            )}
            {selected_page === "add-visitor" && <AddVisitor />}
            {selected_page === "scan" && (
                <Scan smart_catching={smart_catching} />
            )}
        </div>
    );
}

export default Dashboard;
