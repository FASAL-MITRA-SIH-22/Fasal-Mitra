import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import INDIA_TOPO_JSON from "./india.topo.json";

// const INDIA_TOPO_JSON =
//   "https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json";
// const INDIA_TOPO_JSON =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";

const PROJECTION_CONFIG = {
  scale: 1350,
  center: [78.9629, 22.5937]
};

const DEFAULT_COLOR = "#EEE";
const COLORS = ['#1fff6b', '#37ed6f', '#4ace73', '#52ae76', '#539877', '#538e78', '#538578', '#527f78 ', '#517878', '#507178', '#4e6b78 ', '#4d6478', '#4b5e78', '#495777', '#464e77', '#414377', '#3b3876', '#332a75', '#291b74', '#180672']

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

function Map(props) {
  const { mapData } = props;
  const [tooltipContent, setTooltipContent] = useState("");

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.name}: ${current?.numberOfValue ?? "0"}`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={1000}
        height={1000}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = mapData.find((s) => s._id === geo.id);
              console.log((current? current.numberOfValue:'0') / 10)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? COLORS[parseInt((current? current.numberOfValue:'0') / 10)] : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default Map;
