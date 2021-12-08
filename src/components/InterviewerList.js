import React from "react"; //optional

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewerListItem = interviewers.map((iterator) => {
    return (
      <InterviewerListItem
        key={iterator.id}
        {...iterator}
        selected={iterator.id === interviewer}
        setInterviewer={setInterviewer}
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
