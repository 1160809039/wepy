'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  methods: {
    onClick: function onClick() {
      this.$emit('click');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaW5mbyIsIm5hbWUiLCJTdHJpbmciLCJzaXplIiwiY29sb3IiLCJjbGFzc1ByZWZpeCIsInR5cGUiLCJ2YWx1ZSIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiJGVtaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTztBQUNMQyxVQUFNLElBREQ7QUFFTEMsVUFBTUMsTUFGRDtBQUdMQyxVQUFNRCxNQUhEO0FBSUxFLFdBQU9GLE1BSkY7QUFLTEcsaUJBQWE7QUFDWEMsWUFBTUosTUFESztBQUVYSyxhQUFPO0FBRkk7QUFMUixHQURGOztBQVlMQyxXQUFTO0FBQ1BDLFdBRE8scUJBQ0c7QUFDUixXQUFLQyxLQUFMLENBQVcsT0FBWDtBQUNEO0FBSE07QUFaSixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5cbmNyZWF0ZSh7XG4gIHByb3BzOiB7XG4gICAgaW5mbzogbnVsbCxcbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgc2l6ZTogU3RyaW5nLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgY2xhc3NQcmVmaXg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAndmFuLWljb24nXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNsaWNrKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKTtcbiAgICB9XG4gIH1cbn0pO1xuIl19