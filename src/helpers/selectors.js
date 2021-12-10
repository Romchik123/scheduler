export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((itr) => {
    return itr.name === day;
  });

  if (filteredDays.length === 0) {
    return filteredDays;
  }

  const apps = filteredDays[0].appointments;

  const newApp = apps.map((app) => {
    return state.appointments[app];
  });
  return newApp;
}
