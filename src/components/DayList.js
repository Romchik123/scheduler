import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const parsedDayListItem = days.map((iterator) => {
    return (
      <DayListItem
        key={iterator.id}
        {...iterator}
        selected={iterator.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul>{parsedDayListItem}</ul>;
}
