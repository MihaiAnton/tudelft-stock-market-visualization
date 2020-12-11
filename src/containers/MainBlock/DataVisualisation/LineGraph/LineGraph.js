import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";

import classes from "./LineGraph.module.css";

//import stock_price from "../data/stock_price";
import stock_price from "../data/stock_price.json";
class LineGraph extends Component {
  state={
    data:stock_price,
    selectedLegend:[]
  }
  
  render() {
    return (
      <div className={classes.LineGraph}>
        <ResponsiveLine
          data={this.state.data[this.props.stock]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          //xScale={{ type: "point" }}
          xScale={{ format: "%Y-%m-%d", type: "time" }}
          xFormat="time:%Y-%m-%d"
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
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 0,
          }}
          axisBottom={{
            tickValues: "every 1 year",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            format: "%Y",
            legend: "",
            legendOffset: 36,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          colors={["black", "red", "green"]}
          lineWidth={2}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          areaBlendMode="exclusion"
          areaBaselineValue={30}
          areaOpacity={0.25}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 110,
              translateY: -10,
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
              onClick: (node, event) => {
                let temp_stockData = JSON.parse(JSON.stringify(stock_price));
                if(this.state.selectedLegend.findIndex(item => item === node.id) === -1){
                  this.state.selectedLegend.push(node.id)
                }
                else{
                  this.state.selectedLegend.splice(this.state.selectedLegend.findIndex(item => item === node.id),1);
                }
                if(this.state.selectedLegend.length !== 0){
                  temp_stockData[this.props.stock].filter(data=>this.state.selectedLegend.findIndex(item => item === data.id) ===-1)
                                .forEach(price=>{price.data.splice(0,price.data.length-1);})
                }
                this.setState({data:temp_stockData});
              }
            },
          ]}
        />
      </div>
    );
  }
}

export default LineGraph;
