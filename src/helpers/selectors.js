// getAppointmentsForDay function ::
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




// getInterview function ::
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const newObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar,
    },
  };

  return newObj;
}




// getAppointmentsForDay function ::
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((itr) => {
    return itr.name === day;
  });

  if (filteredDays.length === 0) {
    return filteredDays;
  }

  const apps = filteredDays[0].interviewer;

  const newApp = apps.map((app) => {
    return state.interviewer[app];
  });
  return newApp;
}

