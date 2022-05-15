import React, { useEffect } from "react";
import "react-d3-calendar-heatmap/dist/react.d3.calendar.heatmap.css";
import CalendarHeatMap from "react-d3-calendar-heatmap";

function Heatmap({ data, year }) {
    const timeRange = {
        // from: new Date("2022-01-01"),
        // to: new Date("2022-12-31"),
        from: new Date(`${year}-01-01`),
        to: new Date(`${year}-12-31`),
    };

    // data = [
    //     { day: "2022-02-15", value: 209 },
    //     { day: "2022-02-16", value: 244 },
    // ];

    return (
        <div>
            <CalendarHeatMap
                weekday="weekend"
                cellSize={15}
                timeRange={timeRange}
                data={data}
                // data={fake_data}
                cellShape="square"
                tooltipOffsetX={200}
                tooltipOffsetY={-300}
            />
        </div>
    );
}

export default Heatmap;
