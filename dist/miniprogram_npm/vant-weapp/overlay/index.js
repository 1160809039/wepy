'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClick: function onClick() {
      this.$emit('click');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwic2hvdyIsIkJvb2xlYW4iLCJtYXNrIiwiY3VzdG9tU3R5bGUiLCJTdHJpbmciLCJ6SW5kZXgiLCJ0eXBlIiwiTnVtYmVyIiwidmFsdWUiLCJtZXRob2RzIiwib25DbGljayIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLG9CQUFPO0FBQ0xBLFNBQU87QUFDTEMsVUFBTUMsT0FERDtBQUVMQyxVQUFNRCxPQUZEO0FBR0xFLGlCQUFhQyxNQUhSO0FBSUxDLFlBQVE7QUFDTkMsWUFBTUMsTUFEQTtBQUVOQyxhQUFPO0FBRkQ7QUFKSCxHQURGOztBQVdMQyxXQUFTO0FBQ1BDLFdBRE8scUJBQ0c7QUFDUixXQUFLQyxLQUFMLENBQVcsT0FBWDtBQUNEO0FBSE07QUFYSixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5cbmNyZWF0ZSh7XG4gIHByb3BzOiB7XG4gICAgc2hvdzogQm9vbGVhbixcbiAgICBtYXNrOiBCb29sZWFuLFxuICAgIGN1c3RvbVN0eWxlOiBTdHJpbmcsXG4gICAgekluZGV4OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25DbGljaygpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJyk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==