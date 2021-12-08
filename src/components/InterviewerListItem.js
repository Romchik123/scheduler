import React from "react"; //optional

import "components/InterviewerListItem.scss";

function InterviewerListItem(props) {
  const {id, name, avatar, selected, setInterviewer} = props

  return (
    <li className="interviewers__item" onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}

export default InterviewerListItem;
