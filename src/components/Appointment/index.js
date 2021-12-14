// Imports ::
import React, { useState } from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Status from "./Status";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Confirm from "./Confirm";

// Appointment component ::
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  // Built Hook ::
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  const [currentStudent, setCurrentStudent] = useState("");
  const [currentInterviewer, setCurrentInterviewer] = useState({});

  /////////////////   Functions ::    ///////////////////////////
  // Save function ::
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id || interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }

  // Delete function ::
  function cancel() {
    transition(DELETE);
    cancelInterview(id).then(() => {
      setCurrentStudent("");
      setCurrentInterviewer({});
      transition(EMPTY);
    });
  }

  // Edit function ::
  function edit(student, interviewer) {
    transition(EDIT);
    setCurrentStudent(student);
    setCurrentInterviewer(interviewer);
  }

  // Return :::::::::::::::::::::::::::::::::::::::::::::::::::
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={cancel}
          onCancel={back}
          message="Are you sure you want to delete?"
        />
      )}
      {(mode === CREATE || mode === EDIT) && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={currentStudent}
          interviewer={currentInterviewer}
        />
      )}
    </article>
  );
}
