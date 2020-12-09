import React, { Component } from "react";
import { ResponsiveChoroplethCanvas } from "@nivo/geo";
import companies_by_state from "../data/companies_by_state";
import state_industry_distribution from "../data/state_industry_distribution";

import classes from "./Choropleth.module.css";
import us from "./us.js";
import StateCard from "./StateCard/StateCard";

class Choropleth extends Component {
  state = {
    popupOn: false,
    popupState: "",
    popupData: {},
  };

  showPopup() {
    if (this.state.popupOn === true) {
      return;
    }
    this.setState({
      popupOn: true,
    });
  }

  hidePopup() {
    if (this.state.popupOn === false) {
      return;
    }
    this.setState({
      popupOn: false,
    });
  }

  nodeClicked(node) {
    if (node.hasOwnProperty("value")) {
      let data = {};
      if (state_industry_distribution.hasOwnProperty(node.label)) {
        data = state_industry_distribution[node.label];
      }

      this.setState({ popupState: node.label, popupData: data }, () => {
        this.showPopup();
      });
    }
  }

  render() {
    return (
      <div className={classes.Choropleth}>
        {this.state.popupOn ? (
          <div onClick={() => this.hidePopup()} className={classes.Cover}></div>
        ) : null}
        {this.state.popupOn ? (
          <div className={classes.StateCard}>
            <StateCard
              onCloseClick={() => {
                this.hidePopup();
              }}
              data={this.state.popupData}
              state={this.state.popupState}
            />
          </div>
        ) : null}
        <div className={classes.ChoroplethCanvas}>
          <ResponsiveChoroplethCanvas
            data={companies_by_state}
            features={us.features}
            pixelRatio={4}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="YlGnBu"
            domain={[0, 80]}
            unknownColor="#F9F9F9"
            label="properties.NAME"
            projectionScale={940}
            valueFormat=".0s"
            projectionType="naturalEarth1"
            projectionTranslation={[1.5, 1.57]}
            projectionRotation={[35, 0, 0]}
            graticuleLineColor="rgba(255, 0, 0, .2)"
            borderWidth={0.4}
            borderColor="#808080"
            onClick={(node, event) => {
              this.nodeClicked(node);
            }}
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -50,
                itemsSpacing: 0,
                itemWidth: 92,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 18,
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Choropleth;
