import React from "react";
import classes from "./ChoiceBox.module.css";

const ChoiceBox = (props) => {
  var choices = [];
  for (let i in props.choices) {
    if (props.choices[i].value === props.active) {
      choices.push(
        <p
          className={classes.Selected}
          onClick={() => props.onClick(props.choices[i].value)}
        >
          {props.choices[i].display}
        </p>
      );
    } else {
      choices.push(
        <p onClick={() => props.onClick(props.choices[i].value)}>
          {props.choices[i].display}
        </p>
      );
    }
  }

  return <div className={classes.ChoiceBox}>{choices}</div>;
};

export default ChoiceBox;
