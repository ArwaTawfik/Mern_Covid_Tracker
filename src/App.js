import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Signin from "./components/signin";
import AddRecord from "./components/AddRecord";
import Info from "./components/Info";
import MapChart from "./components/MapChart";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/map" element={<MapChart />}></Route>
                <Route path="/addRecord" element={<AddRecord />}></Route>
                <Route path="/info" element={<Info />}></Route>
                <Route path="/home" element={<Info />}></Route>
            </Routes>
        </Router>
    );
}
