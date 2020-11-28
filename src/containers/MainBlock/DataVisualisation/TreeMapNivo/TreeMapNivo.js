import React, { Component, rgbToHex } from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";

import classes from "./TreeMapNivo.module.css";

const colors = { 2017: "red", 2018: "red", 2019: "green" };
const getColor = (bar, maxValue) => {
  let ratio = bar.value / maxValue;
  let red = 10 * (1 - ratio);
  let blue = 200 * ratio;
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
          orientLabel={false}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          labelSkipSize={40}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
          parentLabelPosition="right"
          parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          colors={(bar) => getColor(bar, maxValue)}
          borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
          motionConfig={this.props.motion}
          onClick={(node, event) => {
            this.props.onStockClick(node.id);
          }}
        />
      </div>
    );
  }
}

export default TreeMapNivo;
