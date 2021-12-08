import React from "react"; //optional

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewerListItem = interviewers.map((iterator) => {
    return (
      <InterviewerListItem
        key={iterator.id}
        {...iterator}
        selected={iterator.id === value}
        setInterviewer={() => onChange(iterator.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerListItem}</ul>
    </section>
  );
}

export default InterviewerList;
