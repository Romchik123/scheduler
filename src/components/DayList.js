import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // Props ::
  const { days, value, onChange } = props;

  // Map function ::
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
