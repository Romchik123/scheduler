import React from "react"; //optional

import "components/InterviewerListItem.scss";

import classNames from "classnames";

function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected === true,
  });

  return (
    <li className={InterviewerListItemClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;
