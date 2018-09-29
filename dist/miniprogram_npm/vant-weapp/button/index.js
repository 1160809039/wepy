'use strict';

var _create = require('./../common/create.js');

var _classNames = require('./../common/class-names.js');

var _button = require('./../mixins/button.js');

var booleanProp = {
  type: Boolean,
  observer: 'setClasses'
};

(0, _create.create)({
  mixins: [_button.button],

  props: {
    type: {
      type: String,
      value: 'default',
      observer: 'setClasses'
    },
    size: {
      type: String,
      value: 'normal',
      observer: 'setClasses'
    },
    plain: booleanProp,
    block: booleanProp,
    square: booleanProp,
    loading: booleanProp,
    disabled: booleanProp
  },

  attached: function attached() {
    this.setClasses();
  },


  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    },
    setClasses: function setClasses() {
      var _data = this.data,
          type = _data.type,
          size = _data.size,
          plain = _data.plain,
          disabled = _data.disabled,
          loading = _data.loading,
          square = _data.square,
          block = _data.block;

      this.setData({
        classes: (0, _classNames.classNames)('van-button--' + type, 'van-button--' + size, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--square': square,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--unclickable': disabled || loading
        })
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImJvb2xlYW5Qcm9wIiwidHlwZSIsIkJvb2xlYW4iLCJvYnNlcnZlciIsIm1peGlucyIsImJ1dHRvbiIsInByb3BzIiwiU3RyaW5nIiwidmFsdWUiLCJzaXplIiwicGxhaW4iLCJibG9jayIsInNxdWFyZSIsImxvYWRpbmciLCJkaXNhYmxlZCIsImF0dGFjaGVkIiwic2V0Q2xhc3NlcyIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiZGF0YSIsIiRlbWl0Iiwic2V0RGF0YSIsImNsYXNzZXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsY0FBYztBQUNsQkMsUUFBTUMsT0FEWTtBQUVsQkMsWUFBVTtBQUZRLENBQXBCOztBQUtBLG9CQUFPO0FBQ0xDLFVBQVEsQ0FBQ0MsY0FBRCxDQURIOztBQUdMQyxTQUFPO0FBQ0xMLFVBQU07QUFDSkEsWUFBTU0sTUFERjtBQUVKQyxhQUFPLFNBRkg7QUFHSkwsZ0JBQVU7QUFITixLQUREO0FBTUxNLFVBQU07QUFDSlIsWUFBTU0sTUFERjtBQUVKQyxhQUFPLFFBRkg7QUFHSkwsZ0JBQVU7QUFITixLQU5EO0FBV0xPLFdBQU9WLFdBWEY7QUFZTFcsV0FBT1gsV0FaRjtBQWFMWSxZQUFRWixXQWJIO0FBY0xhLGFBQVNiLFdBZEo7QUFlTGMsY0FBVWQ7QUFmTCxHQUhGOztBQXFCTGUsVUFyQkssc0JBcUJNO0FBQ1QsU0FBS0MsVUFBTDtBQUNELEdBdkJJOzs7QUF5QkxDLFdBQVM7QUFDUEMsV0FETyxxQkFDRztBQUNSLFVBQUksQ0FBQyxLQUFLQyxJQUFMLENBQVVMLFFBQVgsSUFBdUIsQ0FBQyxLQUFLSyxJQUFMLENBQVVOLE9BQXRDLEVBQStDO0FBQzdDLGFBQUtPLEtBQUwsQ0FBVyxPQUFYO0FBQ0Q7QUFDRixLQUxNO0FBT1BKLGNBUE8sd0JBT007QUFBQSxrQkFDcUQsS0FBS0csSUFEMUQ7QUFBQSxVQUNIbEIsSUFERyxTQUNIQSxJQURHO0FBQUEsVUFDR1EsSUFESCxTQUNHQSxJQURIO0FBQUEsVUFDU0MsS0FEVCxTQUNTQSxLQURUO0FBQUEsVUFDZ0JJLFFBRGhCLFNBQ2dCQSxRQURoQjtBQUFBLFVBQzBCRCxPQUQxQixTQUMwQkEsT0FEMUI7QUFBQSxVQUNtQ0QsTUFEbkMsU0FDbUNBLE1BRG5DO0FBQUEsVUFDMkNELEtBRDNDLFNBQzJDQSxLQUQzQzs7QUFFWCxXQUFLVSxPQUFMLENBQWE7QUFDWEMsaUJBQVMsNkNBQTBCckIsSUFBMUIsbUJBQWlEUSxJQUFqRCxFQUF5RDtBQUNoRSwrQkFBcUJFLEtBRDJDO0FBRWhFLCtCQUFxQkQsS0FGMkM7QUFHaEUsZ0NBQXNCRSxNQUgwQztBQUloRSxpQ0FBdUJDLE9BSnlDO0FBS2hFLGtDQUF3QkMsUUFMd0M7QUFNaEUscUNBQTJCQSxZQUFZRDtBQU55QixTQUF6RDtBQURFLE9BQWI7QUFVRDtBQW5CTTtBQXpCSixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSAnLi4vY29tbW9uL2NsYXNzLW5hbWVzJztcbmltcG9ydCB7IGJ1dHRvbiB9IGZyb20gJy4uL21peGlucy9idXR0b24nO1xuXG5jb25zdCBib29sZWFuUHJvcCA9IHtcbiAgdHlwZTogQm9vbGVhbixcbiAgb2JzZXJ2ZXI6ICdzZXRDbGFzc2VzJ1xufTtcblxuY3JlYXRlKHtcbiAgbWl4aW5zOiBbYnV0dG9uXSxcblxuICBwcm9wczoge1xuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnZGVmYXVsdCcsXG4gICAgICBvYnNlcnZlcjogJ3NldENsYXNzZXMnXG4gICAgfSxcbiAgICBzaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ25vcm1hbCcsXG4gICAgICBvYnNlcnZlcjogJ3NldENsYXNzZXMnXG4gICAgfSxcbiAgICBwbGFpbjogYm9vbGVhblByb3AsXG4gICAgYmxvY2s6IGJvb2xlYW5Qcm9wLFxuICAgIHNxdWFyZTogYm9vbGVhblByb3AsXG4gICAgbG9hZGluZzogYm9vbGVhblByb3AsXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW5Qcm9wXG4gIH0sXG5cbiAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICBpZiAoIXRoaXMuZGF0YS5kaXNhYmxlZCAmJiAhdGhpcy5kYXRhLmxvYWRpbmcpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0Q2xhc3NlcygpIHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgc2l6ZSwgcGxhaW4sIGRpc2FibGVkLCBsb2FkaW5nLCBzcXVhcmUsIGJsb2NrIH0gPSB0aGlzLmRhdGE7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjbGFzc2VzOiBjbGFzc05hbWVzKGB2YW4tYnV0dG9uLS0ke3R5cGV9YCwgYHZhbi1idXR0b24tLSR7c2l6ZX1gLCB7XG4gICAgICAgICAgJ3Zhbi1idXR0b24tLWJsb2NrJzogYmxvY2ssXG4gICAgICAgICAgJ3Zhbi1idXR0b24tLXBsYWluJzogcGxhaW4sXG4gICAgICAgICAgJ3Zhbi1idXR0b24tLXNxdWFyZSc6IHNxdWFyZSxcbiAgICAgICAgICAndmFuLWJ1dHRvbi0tbG9hZGluZyc6IGxvYWRpbmcsXG4gICAgICAgICAgJ3Zhbi1idXR0b24tLWRpc2FibGVkJzogZGlzYWJsZWQsXG4gICAgICAgICAgJ3Zhbi1idXR0b24tLXVuY2xpY2thYmxlJzogZGlzYWJsZWQgfHwgbG9hZGluZ1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==