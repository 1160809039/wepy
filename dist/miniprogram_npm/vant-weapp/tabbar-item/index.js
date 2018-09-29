'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    info: null,
    icon: String,
    dot: Boolean
  },

  relations: {
    '../tabbar/index': {
      type: 'ancestor'
    }
  },

  data: {
    active: false,
    count: 0
  },

  methods: {
    onClick: function onClick() {
      var parent = this.getRelationNodes('../tabbar/index')[0];
      if (parent) {
        parent.onChange(this);
      }
      this.$emit('click');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaW5mbyIsImljb24iLCJTdHJpbmciLCJkb3QiLCJCb29sZWFuIiwicmVsYXRpb25zIiwidHlwZSIsImRhdGEiLCJhY3RpdmUiLCJjb3VudCIsIm1ldGhvZHMiLCJvbkNsaWNrIiwicGFyZW50IiwiZ2V0UmVsYXRpb25Ob2RlcyIsIm9uQ2hhbmdlIiwiJGVtaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTztBQUNMQyxVQUFNLElBREQ7QUFFTEMsVUFBTUMsTUFGRDtBQUdMQyxTQUFLQztBQUhBLEdBREY7O0FBT0xDLGFBQVc7QUFDVCx1QkFBbUI7QUFDakJDLFlBQU07QUFEVztBQURWLEdBUE47O0FBYUxDLFFBQU07QUFDSkMsWUFBUSxLQURKO0FBRUpDLFdBQU87QUFGSCxHQWJEOztBQWtCTEMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1IsVUFBTUMsU0FBUyxLQUFLQyxnQkFBTCxDQUFzQixpQkFBdEIsRUFBeUMsQ0FBekMsQ0FBZjtBQUNBLFVBQUlELE1BQUosRUFBWTtBQUNWQSxlQUFPRSxRQUFQLENBQWdCLElBQWhCO0FBQ0Q7QUFDRCxXQUFLQyxLQUFMLENBQVcsT0FBWDtBQUNEO0FBUE07QUFsQkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBwcm9wczoge1xuICAgIGluZm86IG51bGwsXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGRvdDogQm9vbGVhblxuICB9LFxuXG4gIHJlbGF0aW9uczoge1xuICAgICcuLi90YWJiYXIvaW5kZXgnOiB7XG4gICAgICB0eXBlOiAnYW5jZXN0b3InXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGNvdW50OiAwXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFJlbGF0aW9uTm9kZXMoJy4uL3RhYmJhci9pbmRleCcpWzBdO1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQub25DaGFuZ2UodGhpcyk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdjbGljaycpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=