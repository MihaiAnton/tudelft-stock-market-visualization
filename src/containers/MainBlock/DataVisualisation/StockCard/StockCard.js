import React from "react";

import classes from "./StockCard.module.css";

const StockCard = (props) => (
  <div className={classes.StockCard}>
    <h4 style={{ color: props.color }}>{props.stock}</h4>
    <p>Name: {props.data.name}</p>
    <p>Sector: {props.data.sector}</p>
    <p>Industry: {props.data.industry}</p>
    <p>Headquarters: {props.data.hq}</p>
    <p>First added: {props.data.first_added}</p>
    <p>Founded: {props.data.founded}</p>
    {props.no_graph ? <p>No graph available.</p> : null}
  </div>
);

export default StockCard;
