'use strict';

var _create = require('./../common/create.js');

var FONT_COLOR = '#f60';
var BG_COLOR = '#fff7cc';

(0, _create.create)({
  props: {
    text: {
      type: String,
      value: '',
      observer: function observer() {
        this.setData({}, this.init);
      }
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    }
  },

  data: {
    show: true,
    hasRightIcon: false,
    width: undefined,
    wrapWidth: undefined,
    elapse: undefined,
    animation: null,
    resetAnimation: null,
    timer: null
  },

  attached: function attached() {
    if (this.data.mode) {
      this.setData({
        hasRightIcon: true
      });
    }
  },
  detached: function detached() {
    var timer = this.data.timer;

    timer && clearTimeout(timer);
  },


  methods: {
    init: function init() {
      var _this = this;

      this.getRect('.van-notice-bar__content').then(function (rect) {
        if (!rect || !rect.width) {
          return;
        }
        _this.setData({
          width: rect.width
        });

        _this.getRect('.van-notice-bar__content-wrap').then(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _data = _this.data,
              width = _data.width,
              speed = _data.speed,
              scrollable = _data.scrollable,
              delay = _data.delay;


          if (scrollable && wrapWidth < width) {
            var elapse = width / speed * 1000;
            var animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay: delay
            });
            var resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            _this.setData({
              elapse: elapse,
              wrapWidth: wrapWidth,
              animation: animation,
              resetAnimation: resetAnimation
            }, function () {
              _this.scroll();
            });
          }
        });
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      var _data2 = this.data,
          animation = _data2.animation,
          resetAnimation = _data2.resetAnimation,
          wrapWidth = _data2.wrapWidth,
          elapse = _data2.elapse,
          speed = _data2.speed;

      resetAnimation.translateX(wrapWidth).step();
      var animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(function () {
        _this2.setData({
          animationData: animationData.export()
        });
      }, 100);

      var timer = setTimeout(function () {
        _this2.scroll();
      }, elapse);

      this.setData({
        timer: timer
      });
    },
    onClickIcon: function onClickIcon() {
      var timer = this.data.timer;

      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkZPTlRfQ09MT1IiLCJCR19DT0xPUiIsInByb3BzIiwidGV4dCIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsIm9ic2VydmVyIiwic2V0RGF0YSIsImluaXQiLCJtb2RlIiwidXJsIiwib3BlblR5cGUiLCJkZWxheSIsIk51bWJlciIsInNwZWVkIiwic2Nyb2xsYWJsZSIsIkJvb2xlYW4iLCJsZWZ0SWNvbiIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInNob3ciLCJoYXNSaWdodEljb24iLCJ3aWR0aCIsInVuZGVmaW5lZCIsIndyYXBXaWR0aCIsImVsYXBzZSIsImFuaW1hdGlvbiIsInJlc2V0QW5pbWF0aW9uIiwidGltZXIiLCJhdHRhY2hlZCIsImRldGFjaGVkIiwiY2xlYXJUaW1lb3V0IiwibWV0aG9kcyIsImdldFJlY3QiLCJ0aGVuIiwicmVjdCIsInd4IiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1laW5nRnVuY3Rpb24iLCJzY3JvbGwiLCJ0cmFuc2xhdGVYIiwic3RlcCIsImFuaW1hdGlvbkRhdGEiLCJleHBvcnQiLCJzZXRUaW1lb3V0Iiwib25DbGlja0ljb24iLCJvbkNsaWNrIiwiZXZlbnQiLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFNQSxhQUFhLE1BQW5CO0FBQ0EsSUFBTUMsV0FBVyxTQUFqQjs7QUFFQSxvQkFBTztBQUNMQyxTQUFPO0FBQ0xDLFVBQU07QUFDSkMsWUFBTUMsTUFERjtBQUVKQyxhQUFPLEVBRkg7QUFHSkMsY0FISSxzQkFHTztBQUNULGFBQUtDLE9BQUwsQ0FBYSxFQUFiLEVBQWlCLEtBQUtDLElBQXRCO0FBQ0Q7QUFMRyxLQUREO0FBUUxDLFVBQU07QUFDSk4sWUFBTUMsTUFERjtBQUVKQyxhQUFPO0FBRkgsS0FSRDtBQVlMSyxTQUFLO0FBQ0hQLFlBQU1DLE1BREg7QUFFSEMsYUFBTztBQUZKLEtBWkE7QUFnQkxNLGNBQVU7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QyxNQUZqQyxVQUVpQ0EsTUFGakM7QUFBQSxVQUV5Q1osS0FGekMsVUFFeUNBLEtBRnpDOztBQUlQYyxxQkFBZWMsVUFBZixDQUEwQmpCLFNBQTFCLEVBQXFDa0IsSUFBckM7QUFDQSxVQUFNQyxnQkFBZ0JqQixVQUFVZSxVQUFWLENBQXFCLEVBQUVoQixTQUFTWixLQUFYLElBQW9CLElBQXpDLEVBQStDNkIsSUFBL0MsRUFBdEI7QUFDQSxXQUFLcEMsT0FBTCxDQUFhO0FBQ1hxQyx1QkFBZWhCLGVBQWVpQixNQUFmO0FBREosT0FBYjtBQUdBQyxpQkFBVyxZQUFNO0FBQ2YsZUFBS3ZDLE9BQUwsQ0FBYTtBQUNYcUMseUJBQWVBLGNBQWNDLE1BQWQ7QUFESixTQUFiO0FBR0QsT0FKRCxFQUlHLEdBSkg7O0FBTUEsVUFBTWhCLFFBQVFpQixXQUFXLFlBQU07QUFDN0IsZUFBS0wsTUFBTDtBQUNELE9BRmEsRUFFWGYsTUFGVyxDQUFkOztBQUlBLFdBQUtuQixPQUFMLENBQWE7QUFDWHNCO0FBRFcsT0FBYjtBQUdELEtBbkVNO0FBcUVQa0IsZUFyRU8seUJBcUVPO0FBQUEsVUFDSmxCLEtBREksR0FDTSxLQUFLVCxJQURYLENBQ0pTLEtBREk7O0FBRVpBLGVBQVNHLGFBQWFILEtBQWIsQ0FBVDtBQUNBLFdBQUt0QixPQUFMLENBQWE7QUFDWGMsY0FBTSxLQURLO0FBRVhRLGVBQU87QUFGSSxPQUFiO0FBSUQsS0E1RU07QUE4RVBtQixXQTlFTyxtQkE4RUNDLEtBOUVELEVBOEVRO0FBQ2IsV0FBS0MsS0FBTCxDQUFXLE9BQVgsRUFBb0JELEtBQXBCO0FBQ0Q7QUFoRk07QUF2RUosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jb25zdCBGT05UX0NPTE9SID0gJyNmNjAnO1xuY29uc3QgQkdfQ09MT1IgPSAnI2ZmZjdjYyc7XG5cbmNyZWF0ZSh7XG4gIHByb3BzOiB7XG4gICAgdGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7fSwgdGhpcy5pbml0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgdXJsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIG9wZW5UeXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ25hdmlnYXRlJ1xuICAgIH0sXG4gICAgZGVsYXk6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICBzcGVlZDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDUwXG4gICAgfSxcbiAgICBzY3JvbGxhYmxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIGxlZnRJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogRk9OVF9DT0xPUlxuICAgIH0sXG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogQkdfQ09MT1JcbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIHNob3c6IHRydWUsXG4gICAgaGFzUmlnaHRJY29uOiBmYWxzZSxcbiAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgIHdyYXBXaWR0aDogdW5kZWZpbmVkLFxuICAgIGVsYXBzZTogdW5kZWZpbmVkLFxuICAgIGFuaW1hdGlvbjogbnVsbCxcbiAgICByZXNldEFuaW1hdGlvbjogbnVsbCxcbiAgICB0aW1lcjogbnVsbFxuICB9LFxuXG4gIGF0dGFjaGVkKCkge1xuICAgIGlmICh0aGlzLmRhdGEubW9kZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaGFzUmlnaHRJY29uOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgZGV0YWNoZWQoKSB7XG4gICAgY29uc3QgeyB0aW1lciB9ID0gdGhpcy5kYXRhO1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGluaXQoKSB7XG4gICAgICB0aGlzLmdldFJlY3QoJy52YW4tbm90aWNlLWJhcl9fY29udGVudCcpLnRoZW4ocmVjdCA9PiB7XG4gICAgICAgIGlmICghcmVjdCB8fCAhcmVjdC53aWR0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi1ub3RpY2UtYmFyX19jb250ZW50LXdyYXAnKS50aGVuKHJlY3QgPT4ge1xuICAgICAgICAgIGlmICghcmVjdCB8fCAhcmVjdC53aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHdyYXBXaWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgd2lkdGgsIHNwZWVkLCBzY3JvbGxhYmxlLCBkZWxheVxuICAgICAgICAgIH0gPSB0aGlzLmRhdGE7XG5cbiAgICAgICAgICBpZiAoc2Nyb2xsYWJsZSAmJiB3cmFwV2lkdGggPCB3aWR0aCkge1xuICAgICAgICAgICAgY29uc3QgZWxhcHNlID0gd2lkdGggLyBzcGVlZCAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZWxhcHNlLFxuICAgICAgICAgICAgICB0aW1laW5nRnVuY3Rpb246ICdsaW5lYXInLFxuICAgICAgICAgICAgICBkZWxheVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCByZXNldEFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICB0aW1laW5nRnVuY3Rpb246ICdsaW5lYXInXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgZWxhcHNlLFxuICAgICAgICAgICAgICB3cmFwV2lkdGgsXG4gICAgICAgICAgICAgIGFuaW1hdGlvbixcbiAgICAgICAgICAgICAgcmVzZXRBbmltYXRpb25cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2Nyb2xsKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbmltYXRpb24sIHJlc2V0QW5pbWF0aW9uLCB3cmFwV2lkdGgsIGVsYXBzZSwgc3BlZWRcbiAgICAgIH0gPSB0aGlzLmRhdGE7XG4gICAgICByZXNldEFuaW1hdGlvbi50cmFuc2xhdGVYKHdyYXBXaWR0aCkuc3RlcCgpO1xuICAgICAgY29uc3QgYW5pbWF0aW9uRGF0YSA9IGFuaW1hdGlvbi50cmFuc2xhdGVYKC0oZWxhcHNlICogc3BlZWQpIC8gMTAwMCkuc3RlcCgpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogcmVzZXRBbmltYXRpb24uZXhwb3J0KClcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uRGF0YS5leHBvcnQoKVxuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMCk7XG5cbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nyb2xsKCk7XG4gICAgICB9LCBlbGFwc2UpO1xuXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0aW1lclxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tJY29uKCkge1xuICAgICAgY29uc3QgeyB0aW1lciB9ID0gdGhpcy5kYXRhO1xuICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICB0aW1lcjogbnVsbFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=