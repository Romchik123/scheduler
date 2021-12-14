import React from "react"; //optional

import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewerListItem = interviewers.map((iterator) => {
    return (
      <InterviewerListItem
        key={iterator.id}
        {...iterator}
        selected={iterator.id === (value && (value.id || value))}
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

// Prop Types Test ::
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
