// Imports ::
import React from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Status from "./Status";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Confirm from "./Confirm";

import Error from "./Error";

export default function Appointment(props) {
  // Props ::
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  // Modes ::
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  /////////////////   Functions ::    ///////////////////////////
  // Save function ::
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id || interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  // Delete function ::
  function cancel() {
    transition(DELETE, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  // Edit function ::
  function edit() {
    transition(EDIT);
  }

  // Return :: /////////////////////////////////
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => {
            transition(SHOW, true);
          }}
          message="Could not cancel the appointment"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message="Could not save the appointment" />
      )}
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
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
    </article>
  );
}
