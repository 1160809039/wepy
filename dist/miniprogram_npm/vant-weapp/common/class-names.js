'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.classNames = classNames;
var hasOwn = {}.hasOwnProperty;

function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLW5hbWVzLmpzIl0sIm5hbWVzIjpbImNsYXNzTmFtZXMiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzZXMiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJnIiwiYXJnVHlwZSIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJpbm5lciIsImFwcGx5Iiwia2V5IiwiY2FsbCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBRWdCQSxVLEdBQUFBLFU7QUFGaEIsSUFBTUMsU0FBUyxHQUFHQyxjQUFsQjs7QUFFTyxTQUFTRixVQUFULEdBQXNCO0FBQzNCLE1BQU1HLFVBQVUsRUFBaEI7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLFVBQVVDLE1BQTlCLEVBQXNDRixHQUF0QyxFQUEyQztBQUN6QyxRQUFNRyxNQUFNRixVQUFVRCxDQUFWLENBQVo7QUFDQSxRQUFJLENBQUNHLEdBQUwsRUFBVTs7QUFFVixRQUFNQyxpQkFBaUJELEdBQWpCLHlDQUFpQkEsR0FBakIsQ0FBTjs7QUFFQSxRQUFJQyxZQUFZLFFBQVosSUFBd0JBLFlBQVksUUFBeEMsRUFBa0Q7QUFDaERMLGNBQVFNLElBQVIsQ0FBYUYsR0FBYjtBQUNELEtBRkQsTUFFTyxJQUFJRyxNQUFNQyxPQUFOLENBQWNKLEdBQWQsS0FBc0JBLElBQUlELE1BQTlCLEVBQXNDO0FBQzNDLFVBQU1NLFFBQVFaLFdBQVdhLEtBQVgsQ0FBaUIsSUFBakIsRUFBdUJOLEdBQXZCLENBQWQ7QUFDQSxVQUFJSyxLQUFKLEVBQVc7QUFDVFQsZ0JBQVFNLElBQVIsQ0FBYUcsS0FBYjtBQUNEO0FBQ0YsS0FMTSxNQUtBLElBQUlKLFlBQVksUUFBaEIsRUFBMEI7QUFDL0IsV0FBSyxJQUFNTSxHQUFYLElBQWtCUCxHQUFsQixFQUF1QjtBQUNyQixZQUFJTixPQUFPYyxJQUFQLENBQVlSLEdBQVosRUFBaUJPLEdBQWpCLEtBQXlCUCxJQUFJTyxHQUFKLENBQTdCLEVBQXVDO0FBQ3JDWCxrQkFBUU0sSUFBUixDQUFhSyxHQUFiO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsU0FBT1gsUUFBUWEsSUFBUixDQUFhLEdBQWIsQ0FBUDtBQUNEIiwiZmlsZSI6ImNsYXNzLW5hbWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuICBjb25zdCBjbGFzc2VzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKCFhcmcpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cbiAgICBpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNsYXNzZXMucHVzaChhcmcpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChpbm5lcik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYXJnKSB7XG4gICAgICAgIGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbn07XG4iXX0=