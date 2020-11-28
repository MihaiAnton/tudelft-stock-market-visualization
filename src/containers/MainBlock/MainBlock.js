import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import classes from "./MainBlock.module.css";

import DataVisualisation from "./DataVisualisation/DataVisualisation";

class MainBlock extends Component {
  render() {
    return (
      <div className={classes.MainBlock}>
        <Switch>
          <Route path="/" exact component={DataVisualisation} />
        </Switch>
      </div>
    );
  }
}

export default MainBlock;
