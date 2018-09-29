'use strict';

var _create = require('./../common/create.js');

var _touch = require('./../mixins/touch.js');

(0, _create.create)({
  mixins: [_touch.touch],

  props: {
    disabled: Boolean,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    },
    barHeight: {
      type: String,
      value: '2px'
    }
  },

  attached: function attached() {
    this.updateValue(this.data.value);
  },


  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.data.disabled) return;

      this.touchStart(event);
      this.startValue = this.format(this.data.value);
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      if (this.data.disabled) return;

      this.touchMove(event);
      this.getRect('.van-slider').then(function (rect) {
        var diff = _this.deltaX / rect.width * 100;
        _this.updateValue(_this.startValue + diff);
      });
    },
    onTouchEnd: function onTouchEnd() {
      if (this.data.disabled) return;
      this.updateValue(this.data.value, true);
    },
    onClick: function onClick(event) {
      var _this2 = this;

      if (this.data.disabled) return;

      this.getRect(function (rect) {
        var value = (event.detail.x - rect.left) / rect.width * 100;
        _this2.updateValue(value, true);
      });
    },
    updateValue: function updateValue(value, end) {
      value = this.format(value);

      this.setData({
        value: value,
        barStyle: 'width: ' + value + '%; height: ' + this.data.barHeight + ';'
      });

      if (end) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      var _data = this.data,
          max = _data.max,
          min = _data.min,
          step = _data.step;

      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInRvdWNoIiwicHJvcHMiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJtYXgiLCJ0eXBlIiwiTnVtYmVyIiwidmFsdWUiLCJtaW4iLCJzdGVwIiwiYmFySGVpZ2h0IiwiU3RyaW5nIiwiYXR0YWNoZWQiLCJ1cGRhdGVWYWx1ZSIsImRhdGEiLCJtZXRob2RzIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJ0b3VjaFN0YXJ0Iiwic3RhcnRWYWx1ZSIsImZvcm1hdCIsIm9uVG91Y2hNb3ZlIiwidG91Y2hNb3ZlIiwiZ2V0UmVjdCIsInRoZW4iLCJkaWZmIiwiZGVsdGFYIiwicmVjdCIsIndpZHRoIiwib25Ub3VjaEVuZCIsIm9uQ2xpY2siLCJkZXRhaWwiLCJ4IiwibGVmdCIsImVuZCIsInNldERhdGEiLCJiYXJTdHlsZSIsIiRlbWl0IiwiTWF0aCIsInJvdW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUVBLG9CQUFPO0FBQ0xBLFVBQVEsQ0FBQ0MsWUFBRCxDQURIOztBQUdMQyxTQUFPO0FBQ0xDLGNBQVVDLE9BREw7QUFFTEMsU0FBSztBQUNIQyxZQUFNQyxNQURIO0FBRUhDLGFBQU87QUFGSixLQUZBO0FBTUxDLFNBQUs7QUFDSEgsWUFBTUMsTUFESDtBQUVIQyxhQUFPO0FBRkosS0FOQTtBQVVMRSxVQUFNO0FBQ0pKLFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZILEtBVkQ7QUFjTEEsV0FBTztBQUNMRixZQUFNQyxNQUREO0FBRUxDLGFBQU87QUFGRixLQWRGO0FBa0JMRyxlQUFXO0FBQ1RMLFlBQU1NLE1BREc7QUFFVEosYUFBTztBQUZFO0FBbEJOLEdBSEY7O0FBMkJMSyxVQTNCSyxzQkEyQk07QUFDVCxTQUFLQyxXQUFMLENBQWlCLEtBQUtDLElBQUwsQ0FBVVAsS0FBM0I7QUFDRCxHQTdCSTs7O0FBK0JMUSxXQUFTO0FBQ1BDLGdCQURPLHdCQUNNQyxLQUROLEVBQ2E7QUFDbEIsVUFBSSxLQUFLSCxJQUFMLENBQVVaLFFBQWQsRUFBd0I7O0FBRXhCLFdBQUtnQixVQUFMLENBQWdCRCxLQUFoQjtBQUNBLFdBQUtFLFVBQUwsR0FBa0IsS0FBS0MsTUFBTCxDQUFZLEtBQUtOLElBQUwsQ0FBVVAsS0FBdEIsQ0FBbEI7QUFDRCxLQU5NO0FBUVBjLGVBUk8sdUJBUUtKLEtBUkwsRUFRWTtBQUFBOztBQUNqQixVQUFJLEtBQUtILElBQUwsQ0FBVVosUUFBZCxFQUF3Qjs7QUFFeEIsV0FBS29CLFNBQUwsQ0FBZUwsS0FBZjtBQUNBLFdBQUtNLE9BQUwsQ0FBYSxhQUFiLEVBQTRCQyxJQUE1QixDQUFpQyxnQkFBUTtBQUN2QyxZQUFNQyxPQUFPLE1BQUtDLE1BQUwsR0FBY0MsS0FBS0MsS0FBbkIsR0FBMkIsR0FBeEM7QUFDQSxjQUFLZixXQUFMLENBQWlCLE1BQUtNLFVBQUwsR0FBa0JNLElBQW5DO0FBQ0QsT0FIRDtBQUlELEtBaEJNO0FBa0JQSSxjQWxCTyx3QkFrQk07QUFDWCxVQUFJLEtBQUtmLElBQUwsQ0FBVVosUUFBZCxFQUF3QjtBQUN4QixXQUFLVyxXQUFMLENBQWlCLEtBQUtDLElBQUwsQ0FBVVAsS0FBM0IsRUFBa0MsSUFBbEM7QUFDRCxLQXJCTTtBQXVCUHVCLFdBdkJPLG1CQXVCQ2IsS0F2QkQsRUF1QlE7QUFBQTs7QUFDYixVQUFJLEtBQUtILElBQUwsQ0FBVVosUUFBZCxFQUF3Qjs7QUFFeEIsV0FBS3FCLE9BQUwsQ0FBYSxnQkFBUTtBQUNuQixZQUFNaEIsUUFBUSxDQUFDVSxNQUFNYyxNQUFOLENBQWFDLENBQWIsR0FBaUJMLEtBQUtNLElBQXZCLElBQStCTixLQUFLQyxLQUFwQyxHQUE0QyxHQUExRDtBQUNBLGVBQUtmLFdBQUwsQ0FBaUJOLEtBQWpCLEVBQXdCLElBQXhCO0FBQ0QsT0FIRDtBQUlELEtBOUJNO0FBZ0NQTSxlQWhDTyx1QkFnQ0tOLEtBaENMLEVBZ0NZMkIsR0FoQ1osRUFnQ2lCO0FBQ3RCM0IsY0FBUSxLQUFLYSxNQUFMLENBQVliLEtBQVosQ0FBUjs7QUFFQSxXQUFLNEIsT0FBTCxDQUFhO0FBQ1g1QixvQkFEVztBQUVYNkIsOEJBQW9CN0IsS0FBcEIsbUJBQXVDLEtBQUtPLElBQUwsQ0FBVUosU0FBakQ7QUFGVyxPQUFiOztBQUtBLFVBQUl3QixHQUFKLEVBQVM7QUFDUCxhQUFLRyxLQUFMLENBQVcsUUFBWCxFQUFxQjlCLEtBQXJCO0FBQ0Q7QUFDRixLQTNDTTtBQTZDUGEsVUE3Q08sa0JBNkNBYixLQTdDQSxFQTZDTztBQUFBLGtCQUNlLEtBQUtPLElBRHBCO0FBQUEsVUFDSlYsR0FESSxTQUNKQSxHQURJO0FBQUEsVUFDQ0ksR0FERCxTQUNDQSxHQUREO0FBQUEsVUFDTUMsSUFETixTQUNNQSxJQUROOztBQUVaLGFBQU82QixLQUFLQyxLQUFMLENBQVdELEtBQUtsQyxHQUFMLENBQVNJLEdBQVQsRUFBYzhCLEtBQUs5QixHQUFMLENBQVNELEtBQVQsRUFBZ0JILEdBQWhCLENBQWQsSUFBc0NLLElBQWpELElBQXlEQSxJQUFoRTtBQUNEO0FBaERNO0FBL0JKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcbmltcG9ydCB7IHRvdWNoIH0gZnJvbSAnLi4vbWl4aW5zL3RvdWNoJztcblxuY3JlYXRlKHtcbiAgbWl4aW5zOiBbdG91Y2hdLFxuXG4gIHByb3BzOiB7XG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbWF4OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMTAwXG4gICAgfSxcbiAgICBtaW46IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICBzdGVwOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICBiYXJIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnMnB4J1xuICAgIH1cbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuZGF0YS52YWx1ZSk7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLnRvdWNoU3RhcnQoZXZlbnQpO1xuICAgICAgdGhpcy5zdGFydFZhbHVlID0gdGhpcy5mb3JtYXQodGhpcy5kYXRhLnZhbHVlKTtcbiAgICB9LFxuXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgdGhpcy50b3VjaE1vdmUoZXZlbnQpO1xuICAgICAgdGhpcy5nZXRSZWN0KCcudmFuLXNsaWRlcicpLnRoZW4ocmVjdCA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmRlbHRhWCAvIHJlY3Qud2lkdGggKiAxMDA7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5zdGFydFZhbHVlICsgZGlmZik7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgb25Ub3VjaEVuZCgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5kYXRhLnZhbHVlLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLmdldFJlY3QocmVjdCA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LmRldGFpbC54IC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGggKiAxMDA7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVZhbHVlKHZhbHVlLCBlbmQpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXQodmFsdWUpO1xuXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgYmFyU3R5bGU6IGB3aWR0aDogJHt2YWx1ZX0lOyBoZWlnaHQ6ICR7dGhpcy5kYXRhLmJhckhlaWdodH07YFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmb3JtYXQodmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgbWF4LCBtaW4sIHN0ZXAgfSA9IHRoaXMuZGF0YTtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgubWF4KG1pbiwgTWF0aC5taW4odmFsdWUsIG1heCkpIC8gc3RlcCkgKiBzdGVwO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=