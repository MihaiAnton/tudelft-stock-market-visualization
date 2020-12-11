import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";

import classes from "./LineGraph.module.css";

import stock_price from "../data/stock_price";

class LineGraph extends Component {
  render() {
    return (
      <div
        style={{ height: this.props.height || 600 }}
        className={classes.LineGraph}
      >
        <ResponsiveLine
          data={this.props.data || stock_price[this.props.stock]}
          margin={{ top: 50, right: 60, bottom: 20, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={{
            orient: "right",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 0,
          }}
          axisBottom={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={!this.props.hasOwnProperty("removeGridY")}
          colors={["black", "red", "green"]}
          lineWidth={2}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          // areaBlendMode="exclusion"
          // areaBaselineValue={30}
          // areaOpacity={0.25}
          enableArea={this.props.enableArea}
          useMesh={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 150,
              translateY: 16,
              itemsSpacing: 20,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  }
}

export default LineGraph;
