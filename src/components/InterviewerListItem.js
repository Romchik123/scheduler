import React from "react"; //optional

import "components/InterviewerListItem.scss";

import classNames from "classnames";

function InterviewerListItem(props) {
  // Props ::
  const { name, avatar, selected, setInterviewer } = props;

  // classNames ::
  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected === true,
  });

  // Return :: ///////////////////////
  return (
    <li className={InterviewerListItemClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;
