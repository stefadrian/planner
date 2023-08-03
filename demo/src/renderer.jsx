import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import React, { Fragment } from "react";
import ContainerDimensions from "react-container-dimensions";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Models as PlannerModels, Plugins as PlannerPlugins, reducer as PlannerReducer, ReactPlanner } from "react-planner";

import MyCatalog from "./catalog/mycatalog";
import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";

//react-planner

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", (plannerState) =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let blackList =
  isProduction === true
    ? []
    : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info(
    "Environment is in development and these actions will be blacklisted",
    blackList
  );
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension
    ? window.devToolsExtension({
      features: {
        pause: true, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects
        persist: true, // persist states on page reloading
        export: true, // export history of actions in a file
        import: "custom", // import history of actions from a file
        jump: true, // jump back and forth (time travelling)
        skip: true, // skip (cancel) actions
        reorder: true, // drag and drop actions in the history list
        dispatch: true, // dispatch custom actions or action creators
        test: true, // generate tests for the selected actions
      },
      actionsBlacklist: blackList,
      maxAge: 999999,
    })
    : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];

//render
ReactDOM.render(
  <Provider store={store}>
    <ContainerDimensions>
      {({ width, height }) => (
        <div
          style={{
            // border: "5px solid red",
            marginTop: "15px",
            marginLeft: "15px",
            marginRight: "15px",
            borderRadius: "15px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactPlanner
            catalog={MyCatalog}
            width={1700}
            height={850}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => state.get("react-planner")}
            disableFooterBar={true}
            disableSideBar={false}
            disableToolBar={false}
            onSaveAction={undefined}
            toolbarProps={{
              orientation: "horizontal",
              buttons: [
                {
                  tooltip: 'Add Wall',
                  condition: true,
                  onClickEvent: (projectActions, itemsActions, linesActions, holesActions) => {
                    linesActions.selectToolDrawingLine('wall');
                  },
                  iconData: <Fragment><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 256h352c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H384v128l-64-32-64 32V0H144c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16zm480 128c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v64H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-48v-64h48zm-336 64H128v-64h160v64zm224 0H352v-64h160v64z"></path></svg></Fragment>
                },
                {
                  tooltip: 'Add Window',
                  condition: true,
                  onClickEvent: (projectActions, itemsActions, linesActions, holesActions) => {
                    projectActions.unselectAll()
                    projectActions.selectToolEdit()
                    holesActions.selectToolDrawingHole('window')
                  },
                  iconData: <Fragment><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"></path></svg></Fragment>
                },
                {
                  tooltip: 'Add Door',
                  condition: true,
                  onClickEvent: (projectActions, itemsActions, linesActions, holesActions) => {
                    projectActions.unselectAll()
                    projectActions.selectToolEdit()
                    holesActions.selectToolDrawingHole('door')
                  },
                  iconData: <Fragment><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z"></path></svg></Fragment>
                },
                {
                  tooltip: "Open Catalog",
                  condition: true,
                  onClickEvent: (projectActions, itemsActions, linesActions, holesActions) => {
                    projectActions.openCatalog()
                  },
                  iconData: (
                    <React.Fragment>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                      </svg>
                    </React.Fragment>
                  ),
                }
              ]
            }}
          />
        </div>
      )}
    </ContainerDimensions>
  </Provider>,
  document.getElementById("app")
);
