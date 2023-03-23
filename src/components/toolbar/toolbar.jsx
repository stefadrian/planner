import PropTypes from "prop-types";
import React, { Component } from "react";
import { MdUndo } from "react-icons/md";
import * as SharedStyle from "../../shared-style";
import If from "../../utils/react-if";
import ToolbarButton from "./toolbar-button";

const ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px",
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => {
  return (
    <If key={ind} condition={el.condition} style={{ position: "relative" }}>
      {el.dom}
    </If>
  );
};

export default class Toolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.state.mode !== nextProps.state.mode ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width ||
      this.props.state.alterate !== nextProps.state.alterate
    );
  }

  render() {
    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: { projectActions, viewer3DActions, translator },
    } = this;

    let mode = state.get("mode");
    let alterate = state.get("alterate");
    let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

    let sorter = [
      // {
      //   index: 1,
      //   condition: allowProjectFileSupport,
      //   dom: <ToolbarSaveButton state={state} />,
      // },
      // {
      //   index: 2,
      //   condition: allowProjectFileSupport,
      //   dom: <ToolbarLoadButton state={state} />,
      // },
      {
        index: 7,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip={translator.t("Undo (CTRL-Z)")}
            onClick={(event) => projectActions.undo()}
          >
            <MdUndo />
          </ToolbarButton>
        ),
      },
    ];

    // sorter = sorter.concat(
    //   toolbarButtons.map((Component, key) => {
    //     return Component.prototype //if is a react component
    //       ? {
    //           condition: true,
    //           dom: React.createElement(Component, { mode, state, key }),
    //         }
    //       : {
    //           //else is a sortable toolbar button
    //           index: Component.index,
    //           condition: Component.condition,
    //           dom: React.createElement(Component.dom, { mode, state, key }),
    //         };
    //   })
    // );

    return (
      <aside
        style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }}
        className="toolbar"
      >
        {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
      </aside>
    );
  }
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array,
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
