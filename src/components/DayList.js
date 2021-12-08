import React from "react";

import DayListItem from "components/DayListItem";

// import classNames from "classnames";

// import "components/DayListItem.scss";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDayListItem = days.map((iterator) => {
    return (
      <DayListItem
        key={days.id}
        selected={iterator.name === day}
        {...iterator}
        setDay={setDay}
      />
    );
  });

  return <ul>{parsedDayListItem}</ul>;
}
