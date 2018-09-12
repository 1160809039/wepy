module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577188128, function(require, module, exports) {
'use strict';

var fs = require('fs');
var path = require('path');

var detector = require('./detector');

var handlers = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  handlers[type] = require('./types/' + type);
});

// Maximum buffer size, with a default of 128 kilobytes.
// TO-DO: make this adaptive based on the initial signature of the image
var MaxBufferSize = 128*1024;

function lookup (buffer, filepath) {
  // detect the file type.. don't rely on the extension
  var type = detector(buffer, filepath);

  // find an appropriate handler for this file type
  if (type in handlers) {
    var size = handlers[type].calculate(buffer, filepath);
    if (size !== false) {
      size.type = type;
      return size;
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type: ' + type + ' (file: ' + filepath + ')');
}

function asyncFileToBuffer (filepath, callback) {
  // open the file in read only mode
  fs.open(filepath, 'r', function (err, descriptor) {
    if (err) { return callback(err); }
    var size = fs.fstatSync(descriptor).size;
    if (size <= 0){return callback(new Error("File size is not greater than 0 —— " + filepath)); }
    var bufferSize = Math.min(size, MaxBufferSize);
    var buffer = new Buffer(bufferSize);
    // read first buffer block from the file, asynchronously
    fs.read(descriptor, buffer, 0, bufferSize, 0, function (err) {
      if (err) { return callback(err); }
      // close the file, we are done
      fs.close(descriptor, function (err) {
        callback(err, buffer);
      });
    });
  });
}

function syncFileToBuffer (filepath) {
  // read from the file, synchronously
  var descriptor = fs.openSync(filepath, 'r');
  var size = fs.fstatSync(descriptor).size;
  var bufferSize = Math.min(size, MaxBufferSize);
  var buffer = new Buffer(bufferSize);
  fs.readSync(descriptor, buffer, 0, bufferSize, 0);
  fs.closeSync(descriptor);
  return buffer;
}

/**
 * @params input - buffer or relative/absolute path of the image file
 * @params callback - optional function for async detection
 */
module.exports = function (input, callback) {

  // Handle buffer input
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }

  // input should be a string at this point
  if (typeof input !== 'string') {
    throw new TypeError('invalid invocation');
  }

  // resolve the file path
  var filepath = path.resolve(input);

  if (typeof callback === 'function') {
    asyncFileToBuffer(filepath, function (err, buffer) {
      if (err) { return callback(err); }

      // return the dimensions
      var dimensions;
      try {
        dimensions = lookup(buffer, filepath);
      } catch (e) {
        err = e;
      }
      callback(err, dimensions);
    });
  } else {
    var buffer = syncFileToBuffer(filepath);
    return lookup(buffer, filepath);
  }
};

module.exports.types = types;

}, function(modId) {var map = {"./detector":1536577188129}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577188129, function(require, module, exports) {
'use strict';

var typeMap = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  typeMap[type] = require('./types/' + type).detect;
});

module.exports = function (buffer, filepath) {
  var type, result;
  for (type in typeMap) {
    result = typeMap[type](buffer, filepath);
    if (result) {
      return type;
    }
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577188128);
})()
//# sourceMappingURL=index.js.map