import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
