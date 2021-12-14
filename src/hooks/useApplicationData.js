import { useState, useEffect } from "react";

import axios from "axios";

import { getAppointmentsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  // useState ::
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Bringing the data from API ::
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

  /////////////////    Functions ::     ///////////////////////////
  // bookInterview functions ::
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const newState = { ...state, appointments };
        const appointmentsSpots = getAppointmentsForDay(newState, state.day);
        let index = 0;
        for (const key in appointmentsSpots) {
          const value = appointmentsSpots[key].interview;
          if (value === null) {
            index++;
          }
        }
        newState.days = newState.days.map((day) => {
          if (state.day === day.name) {
            return { ...day, spots: index };
          }
          return day;
        });
        setState(newState);
      });
  };

  // cancelInterview functions ::
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const newState = { ...state, appointments };
      const appointmentsSpots = getAppointmentsForDay(newState, state.day);
      let index = 0;
      for (const key in appointmentsSpots) {
        const value = appointmentsSpots[key].interview;
        if (value === null) {
          index++;
        }
      }
      newState.days = newState.days.map((day) => {
        if (state.day === day.name) {
          return { ...day, spots: index };
        }
        return day;
      });
      setState(newState);
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
