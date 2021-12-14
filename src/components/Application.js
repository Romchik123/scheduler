// Imports ::
import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "./Appointment";

import { getAppointmentsForDay } from "../helpers/selectors";

import { getInterviewersForDay } from "../helpers/selectors";

import { getInterview } from "../helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

// Application Component ::
export default function Application(props) {
  // Importing all the hooks ::
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // Map through getInterviewersForDay function - then...
  // Pass parseInterviewers to Appointment component ::
  const interviewers = getInterviewersForDay(state, state.day);
  const parseInterviewers = interviewers.map((int) => {
    return int;
  });

  // Map through getAppointmentsForDay function - then...
  // Pass interview to Appointment component ::
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={parseInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  /////////////////////////////////////////////////////////////////////////

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">{schedule}</section>
    </main>
  );
}
