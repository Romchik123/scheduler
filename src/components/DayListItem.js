import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (params) => {
    let result = "";

    if (params === 0) {
      result = `no spots remaining`;
    } else if (params === 1) {
      result = "1 spot remaining";
    } 
    else if (params === 2) {
      result = "2 spots remaining";
    } else {
      result = `${params} spots remaining`;
    }
    return result;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
