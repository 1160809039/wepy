'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var basic = exports.basic = Behavior({
  methods: {
    $emit: function $emit() {
      this.triggerEvent.apply(this, arguments);
    },
    getRect: function getRect(selector, all) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        wx.createSelectorQuery().in(_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          rect && resolve(rect);
        }).exec();
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2ljLmpzIl0sIm5hbWVzIjpbImJhc2ljIiwiQmVoYXZpb3IiLCJtZXRob2RzIiwiJGVtaXQiLCJ0cmlnZ2VyRXZlbnQiLCJhcHBseSIsImFyZ3VtZW50cyIsImdldFJlY3QiLCJzZWxlY3RvciIsImFsbCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJjcmVhdGVTZWxlY3RvclF1ZXJ5IiwiaW4iLCJib3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0IiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFNQSx3QkFBUUMsU0FBUztBQUM1QkMsV0FBUztBQUNQQyxTQURPLG1CQUNDO0FBQ04sV0FBS0MsWUFBTCxDQUFrQkMsS0FBbEIsQ0FBd0IsSUFBeEIsRUFBOEJDLFNBQTlCO0FBQ0QsS0FITTtBQUtQQyxXQUxPLG1CQUtDQyxRQUxELEVBS1dDLEdBTFgsRUFLZ0I7QUFBQTs7QUFDckIsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxXQUFHQyxtQkFBSCxHQUNHQyxFQURILENBQ00sS0FETixFQUNZTixNQUFNLFdBQU4sR0FBb0IsUUFEaEMsRUFDMENELFFBRDFDLEVBRUdRLGtCQUZILENBRXNCLGdCQUFRO0FBQzFCQyxrQkFBUU4sUUFBUU0sSUFBUixDQUFSO0FBQ0QsU0FKSCxFQUtHQyxJQUxIO0FBTUQsT0FQTSxDQUFQO0FBUUQ7QUFkTTtBQURtQixDQUFULENBQWQiLCJmaWxlIjoiYmFzaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYmFzaWMgPSBCZWhhdmlvcih7XG4gIG1ldGhvZHM6IHtcbiAgICAkZW1pdCgpIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIGdldFJlY3Qoc2VsZWN0b3IsIGFsbCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpXG4gICAgICAgICAgLmluKHRoaXMpW2FsbCA/ICdzZWxlY3RBbGwnIDogJ3NlbGVjdCddKHNlbGVjdG9yKVxuICAgICAgICAgIC5ib3VuZGluZ0NsaWVudFJlY3QocmVjdCA9PiB7XG4gICAgICAgICAgICByZWN0ICYmIHJlc29sdmUocmVjdCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXhlYygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==