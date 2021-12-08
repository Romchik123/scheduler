import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDayListItem = days.map((iterator) => {
    return (
      <DayListItem
        key={iterator.id}
        {...iterator}
        selected={iterator.name === day}
        setDay={setDay}
      />
    );
  });

  return <ul>{parsedDayListItem}</ul>;
}
