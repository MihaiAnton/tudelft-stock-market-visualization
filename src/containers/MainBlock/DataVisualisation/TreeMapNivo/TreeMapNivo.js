import React, { Component /*rgbToHex*/ } from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";
import classes from "./TreeMapNivo.module.css";
//import { max } from "d3";

//const colors = { 2017: "red", 2018: "red", 2019: "green" };
const castValue = (color) => {
  color = Math.floor(color);
  color = Math.min(color, 255);
  color = Math.max(color, 0);
  return color;
};

const getColor = (bar, maxValue) => {
  let ratio = bar.value / maxValue;
  let red = castValue(40 * (1 - ratio));
  let blue = castValue(240 * ratio);
  let green = 80;

  return "rgb(" + red + ", " + green + ", " + blue + ")";
};

class TreeMapNivo extends Component {
  render() {
    let maxValue = this.props.maxValue;

    return (
      <div className={classes.TreeMapNivo}>
        <ResponsiveTreeMap
          data={this.props.data}
          identity={this.props.identity}
          value={this.props.value}
          valueFormat=" >-.2s"
          tile="resquarify"
          leavesOnly={true}
          label="id"
          orientLabel={true}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          labelSkipSize={40}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
          parentLabelPosition="right"
          parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          colors={(bar) => getColor(bar, maxValue)}
          borderWidth={1}
          borderColor="white"
          // borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
          motionConfig={this.props.motion}
          onClick={(node, event) => {
            this.props.onStockClick(node.id, node.color);
          }}
        />
      </div>
    );
  }
}

export default TreeMapNivo;
