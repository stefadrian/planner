var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from 'immutable';
import actions from "./actions/export";
import Catalog from "./catalog/catalog";
import { Content, FooterBarComponents, SidebarComponents, ToolbarComponents } from "./components/export";
import Translator from "./translator/translator";
import { objectsMap } from "./utils/objects-utils";
import { VERSION } from "./version";

var Toolbar = ToolbarComponents.Toolbar;
var Sidebar = SidebarComponents.Sidebar;
var FooterBar = FooterBarComponents.FooterBar;


var sidebarW = 300;
var footerBarH = 20;

var wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap"
};

var wrapperStyleToolbarHorizontal = {
  flexFlow: "row wrap"
};

var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner(props) {
    _classCallCheck(this, ReactPlanner);

    var _this = _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).call(this, props));

    _this.state = {
      selected: false // Initialize selected in state
    };
    return _this;
  }

  _createClass(ReactPlanner, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      return _extends({}, objectsMap(actions, function (actionNamespace) {
        return _this2.props[actionNamespace];
      }), {
        translator: this.props.translator,
        catalog: this.props.catalog
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var store = this.context.store;
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins;

      plugins.forEach(function (plugin) {
        return plugin(store, stateExtractor);
      });
      projectActions.initCatalog(catalog);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;

      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(["catalog", "ready"]);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
      var extractedState = stateExtractor(state);
      var selectedLayer = extractedState.getIn(["scene", "selectedLayer"]);
      var selected = extractedState.getIn(["scene", "layers", selectedLayer, "selected"]) || Immutable.Map();
      this.updateSelected(!!selected.get("areas").size || !!selected.get("lines").size || !!selected.get("items").size || !!selected.get("vertices").size);
    }
  }, {
    key: "updateSelected",
    value: function updateSelected(newSelected, selected) {
      console.log("stef newSelected", newSelected);
      this.setState({ selected: newSelected });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          state = _props2.state,
          stateExtractor = _props2.stateExtractor,
          _props2$disableSideBa = _props2.disableSideBar,
          disableSideBar = _props2$disableSideBa === undefined ? false : _props2$disableSideBa,
          _props2$disableFooter = _props2.disableFooterBar,
          disableFooterBar = _props2$disableFooter === undefined ? false : _props2$disableFooter,
          _props2$disableToolBa = _props2.disableToolBar,
          disableToolBar = _props2$disableToolBa === undefined ? false : _props2$disableToolBa,
          _props2$toolbarProps = _props2.toolbarProps,
          toolbarProps = _props2$toolbarProps === undefined ? {
        orientation: "vertical"
      } : _props2$toolbarProps,
          props = _objectWithoutProperties(_props2, ["width", "height", "state", "stateExtractor", "disableSideBar", "disableFooterBar", "disableToolBar", "toolbarProps"]);

      var toolbarW = 50;
      var selected = this.state.selected;


      var contentW = width;
      if (!disableSideBar && selected) {
        contentW -= sidebarW;
      }

      var toolbarH = height;
      var contentH = height;
      var sidebarH = height;

      if (!disableFooterBar) {
        if (toolbarProps.orientation === "vertical") {
          toolbarH -= footerBarH;
        }
        contentH -= footerBarH;
        sidebarH -= footerBarH;
      }

      if (toolbarProps.orientation === "horizontal") {
        toolbarW = contentW;
        toolbarH = 70;
        if (!disableToolBar) {
          contentH -= toolbarH;
        }
      } else {
        if (!disableToolBar) {
          contentW -= toolbarW;
        }
      }

      var extractedState = stateExtractor(state);

      var wrapperCss = wrapperStyle;
      if (toolbarProps.orientation === "horizontal") {
        wrapperCss = _extends({}, wrapperStyle, wrapperStyleToolbarHorizontal);
      }

      return React.createElement(
        "div",
        { style: _extends({}, wrapperCss, { height: height }) },
        !disableToolBar && React.createElement(Toolbar, _extends({
          width: toolbarW,
          height: toolbarH,
          state: extractedState,
          toolbarProps: toolbarProps
        }, props)),
        React.createElement(Content, _extends({
          width: contentW,
          height: contentH,
          state: extractedState
        }, props, {
          onWheel: function onWheel(event) {
            return event.preventDefault();
          }
        })),
        !disableSideBar && selected && React.createElement(Sidebar, _extends({
          width: sidebarW,
          height: sidebarH,
          state: extractedState
        }, props)),
        !disableFooterBar && React.createElement(FooterBar, _extends({
          width: width,
          height: footerBarH,
          state: extractedState
        }, props))
      );
    }
  }]);

  return ReactPlanner;
}(Component);

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired
};

ReactPlanner.childContextTypes = _extends({}, objectsMap(actions, function () {
  return PropTypes.object;
}), {
  translator: PropTypes.object,
  catalog: PropTypes.object
});

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: "React-Planner " + VERSION,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, function (actionNamespace) {
    return bindActionCreators(actions[actionNamespace], dispatch);
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);