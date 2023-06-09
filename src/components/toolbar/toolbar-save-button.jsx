import React from "react";
import PropTypes from "prop-types";
import { FaSave as IconSave } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import { browserDownload } from "../../utils/browser";
import { Project } from "../../class/export";

export default function ToolbarSaveButton(
  { state, onSaveAction },
  { translator }
) {
  //aici ceva nu e bine
  let saveProjectToFile = (e) => {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    if (onSaveAction) {
      onSaveAction(state.get("scene").toJS());
    } else browserDownload();
  };

  return (
    <ToolbarButton
      active={false}
      tooltip={translator.t("Save project")}
      onClick={saveProjectToFile}
    >
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
