import React, { useState } from "react";
import axios from "axios";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./style.css";
import { useEffect } from "react";
import { Popover } from "antd";

// import { FlagFilled } from "@ant-design/icons";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const MapChart = () => {
    const [records, setRecords] = useState([]);
    const [table, setTable] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: "get",
                url: `${process.env.REACT_APP_URL}/api/getRecords`
            });
            const json = await response.data;
            console.log(json);
            let list = json.map((res) => [
                res.x,
                res.y,
                res.temprature,
                res.personalInfo,
                res.ID
            ]);
            let listM = [];
            listM = list.map((l) => l);

            console.log(listM);
            setRecords(list);
            setFlag(true);

            return json;
        };
        fetchData().catch(console.error);
        setTable(getTable());
    }, [flag]);
    function getTable() {
        let markers = records.map((record, i) => (
            <>
                <Popover
                    content={
                        <div>
                            <p>Temprature: {record[2]}</p>
                            <p>Personal Info:{record[3]}</p>
                        </div>
                    }
                    title={"ID:" + record[4]}
                >
                    <Marker
                        k={i}
                        style={{ "font-size": "10px" }}
                        coordinates={[record[0], record[1]]}
                        fill="#777"
                    >
                        <circle
                            r={1}
                            fill={`rgb(${
                                record[2] > 37
                                    ? Math.min(((record[2] - 37) * 255) / 2, 255)
                                    : Math.min((37 - record[2]) * 255, 255)
                            },${
                                record[2] > 37
                                    ? Math.min(((41 - record[2]) * 255) / 2, 255)
                                    : Math.min(((record[2] - 35) * 255) / 2, 255)
                            },0)`}
                            stroke="#fff"
                            strokeWidth={0.2}
                        />
                    </Marker>
                </Popover>
            </>
        ));

        return markers;
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/addRecord">Covid Map</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/info">Edit Info</Nav.Link>
                            <Nav.Link href="/addRecord">addRecord</Nav.Link>
                            <Nav.Link href="/map">Map</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="signin">
                <ComposableMap
                    className="signin"
                    projection="geoAlbers"
                    projectionConfig={{
                        scale: 150
                    }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#DDD"
                                    stroke="#FFF"
                                />
                            ))
                        }
                    </Geographies>
                    {table}
                </ComposableMap>
            </div>
        </>
    );
};

export default MapChart;
// `rgb(${((record[2] - 37 + 1) * 255) / 10},${
//     ((40 - record[2]) * 255) / 6
// }, 0)`
