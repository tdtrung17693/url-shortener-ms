/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpErrors = __webpack_require__(/*! http-errors */ "http-errors");

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = __webpack_require__(/*! express */ "express");

var _express2 = _interopRequireDefault(_express);

var _api = __webpack_require__(/*! ./routes/api */ "./src/routes/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this._app = (0, _express2.default)();
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      this.middlewareConfig();
      this.routerConfig();
      this.errorHandler();
    }
  }, {
    key: 'middlewareConfig',
    value: function middlewareConfig() {
      this._app.use(_express2.default.json());
      this._app.use(_express2.default.urlencoded({ extended: false }));
    }
  }, {
    key: 'routerConfig',
    value: function routerConfig() {
      this._app.use('/api', _api2.default);

      this._app.use('/', function (req, res) {
        res.send('Hallo da draußen!');
      });
    }
  }, {
    key: 'errorHandler',
    value: function errorHandler() {
      this._app.use(function (req, res, next) {
        next((0, _httpErrors2.default)(404));
      });

      this._app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      this._app.set(key, value);
    }
  }, {
    key: 'expressApp',
    get: function get() {
      return this._app;
    }
  }], [{
    key: 'createApp',
    value: function createApp() {
      var app = new App();
      app.init();

      return app;
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),

/***/ "./src/appInstance.js":
/*!****************************!*\
  !*** ./src/appInstance.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = __webpack_require__(/*! ./App */ "./src/App.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _App2.default.createApp();
app.init();

exports.default = app;

/***/ }),

/***/ "./src/routes/api.js":
/*!***************************!*\
  !*** ./src/routes/api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(/*! express */ "express");

var router = (0, _express.Router)();

function constructMessage() {
  var original_url = '';
  var short_url = '';

  return {
    original_url: original_url, short_url: short_url
  };
}

router.get('/', function (req, res) {
  res.send('FCC Project - URL Shortener');
});

router.post('/shorturl/new', function (req, res) {
  res.json(constructMessage());
});

exports.default = router;

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(/*! http */ "http");

var _http2 = _interopRequireDefault(_http);

var _debug = __webpack_require__(/*! debug */ "debug");

var _debug2 = _interopRequireDefault(_debug);

var _appInstance = __webpack_require__(/*! ./appInstance */ "./src/appInstance.js");

var _appInstance2 = _interopRequireDefault(_appInstance);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_appInstance2.default.expressApp);
var port = (0, _utils.normalizePort)(process.env.PORT || '3000');
var debug = (0, _debug2.default)('request-header-parser-microservice:server');

_appInstance2.default.set('port', port);
server.listen(port);
server.on('error', (0, _utils.generateOnError)(port));
server.on('listening', (0, _utils.generateOnListening)(debug, server.address()));

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePort = normalizePort;
exports.generateOnError = generateOnError;
exports.generateOnListening = generateOnListening;
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function generateOnError(port) {
  return function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

/**
 * Event listener for HTTP server "listening" event.
 */
function generateOnListening(debug, addr) {
  return function () {
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  };
}

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ })

/******/ });
//# sourceMappingURL=backend.js.map