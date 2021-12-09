import React from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time, interview } = props;

  // const appointment = () => {
  //   if (time) {
  //     return `Appointment at ${time}`;
  //   } else {
  //     return "No Appointments";
  //   }
  // };

  return (
    <article className="appointment">
      {/* {appointment()} */}
      <Header time={time} />
      {props.interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
