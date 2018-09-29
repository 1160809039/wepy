'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    text: String,
    color: {
      type: String,
      value: '#fff'
    },
    backgroundColor: {
      type: String,
      value: '#e64340'
    },
    duration: {
      type: Number,
      value: 3000
    }
  },

  methods: {
    show: function show() {
      var _this = this;

      var duration = this.data.duration;


      clearTimeout(this.timer);
      this.setData({
        show: true
      });

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      clearTimeout(this.timer);
      this.setData({
        show: false
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwidGV4dCIsIlN0cmluZyIsImNvbG9yIiwidHlwZSIsInZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJtZXRob2RzIiwic2hvdyIsImRhdGEiLCJjbGVhclRpbWVvdXQiLCJ0aW1lciIsInNldERhdGEiLCJJbmZpbml0eSIsInNldFRpbWVvdXQiLCJoaWRlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLG9CQUFPO0FBQ0xBLFNBQU87QUFDTEMsVUFBTUMsTUFERDtBQUVMQyxXQUFPO0FBQ0xDLFlBQU1GLE1BREQ7QUFFTEcsYUFBTztBQUZGLEtBRkY7QUFNTEMscUJBQWlCO0FBQ2ZGLFlBQU1GLE1BRFM7QUFFZkcsYUFBTztBQUZRLEtBTlo7QUFVTEUsY0FBVTtBQUNSSCxZQUFNSSxNQURFO0FBRVJILGFBQU87QUFGQztBQVZMLEdBREY7O0FBaUJMSSxXQUFTO0FBQ1BDLFFBRE8sa0JBQ0E7QUFBQTs7QUFBQSxVQUNHSCxRQURILEdBQ2dCLEtBQUtJLElBRHJCLENBQ0dKLFFBREg7OztBQUdMSyxtQkFBYSxLQUFLQyxLQUFsQjtBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYSixjQUFNO0FBREssT0FBYjs7QUFJQSxVQUFJSCxXQUFXLENBQVgsSUFBZ0JBLGFBQWFRLFFBQWpDLEVBQTJDO0FBQ3pDLGFBQUtGLEtBQUwsR0FBYUcsV0FBVyxZQUFNO0FBQzVCLGdCQUFLQyxJQUFMO0FBQ0QsU0FGWSxFQUVWVixRQUZVLENBQWI7QUFHRDtBQUNGLEtBZE07QUFnQlBVLFFBaEJPLGtCQWdCQTtBQUNMTCxtQkFBYSxLQUFLQyxLQUFsQjtBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYSixjQUFNO0FBREssT0FBYjtBQUdEO0FBckJNO0FBakJKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgcHJvcHM6IHtcbiAgICB0ZXh0OiBTdHJpbmcsXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnI2ZmZidcbiAgICB9LFxuICAgIGJhY2tncm91bmRDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjZTY0MzQwJ1xuICAgIH0sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAzMDAwXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzaG93KCkge1xuICAgICAgY29uc3QgeyBkdXJhdGlvbiB9ID0gdGhpcy5kYXRhO1xuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzaG93OiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKGR1cmF0aW9uID4gMCAmJiBkdXJhdGlvbiAhPT0gSW5maW5pdHkpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhpZGUoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==