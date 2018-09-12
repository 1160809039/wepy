module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188045, function(require, module, exports) {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _crossSpawn = require('cross-spawn');

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _variable = require('./variable');

var _variable2 = _interopRequireDefault(_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = crossEnv;

var envSetterRegex = /(\w+)=('(.*)'|"(.*)"|(.*))/;

function crossEnv(args) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _parseCommand = parseCommand(args),
      _parseCommand2 = _slicedToArray(_parseCommand, 3),
      envSetters = _parseCommand2[0],
      command = _parseCommand2[1],
      commandArgs = _parseCommand2[2];

  var env = getEnvVars(envSetters);
  if (command) {
    var proc = (0, _crossSpawn.spawn)(
    // run `path.normalize` for command(on windows)
    (0, _command2.default)(command, env, true),
    // by default normalize is `false`, so not run for cmd args
    commandArgs.map(function (arg) {
      return (0, _command2.default)(arg, env);
    }), {
      stdio: 'inherit',
      shell: options.shell,
      env
    });
    process.on('SIGTERM', function () {
      return proc.kill('SIGTERM');
    });
    process.on('SIGINT', function () {
      return proc.kill('SIGINT');
    });
    process.on('SIGBREAK', function () {
      return proc.kill('SIGBREAK');
    });
    process.on('SIGHUP', function () {
      return proc.kill('SIGHUP');
    });
    proc.on('exit', function (code, signal) {
      var crossEnvExitCode = code;
      // exit code could be null when OS kills the process(out of memory, etc) or due to node handling it
      // but if the signal is SIGINT the user exited the process so we want exit code 0
      if (crossEnvExitCode === null) {
        crossEnvExitCode = signal === 'SIGINT' ? 0 : 1;
      }
      process.exit(crossEnvExitCode); //eslint-disable-line no-process-exit
    });
    return proc;
  }
  return null;
}

function parseCommand(args) {
  var envSetters = {};
  var command = null;
  var commandArgs = [];
  for (var i = 0; i < args.length; i++) {
    var match = envSetterRegex.exec(args[i]);
    if (match) {
      var value = void 0;

      if (typeof match[3] !== 'undefined') {
        value = match[3];
      } else if (typeof match[4] === 'undefined') {
        value = match[5];
      } else {
        value = match[4];
      }

      envSetters[match[1]] = value;
    } else {
      // No more env setters, the rest of the line must be the command and args
      var cStart = [];
      cStart = args.slice(i)
      // Regex:
      // match "\'" or "'"
      // or match "\" if followed by [$"\] (lookahead)
      .map(function (a) {
        var re = /\\\\|(\\)?'|([\\])(?=[$"\\])/g;
        // Eliminate all matches except for "\'" => "'"
        return a.replace(re, function (m) {
          if (m === '\\\\') return '\\';
          if (m === "\\'") return "'";
          return '';
        });
      });
      command = cStart[0];
      commandArgs = cStart.slice(1);
      break;
    }
  }

  return [envSetters, command, commandArgs];
}

function getEnvVars(envSetters) {
  var envVars = Object.assign({}, process.env);
  if (process.env.APPDATA) {
    envVars.APPDATA = process.env.APPDATA;
  }
  Object.keys(envSetters).forEach(function (varName) {
    envVars[varName] = (0, _variable2.default)(envSetters[varName], varName);
  });
  return envVars;
}
}, function(modId) {var map = {"./command":1536577188046,"./variable":1536577188047}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188046, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isWindows = require('is-windows');

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = commandConvert;

/**
 * Converts an environment variable usage to be appropriate for the current OS
 * @param {String} command Command to convert
 * @param {Object} env Map of the current environment variable names and their values
 * @param {boolean} normalize If the command should be normalized using `path`
 * after converting
 * @returns {String} Converted command
 */

function commandConvert(command, env) {
  var normalize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!(0, _isWindows2.default)()) {
    return command;
  }
  var envUnixRegex = /\$(\w+)|\${(\w+)}/g; // $my_var or ${my_var}
  var convertedCmd = command.replace(envUnixRegex, function (match, $1, $2) {
    var varName = $1 || $2;
    // In Windows, non-existent variables are not replaced by the shell,
    // so for example "echo %FOO%" will literally print the string "%FOO%", as
    // opposed to printing an empty string in UNIX. See kentcdodds/cross-env#145
    // If the env variable isn't defined at runtime, just strip it from the command entirely
    return env[varName] ? `%${varName}%` : '';
  });
  // Normalization is required for commands with relative paths
  // For example, `./cmd.bat`. See kentcdodds/cross-env#127
  // However, it should not be done for command arguments.
  // See https://github.com/kentcdodds/cross-env/pull/130#issuecomment-319887970
  return normalize === true ? _path2.default.normalize(convertedCmd) : convertedCmd;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188047, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = varValueConvert;

var _isWindows = require('is-windows');

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathLikeEnvVarWhitelist = new Set(['PATH', 'NODE_PATH']);

/**
 * This will transform UNIX-style list values to Windows-style.
 * For example, the value of the $PATH variable "/usr/bin:/usr/local/bin:."
 * will become "/usr/bin;/usr/local/bin;." on Windows.
 * @param {String} varValue Original value of the env variable
 * @param {String} varName Original name of the env variable
 * @returns {String} Converted value
 */
function replaceListDelimiters(varValue) {
  var varName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var targetSeparator = (0, _isWindows2.default)() ? ';' : ':';
  if (!pathLikeEnvVarWhitelist.has(varName)) {
    return varValue;
  }

  return varValue.replace(/(\\*):/g, function (match, backslashes) {
    if (backslashes.length % 2) {
      // Odd number of backslashes preceding it means it's escaped,
      // remove 1 backslash and return the rest as-is
      return match.substr(1);
    }
    return backslashes + targetSeparator;
  });
}

/**
 * This will attempt to resolve the value of any env variables that are inside
 * this string. For example, it will transform this:
 * cross-env FOO=$NODE_ENV BAR=\\$NODE_ENV echo $FOO $BAR
 * Into this:
 * FOO=development BAR=$NODE_ENV echo $FOO
 * (Or whatever value the variable NODE_ENV has)
 * Note that this function is only called with the right-side portion of the
 * env var assignment, so in that example, this function would transform
 * the string "$NODE_ENV" into "development"
 * @param {String} varValue Original value of the env variable
 * @returns {String} Converted value
 */
function resolveEnvVars(varValue) {
  var envUnixRegex = /(\\*)(\$(\w+)|\${(\w+)})/g; // $my_var or ${my_var} or \$my_var
  return varValue.replace(envUnixRegex, function (_, escapeChars, varNameWithDollarSign, varName, altVarName) {
    // do not replace things preceded by a odd number of \
    if (escapeChars.length % 2 === 1) {
      return varNameWithDollarSign;
    }
    return escapeChars.substr(0, escapeChars.length / 2) + (process.env[varName || altVarName] || '');
  });
}

/**
 * Converts an environment variable value to be appropriate for the current OS.
 * @param {String} originalValue Original value of the env variable
 * @param {String} originalName Original name of the env variable
 * @returns {String} Converted value
 */
function varValueConvert(originalValue, originalName) {
  return resolveEnvVars(replaceListDelimiters(originalValue, originalName));
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188045);
})()
//# sourceMappingURL=index.js.map