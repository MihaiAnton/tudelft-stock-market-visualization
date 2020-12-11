import React, { Component } from "react";
import classes from "./CandleStick.module.css";
import { tsv } from "d3-request";
import { timeParse } from "d3-time-format";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

import Chart from "./Chart";
import { timeout } from "d3";

const DATA_SOURCE = "./projects/stockmarketvis/companies_detailed/";

const parseDate = timeParse("%Y-%m-%d");

const spinnercss = css`
  display: block;
  margin: auto;
  margin-left 280px;
  margin-top: 100px;
`;

class CandleStick extends Component {
  state = { data: null };

  componentDidMount() {
    console.log("Rendering", this.props);
    tsv(DATA_SOURCE + this.props.ticker + ".tsv", (data) => {
      for (let i in data) {
        data[i].date = parseDate(data[i].date);
      }
      this.setState({ data });

      return data;
    });
  }

  render() {
    if (this.state.data == null) {
      return (
        <div className={classes.Loading}>
          <BarLoader
            css={spinnercss}
            size={40}
            width={200}
            color={"#123abc"}
            loading={true}
          />
        </div>
      );
    }
    return (
      <div className={classes.CandleStick}>
        <Chart width={800} type={"svg"} data={this.state.data} />
      </div>
    );
  }
}

export default CandleStick;
