'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./../common/utils.js');

var defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast'
};

var queue = [];
var currentOptions = _extends({}, defaultOptions);

function parseOptions(message) {
  return (0, _utils.isObj)(message) ? message : { message: message };
}

function Toast() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = _extends({}, currentOptions, parseOptions(options));

  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];

  var toast = ctx.selectComponent(options.selector);
  delete options.selector;

  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
      queue = queue.filter(function (item) {
        return item !== toast;
      });
    }, options.duration);
  }

  return toast;
};

var createMethod = function createMethod(type) {
  return function (options) {
    return Toast(_extends({
      type: type }, parseOptions(options)));
  };
};

['loading', 'success', 'fail'].forEach(function (method) {
  Toast[method] = createMethod(method);
});

Toast.clear = function (all) {
  queue.forEach(function (toast) {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = function (options) {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = function () {
  currentOptions = _extends({}, defaultOptions);
};

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRPcHRpb25zIiwidHlwZSIsIm1hc2siLCJtZXNzYWdlIiwic2hvdyIsImR1cmF0aW9uIiwicG9zaXRpb24iLCJmb3JiaWRDbGljayIsImxvYWRpbmdUeXBlIiwic2VsZWN0b3IiLCJxdWV1ZSIsImN1cnJlbnRPcHRpb25zIiwicGFyc2VPcHRpb25zIiwiVG9hc3QiLCJvcHRpb25zIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdHgiLCJsZW5ndGgiLCJ0b2FzdCIsInNlbGVjdENvbXBvbmVudCIsInB1c2giLCJzZXREYXRhIiwiY2xlYXJUaW1lb3V0IiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXIiLCJmaWx0ZXIiLCJpdGVtIiwiY3JlYXRlTWV0aG9kIiwiZm9yRWFjaCIsIm1ldGhvZCIsInNldERlZmF1bHRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwicmVzZXREZWZhdWx0T3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxpQkFBaUI7QUFDckJDLFFBQU0sTUFEZTtBQUVyQkMsUUFBTSxLQUZlO0FBR3JCQyxXQUFTLEVBSFk7QUFJckJDLFFBQU0sSUFKZTtBQUtyQkMsWUFBVSxJQUxXO0FBTXJCQyxZQUFVLFFBTlc7QUFPckJDLGVBQWEsS0FQUTtBQVFyQkMsZUFBYSxVQVJRO0FBU3JCQyxZQUFVO0FBVFcsQ0FBdkI7O0FBWUEsSUFBSUMsUUFBUSxFQUFaO0FBQ0EsSUFBSUMsOEJBQXNCWCxjQUF0QixDQUFKOztBQUVBLFNBQVNZLFlBQVQsQ0FBc0JULE9BQXRCLEVBQStCO0FBQzdCLFNBQU8sa0JBQU1BLE9BQU4sSUFBaUJBLE9BQWpCLEdBQTJCLEVBQUVBLGdCQUFGLEVBQWxDO0FBQ0Q7O0FBRUQsU0FBU1UsS0FBVCxHQUE2QjtBQUFBLE1BQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDM0JBLHlCQUNLSCxjQURMLEVBRUtDLGFBQWFFLE9BQWIsQ0FGTDs7QUFLQSxNQUFNQyxRQUFRQyxpQkFBZDtBQUNBLE1BQU1DLE1BQU1GLE1BQU1BLE1BQU1HLE1BQU4sR0FBZSxDQUFyQixDQUFaOztBQUVBLE1BQU1DLFFBQVFGLElBQUlHLGVBQUosQ0FBb0JOLFFBQVFMLFFBQTVCLENBQWQ7QUFDQSxTQUFPSyxRQUFRTCxRQUFmOztBQUVBQyxRQUFNVyxJQUFOLENBQVdGLEtBQVg7QUFDQUEsUUFBTUcsT0FBTixDQUFjUixPQUFkO0FBQ0FTLGVBQWFKLE1BQU1LLEtBQW5COztBQUVBLE1BQUlWLFFBQVFULFFBQVIsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJjLFVBQU1LLEtBQU4sR0FBY0MsV0FBVyxZQUFNO0FBQzdCTixZQUFNTyxLQUFOO0FBQ0FoQixjQUFRQSxNQUFNaUIsTUFBTixDQUFhO0FBQUEsZUFBUUMsU0FBU1QsS0FBakI7QUFBQSxPQUFiLENBQVI7QUFDRCxLQUhhLEVBR1hMLFFBQVFULFFBSEcsQ0FBZDtBQUlEOztBQUVELFNBQU9jLEtBQVA7QUFDRDs7QUFFRCxJQUFNVSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUFRO0FBQUEsV0FBV2hCO0FBQ3RDWixnQkFEc0MsSUFDN0JXLGFBQWFFLE9BQWIsQ0FENkIsRUFBWDtBQUFBLEdBQVI7QUFBQSxDQUFyQjs7QUFJQSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLE1BQXZCLEVBQStCZ0IsT0FBL0IsQ0FBdUMsa0JBQVU7QUFDL0NqQixRQUFNa0IsTUFBTixJQUFnQkYsYUFBYUUsTUFBYixDQUFoQjtBQUNELENBRkQ7O0FBSUFsQixNQUFNYSxLQUFOLEdBQWMsZUFBTztBQUNuQmhCLFFBQU1vQixPQUFOLENBQWMsaUJBQVM7QUFDckJYLFVBQU1PLEtBQU47QUFDRCxHQUZEO0FBR0FoQixVQUFRLEVBQVI7QUFDRCxDQUxEOztBQU9BRyxNQUFNbUIsaUJBQU4sR0FBMEIsbUJBQVc7QUFDbkNDLFNBQU9DLE1BQVAsQ0FBY3ZCLGNBQWQsRUFBOEJHLE9BQTlCO0FBQ0QsQ0FGRDs7QUFJQUQsTUFBTXNCLG1CQUFOLEdBQTRCLFlBQU07QUFDaEN4QixnQ0FBc0JYLGNBQXRCO0FBQ0QsQ0FGRDs7a0JBSWVhLEsiLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc09iaiB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICB0eXBlOiAndGV4dCcsXG4gIG1hc2s6IGZhbHNlLFxuICBtZXNzYWdlOiAnJyxcbiAgc2hvdzogdHJ1ZSxcbiAgZHVyYXRpb246IDMwMDAsXG4gIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgZm9yYmlkQ2xpY2s6IGZhbHNlLFxuICBsb2FkaW5nVHlwZTogJ2NpcmN1bGFyJyxcbiAgc2VsZWN0b3I6ICcjdmFuLXRvYXN0J1xufTtcblxubGV0IHF1ZXVlID0gW107XG5sZXQgY3VycmVudE9wdGlvbnMgPSB7IC4uLmRlZmF1bHRPcHRpb25zIH07XG5cbmZ1bmN0aW9uIHBhcnNlT3B0aW9ucyhtZXNzYWdlKSB7XG4gIHJldHVybiBpc09iaihtZXNzYWdlKSA/IG1lc3NhZ2UgOiB7IG1lc3NhZ2UgfTtcbn1cblxuZnVuY3Rpb24gVG9hc3Qob3B0aW9ucyA9IHt9KSB7XG4gIG9wdGlvbnMgPSB7XG4gICAgLi4uY3VycmVudE9wdGlvbnMsXG4gICAgLi4ucGFyc2VPcHRpb25zKG9wdGlvbnMpXG4gIH07XG5cbiAgY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgY29uc3QgY3R4ID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XG5cbiAgY29uc3QgdG9hc3QgPSBjdHguc2VsZWN0Q29tcG9uZW50KG9wdGlvbnMuc2VsZWN0b3IpO1xuICBkZWxldGUgb3B0aW9ucy5zZWxlY3RvcjtcblxuICBxdWV1ZS5wdXNoKHRvYXN0KTtcbiAgdG9hc3Quc2V0RGF0YShvcHRpb25zKTtcbiAgY2xlYXJUaW1lb3V0KHRvYXN0LnRpbWVyKTtcblxuICBpZiAob3B0aW9ucy5kdXJhdGlvbiA+IDApIHtcbiAgICB0b2FzdC50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdG9hc3QuY2xlYXIoKTtcbiAgICAgIHF1ZXVlID0gcXVldWUuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdG9hc3QpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIHRvYXN0O1xufTtcblxuY29uc3QgY3JlYXRlTWV0aG9kID0gdHlwZSA9PiBvcHRpb25zID0+IFRvYXN0KHtcbiAgdHlwZSwgLi4ucGFyc2VPcHRpb25zKG9wdGlvbnMpXG59KTtcblxuWydsb2FkaW5nJywgJ3N1Y2Nlc3MnLCAnZmFpbCddLmZvckVhY2gobWV0aG9kID0+IHtcbiAgVG9hc3RbbWV0aG9kXSA9IGNyZWF0ZU1ldGhvZChtZXRob2QpO1xufSk7XG5cblRvYXN0LmNsZWFyID0gYWxsID0+IHtcbiAgcXVldWUuZm9yRWFjaCh0b2FzdCA9PiB7XG4gICAgdG9hc3QuY2xlYXIoKTtcbiAgfSk7XG4gIHF1ZXVlID0gW107XG59O1xuXG5Ub2FzdC5zZXREZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnMgPT4ge1xuICBPYmplY3QuYXNzaWduKGN1cnJlbnRPcHRpb25zLCBvcHRpb25zKTtcbn07XG5cblRvYXN0LnJlc2V0RGVmYXVsdE9wdGlvbnMgPSAoKSA9PiB7XG4gIGN1cnJlbnRPcHRpb25zID0geyAuLi5kZWZhdWx0T3B0aW9ucyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9hc3Q7XG4iXX0=