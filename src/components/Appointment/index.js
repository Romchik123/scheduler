// Imports ::
import React from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Status from "./Status";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

// Appointment component ::
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;

  // Built Hook ::
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Function ::
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }

  // Return :::::::::::::::::::::::::::::::::::::::::::::::::::
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
    </article>
  );
}
