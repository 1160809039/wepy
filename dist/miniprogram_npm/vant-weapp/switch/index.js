'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  field: true,

  classes: ['node-class'],

  props: {
    loading: Boolean,
    disabled: Boolean,
    checked: {
      type: Boolean,
      observer: function observer(value) {
        this.setData({ value: value });
      }
    },
    size: {
      type: String,
      value: '30px'
    }
  },

  attached: function attached() {
    this.setData({ value: this.data.checked });
  },


  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        var checked = !this.data.checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwibG9hZGluZyIsIkJvb2xlYW4iLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJ0eXBlIiwib2JzZXJ2ZXIiLCJ2YWx1ZSIsInNldERhdGEiLCJzaXplIiwiU3RyaW5nIiwiYXR0YWNoZWQiLCJkYXRhIiwibWV0aG9kcyIsIm9uQ2xpY2siLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxTQUFPLElBREY7O0FBR0xDLFdBQVMsQ0FBQyxZQUFELENBSEo7O0FBS0xDLFNBQU87QUFDTEMsYUFBU0MsT0FESjtBQUVMQyxjQUFVRCxPQUZMO0FBR0xFLGFBQVM7QUFDUEMsWUFBTUgsT0FEQztBQUVQSSxjQUZPLG9CQUVFQyxLQUZGLEVBRVM7QUFDZCxhQUFLQyxPQUFMLENBQWEsRUFBRUQsWUFBRixFQUFiO0FBQ0Q7QUFKTSxLQUhKO0FBU0xFLFVBQU07QUFDSkosWUFBTUssTUFERjtBQUVKSCxhQUFPO0FBRkg7QUFURCxHQUxGOztBQW9CTEksVUFwQkssc0JBb0JNO0FBQ1QsU0FBS0gsT0FBTCxDQUFhLEVBQUVELE9BQU8sS0FBS0ssSUFBTCxDQUFVUixPQUFuQixFQUFiO0FBQ0QsR0F0Qkk7OztBQXdCTFMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1IsVUFBSSxDQUFDLEtBQUtGLElBQUwsQ0FBVVQsUUFBWCxJQUF1QixDQUFDLEtBQUtTLElBQUwsQ0FBVVgsT0FBdEMsRUFBK0M7QUFDN0MsWUFBTUcsVUFBVSxDQUFDLEtBQUtRLElBQUwsQ0FBVVIsT0FBM0I7QUFDQSxhQUFLVyxLQUFMLENBQVcsT0FBWCxFQUFvQlgsT0FBcEI7QUFDQSxhQUFLVyxLQUFMLENBQVcsUUFBWCxFQUFxQlgsT0FBckI7QUFDRDtBQUNGO0FBUE07QUF4QkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBmaWVsZDogdHJ1ZSxcblxuICBjbGFzc2VzOiBbJ25vZGUtY2xhc3MnXSxcblxuICBwcm9wczoge1xuICAgIGxvYWRpbmc6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIG9ic2VydmVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IHZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICczMHB4J1xuICAgIH1cbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyB2YWx1ZTogdGhpcy5kYXRhLmNoZWNrZWQgfSk7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICBpZiAoIXRoaXMuZGF0YS5kaXNhYmxlZCAmJiAhdGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9ICF0aGlzLmRhdGEuY2hlY2tlZDtcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCBjaGVja2VkKTtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgY2hlY2tlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdfQ==