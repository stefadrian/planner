import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdSettings, MdUndo, MdDirectionsRun } from "react-icons/md";
import { FaWindows, FaDoorOpen, FaPallet, FaPlus } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import ToolbarSaveButton from "./toolbar-save-button";
import ToolbarLoadButton from "./toolbar-load-button";
import If from "../../utils/react-if";
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
} from "../../constants";
import * as SharedStyle from "../../shared-style";

const iconTextStyle = {
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px",
  userSelect: "none",
};

const Icon2D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>2D</p>;
const Icon3D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>3D</p>;

const ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px",
};

const TOP_STYLE = {
  //backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px",
  width: "100%",
  display: 'flex'
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
      props: { state, width, height, toolbarButtons, allowProjectFileSupport, toolbarProps },
      context: { projectActions, holesActions, linesActions, itemsActions, viewer3DActions, translator },
    } = this;

    let mode = state.get("mode");
    let alterate = state.get("alterate");
    let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

    let sorter = [
      /*{
        index: 0,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip={"Add Wall"}
            onClick={(event) => {
              projectActions.pushLastSelectedCatalogElementToHistory({ name: 'wall' });
              linesActions.selectToolDrawingLine('wall');
            }}
          >
            <FaPallet />
          </ToolbarButton>
        ),
      },
      {
        index: 1,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip={"Add Door"}
            onClick={(event) => {
              holesActions.selectToolDrawingHole('door');
              projectActions.pushLastSelectedCatalogElementToHistory({ name: 'door' });
            }}
          >
            <FaDoorOpen />
          </ToolbarButton>
        ),
      },
      {
        index: 2,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip={"Add Window"}
            onClick={(event) => {
              holesActions.selectToolDrawingHole('window');
              projectActions.pushLastSelectedCatalogElementToHistory({ name: 'window' });
            }}
          >
            <FaWindows />
          </ToolbarButton>
        ),
      },*/
      // {
      //   index: 19,
      //   condition: true,
      //   dom: (
      //     <ToolbarButton
      //       active={[MODE_VIEWING_CATALOG].includes(mode)}
      //       tooltip={translator.t("Open catalog")}
      //       onClick={(event) => projectActions.openCatalog()}
      //     >
      //       <FaPlus />
      //     </ToolbarButton>
      //   ),
      // },
      {
        index: 20,
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
      // {
      //   index: 0,
      //   condition: allowProjectFileSupport,
      //   dom: (
      //     <ToolbarButton
      //       active={false}
      //       tooltip={translator.t("New project")}
      //       onClick={(event) =>
      //         confirm(translator.t("Would you want to start a new Project?"))
      //           ? projectActions.newProject()
      //           : null
      //       }
      //     >
      //       <FaFile />
      //     </ToolbarButton>
      //   ),
      // },
      // {
      //   index: 1,
      //   condition: allowProjectFileSupport,
      //   dom: (
      //     <ToolbarSaveButton
      //       state={state}
      //       onSaveAction={this.props.onSaveAction}
      //     />
      //   ),
      // },
      // {
      //   index: 2,
      //   condition: allowProjectFileSupport,
      //   dom: <ToolbarLoadButton state={state} />,
      // },
      // {
      //   index: 3,
      //   condition: true,
      //   dom: (
      //     <ToolbarButton
      //       active={[MODE_VIEWING_CATALOG].includes(mode)}
      //       tooltip={translator.t("Open catalog")}
      //       onClick={(event) => projectActions.openCatalog()}
      //     >
      //       <FaPlus />
      //     </ToolbarButton>
      //   ),
      // },
      // {
      //   index: 4,
      //   condition: true,
      //   dom: (
      //     <ToolbarButton
      //       active={[MODE_3D_VIEW].includes(mode)}
      //       tooltip={translator.t("3D View")}
      //       onClick={(event) => viewer3DActions.selectTool3DView()}
      //     >
      //       <Icon3D />
      //     </ToolbarButton>
      //   ),
      // },
      // {
      //   index: 5,
      //   condition: true,
      //   dom: (
      //     <ToolbarButton
      //       active={[MODE_IDLE].includes(mode)}
      //       tooltip={translator.t("2D View")}
      //       onClick={(event) => projectActions.setMode(MODE_IDLE)}
      //     >
      //       {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? (
      //         <Icon2D style={{ color: alterateColor }} />
      //       ) : (
      //         <FaMousePointer style={{ color: alterateColor }} />
      //       )}
      //     </ToolbarButton>
      //   ),
      // },
      // {
      //   index: 6, condition: true, dom: <ToolbarButton
      //     active={[MODE_3D_FIRST_PERSON].includes(mode)}
      //     tooltip={translator.t('3D First Person')}
      //     onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
      //     <MdDirectionsRun />
      //   </ToolbarButton>
      // },
      // {
      //   index: 8,
      //   condition: true,
      //   dom: (
      //     <ToolbarButton
      //       active={[MODE_CONFIGURING_PROJECT].includes(mode)}
      //       tooltip={translator.t("Configure project")}
      //       onClick={(event) => projectActions.openProjectConfigurator()}
      //     >
      //       <MdSettings />
      //     </ToolbarButton>
      //   ),
      // },
    ];

    let style = toolbarProps.orientation === 'horizontal' ? TOP_STYLE : ASIDE_STYLE;
    let addSorter = []

    let index = 0;
    toolbarProps.buttons.map(element => {
      addSorter.push(
        {
          index: index,
          condition: element.condition,
          dom: (
            <ToolbarButton
              active={false}
              tooltip={element.tooltip}
              onClick={() => element.onClickEvent(projectActions, itemsActions, linesActions, holesActions)}
            >
              {element.iconData}
            </ToolbarButton>
          ),
        }
      )
      index++;
    })

    let finalSorter = addSorter.concat(sorter)

    return (
      <aside
        style={{ ...style, maxWidth: width, maxHeight: height }}
        className="toolbar"
      >
        {finalSorter.sort(sortButtonsCb).map(mapButtonsCb)}
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
