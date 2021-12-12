import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "./Appointment";

import { getAppointmentsForDay } from "../helpers/selectors";

import { getInterviewersForDay } from "../helpers/selectors";

import { getInterview } from "../helpers/selectors";

// Application Component ::
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      Promise.resolve(all[0]); // first
      Promise.resolve(all[1]); // second
      Promise.resolve(all[2]); // third

      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log(days, appointments, interviewers);
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // mistake?! - do I need to delete this part now?
  // const parsedApps = dailyAppointments.map((appointment) => {
  //   return <Appointment key={appointment.id} {...appointment} />;
  // });

  /////////////////   >>>>>>>>>>>>>>>    ///////////////////////////////////////////

  // mistake?! - suppose to use getInterviewersForDay or not?!
  const interviewers = getInterviewersForDay(state, state.day);
  const parseInterviewers = interviewers.map((int) => {
    return int
  })

  console.log("+++++++++222222222++++++++++++", parseInterviewers);


  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={parseInterviewers}
      />
    );
  });

  /////////////////  <<<<<<<<<<<<<<     ///////////////////////////////////////////

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

      {/* mistake?! */}
      <section className="schedule">{schedule}</section>
    </main>
  );
}
