"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require("react-icons/md");

var _fa = require("react-icons/fa");

var _toolbarButton = require("./toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _toolbarSaveButton = require("./toolbar-save-button");

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _toolbarLoadButton = require("./toolbar-load-button");

var _toolbarLoadButton2 = _interopRequireDefault(_toolbarLoadButton);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require("../../constants");

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconTextStyle = {
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px",
  userSelect: "none"
};

var Icon2D = function Icon2D(_ref) {
  var style = _ref.style;
  return _react2.default.createElement(
    "p",
    { style: _extends({}, iconTextStyle, style) },
    "2D"
  );
};
var Icon3D = function Icon3D(_ref2) {
  var style = _ref2.style;
  return _react2.default.createElement(
    "p",
    { style: _extends({}, iconTextStyle, style) },
    "3D"
  );
};

var ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px"
};

var TOP_STYLE = {
  //backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px",
  width: "100%",
  display: 'flex'
};

var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    { key: ind, condition: el.condition, style: { position: "relative" } },
    el.dom
  );
};

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props, context) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(Toolbar, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.state.mode !== nextProps.state.mode || this.props.height !== nextProps.height || this.props.width !== nextProps.width || this.props.state.alterate !== nextProps.state.alterate;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          toolbarButtons = _props.toolbarButtons,
          allowProjectFileSupport = _props.allowProjectFileSupport,
          toolbarProps = _props.toolbarProps,
          _context = this.context,
          projectActions = _context.projectActions,
          holesActions = _context.holesActions,
          linesActions = _context.linesActions,
          itemsActions = _context.itemsActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator;


      var mode = state.get("mode");
      var alterate = state.get("alterate");
      var alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

      var sorter = [
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
        dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: false,
            tooltip: translator.t("Undo (CTRL-Z)"),
            onClick: function onClick(event) {
              return projectActions.undo();
            }
          },
          _react2.default.createElement(_md.MdUndo, null)
        )
      }];

      var style = toolbarProps.orientation === 'horizontal' ? TOP_STYLE : ASIDE_STYLE;
      var addSorter = [];

      var index = 0;
      toolbarProps.buttons.map(function (element) {
        addSorter.push({
          index: index,
          condition: element.condition,
          dom: _react2.default.createElement(
            _toolbarButton2.default,
            {
              active: false,
              tooltip: element.tooltip,
              onClick: function onClick() {
                return element.onClickEvent(projectActions, itemsActions, linesActions, holesActions);
              }
            },
            element.iconData
          )
        });
        index++;
      });

      var finalSorter = addSorter.concat(sorter);

      return _react2.default.createElement(
        "aside",
        {
          style: _extends({}, style, { maxWidth: width, maxHeight: height }),
          className: "toolbar"
        },
        finalSorter.sort(sortButtonsCb).map(mapButtonsCb)
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;


Toolbar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Toolbar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};