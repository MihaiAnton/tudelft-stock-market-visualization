import React from "react";
import classes from "./StateCard.module.css";
import { ResponsivePie } from "@nivo/pie";

const StateCard = (props) => {
  let theme = {
    fontSize: 16,
  };

  let _data = [];
  for (let k in props.data) {
    _data.push({ id: k, label: k, value: props.data[k] });
  }

  console.log(props);

  return (
    <div
      className={classes.StateCard}
      onClick={() => {
        props.onCloseClick();
      }}
    >
      <h4>{props.state} | Industry Distribution</h4>

      <ResponsivePie
        data={_data}
        margin={{ top: 40, right: 40, bottom: 80, left: 300 }}
        sortByValue={true}
        innerRadius={0.5}
        enableRadialLabels={false}
        padAngle={1}
        cornerRadius={6}
        colors={{ scheme: "paired" }}
        borderColor="#ffffff"
        radialLabelsTextXOffset={16}
        radialLabelsTextColor="#rgb(255, 255, 255)"
        radialLabelsLinkOffset={5}
        radialLabelsLinkDiagonalLength={18}
        theme={theme}
        radialLabelsLinkHorizontalLength={12}
        radialLabelsLinkStrokeWidth={5}
        radialLabelsLinkColor="#ffffff"
        sliceLabelsTextColor="#000000"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "left",
            direction: "column",
            justify: false,
            translateX: -300,
            translateY: -20,
            itemsSpacing: 3,
            itemWidth: 34,
            itemHeight: 24,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 17,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default StateCard;
