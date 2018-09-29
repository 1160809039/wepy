'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  relations: {
    '../tab/index': {
      type: 'descendant',

      linked: function linked(target) {
        var tabs = this.data.tabs;

        tabs.push({
          instance: target,
          data: target.data
        });
        this.setData({
          tabs: tabs,
          scrollable: tabs.length > this.data.swipeThreshold
        });
        this.setActiveTab();
      },
      unlinked: function unlinked(target) {
        var tabs = this.data.tabs.filter(function (item) {
          return item.instance !== target;
        });
        this.setData({
          tabs: tabs,
          scrollable: tabs.length > this.data.swipeThreshold
        });
        this.setActiveTab();
      }
    }
  },

  props: {
    color: {
      type: String,
      observer: 'setLine'
    },
    lineWidth: {
      type: Number,
      observer: 'setLine'
    },
    active: {
      type: null,
      value: 0
    },
    type: {
      type: String,
      value: 'line'
    },
    duration: {
      type: Number,
      value: 0.2
    },
    swipeThreshold: {
      type: Number,
      value: 4,
      observer: function observer() {
        this.setData({
          scrollable: this.data.tabs.length > this.data.swipeThreshold
        });
      }
    }
  },

  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0
  },

  ready: function ready() {
    this.setLine();
    this.scrollIntoView();
  },


  methods: {
    trigger: function trigger(eventName, index) {
      this.$emit(eventName, {
        index: index,
        title: this.data.tabs[index].data.title
      });
    },
    onTap: function onTap(event) {
      var index = event.currentTarget.dataset.index;

      if (this.data.tabs[index].data.disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },
    setActive: function setActive(active) {
      if (active !== this.data.active) {
        this.trigger('change', active);
        this.setData({ active: active });
        this.setActiveTab();
        this.setLine();
        this.scrollIntoView();
      }
    },
    setLine: function setLine() {
      var _this = this;

      if (this.data.type !== 'line') {
        return;
      }

      this.getRect('.van-tab', true).then(function (rects) {
        var rect = rects[_this.data.active];
        var width = _this.data.lineWidth || rect.width;
        var left = rects.slice(0, _this.data.active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        left += (rect.width - width) / 2;

        _this.setData({
          lineStyle: '\n            width: ' + width + 'px;\n            background-color: ' + _this.data.color + ';\n            transform: translateX(' + left + 'px);\n            transition-duration: ' + _this.data.duration + 's;\n          '
        });
      });
    },
    setActiveTab: function setActiveTab() {
      var _this2 = this;

      this.data.tabs.forEach(function (item, index) {
        var data = {
          active: index === _this2.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.instance.data.active) {
          item.instance.setData(data);
        }
      });
    },


    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var _this3 = this;

      if (!this.data.scrollable) {
        return;
      }

      this.getRect('.van-tab', true).then(function (tabRects) {
        var tabRect = tabRects[_this3.data.active];
        var offsetLeft = tabRects.slice(0, _this3.data.active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        var tabWidth = tabRect.width;

        _this3.getRect('.van-tabs__nav').then(function (navRect) {
          var navWidth = navRect.width;
          _this3.setData({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9ucyIsInR5cGUiLCJsaW5rZWQiLCJ0YXJnZXQiLCJ0YWJzIiwiZGF0YSIsInB1c2giLCJpbnN0YW5jZSIsInNldERhdGEiLCJzY3JvbGxhYmxlIiwibGVuZ3RoIiwic3dpcGVUaHJlc2hvbGQiLCJzZXRBY3RpdmVUYWIiLCJ1bmxpbmtlZCIsImZpbHRlciIsIml0ZW0iLCJwcm9wcyIsImNvbG9yIiwiU3RyaW5nIiwib2JzZXJ2ZXIiLCJsaW5lV2lkdGgiLCJOdW1iZXIiLCJhY3RpdmUiLCJ2YWx1ZSIsImR1cmF0aW9uIiwibGluZVN0eWxlIiwic2Nyb2xsTGVmdCIsInJlYWR5Iiwic2V0TGluZSIsInNjcm9sbEludG9WaWV3IiwibWV0aG9kcyIsInRyaWdnZXIiLCJldmVudE5hbWUiLCJpbmRleCIsIiRlbWl0IiwidGl0bGUiLCJvblRhcCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkaXNhYmxlZCIsInNldEFjdGl2ZSIsImdldFJlY3QiLCJ0aGVuIiwicmVjdCIsInJlY3RzIiwid2lkdGgiLCJsZWZ0Iiwic2xpY2UiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsImZvckVhY2giLCJpbml0ZWQiLCJpbW1lZGlhdGUiLCJ0YWJSZWN0IiwidGFiUmVjdHMiLCJvZmZzZXRMZWZ0IiwidGFiV2lkdGgiLCJuYXZXaWR0aCIsIm5hdlJlY3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsYUFBVztBQUNULG9CQUFnQjtBQUNkQyxZQUFNLFlBRFE7O0FBR2RDLFlBSGMsa0JBR1BDLE1BSE8sRUFHQztBQUFBLFlBQ0xDLElBREssR0FDSSxLQUFLQyxJQURULENBQ0xELElBREs7O0FBRWJBLGFBQUtFLElBQUwsQ0FBVTtBQUNSQyxvQkFBVUosTUFERjtBQUVSRSxnQkFBTUYsT0FBT0U7QUFGTCxTQUFWO0FBSUEsYUFBS0csT0FBTCxDQUFhO0FBQ1hKLG9CQURXO0FBRVhLLHNC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RUFxRW1CO0FBQUE7O0FBQ3hCLFVBQUksQ0FBQyxLQUFLakQsSUFBTCxDQUFVSSxVQUFmLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsV0FBS2lDLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLElBQXpCLEVBQStCQyxJQUEvQixDQUFvQyxvQkFBWTtBQUM5QyxZQUFNWSxVQUFVQyxTQUFTLE9BQUtuRCxJQUFMLENBQVVpQixNQUFuQixDQUFoQjtBQUNBLFlBQU1tQyxhQUFhRCxTQUNoQlIsS0FEZ0IsQ0FDVixDQURVLEVBQ1AsT0FBSzNDLElBQUwsQ0FBVWlCLE1BREgsRUFFaEIyQixNQUZnQixDQUVULFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLGlCQUFnQkQsT0FBT0MsS0FBS0wsS0FBNUI7QUFBQSxTQUZTLEVBRTBCLENBRjFCLENBQW5CO0FBR0EsWUFBTVksV0FBV0gsUUFBUVQsS0FBekI7O0FBRUEsZUFBS0osT0FBTCxDQUFhLGdCQUFiLEVBQStCQyxJQUEvQixDQUFvQyxtQkFBVztBQUM3QyxjQUFNZ0IsV0FBV0MsUUFBUWQsS0FBekI7QUFDQSxpQkFBS3RDLE9BQUwsQ0FBYTtBQUNYa0Isd0JBQVkrQixhQUFhLENBQUNFLFdBQVdELFFBQVosSUFBd0I7QUFEdEMsV0FBYjtBQUdELFNBTEQ7QUFNRCxPQWJEO0FBY0Q7QUF4Rk07QUF4RUosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICByZWxhdGlvbnM6IHtcbiAgICAnLi4vdGFiL2luZGV4Jzoge1xuICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxuXG4gICAgICBsaW5rZWQodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHsgdGFicyB9ID0gdGhpcy5kYXRhO1xuICAgICAgICB0YWJzLnB1c2goe1xuICAgICAgICAgIGluc3RhbmNlOiB0YXJnZXQsXG4gICAgICAgICAgZGF0YTogdGFyZ2V0LmRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdGFicyxcbiAgICAgICAgICBzY3JvbGxhYmxlOiB0YWJzLmxlbmd0aCA+IHRoaXMuZGF0YS5zd2lwZVRocmVzaG9sZFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoKTtcbiAgICAgIH0sXG5cbiAgICAgIHVubGlua2VkKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YWJzID0gdGhpcy5kYXRhLnRhYnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pbnN0YW5jZSAhPT0gdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICB0YWJzLFxuICAgICAgICAgIHNjcm9sbGFibGU6IHRhYnMubGVuZ3RoID4gdGhpcy5kYXRhLnN3aXBlVGhyZXNob2xkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYigpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBvYnNlcnZlcjogJ3NldExpbmUnXG4gICAgfSxcbiAgICBsaW5lV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIG9ic2VydmVyOiAnc2V0TGluZSdcbiAgICB9LFxuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ2xpbmUnXG4gICAgfSxcbiAgICBkdXJhdGlvbjoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDAuMlxuICAgIH0sXG4gICAgc3dpcGVUaHJlc2hvbGQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiA0LFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgc2Nyb2xsYWJsZTogdGhpcy5kYXRhLnRhYnMubGVuZ3RoID4gdGhpcy5kYXRhLnN3aXBlVGhyZXNob2xkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkYXRhOiB7XG4gICAgdGFiczogW10sXG4gICAgbGluZVN0eWxlOiAnJyxcbiAgICBzY3JvbGxMZWZ0OiAwXG4gIH0sXG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5zZXRMaW5lKCk7XG4gICAgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZlbnROYW1lLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICB0aXRsZTogdGhpcy5kYXRhLnRhYnNbaW5kZXhdLmRhdGEudGl0bGVcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvblRhcChldmVudCkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgaWYgKHRoaXMuZGF0YS50YWJzW2luZGV4XS5kYXRhLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignZGlzYWJsZWQnLCBpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NsaWNrJywgaW5kZXgpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZShpbmRleCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldEFjdGl2ZShhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUgIT09IHRoaXMuZGF0YS5hY3RpdmUpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCBhY3RpdmUpO1xuICAgICAgICB0aGlzLnNldERhdGEoeyBhY3RpdmUgfSk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKCk7XG4gICAgICAgIHRoaXMuc2V0TGluZSgpO1xuICAgICAgICB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldExpbmUoKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLnR5cGUgIT09ICdsaW5lJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi10YWInLCB0cnVlKS50aGVuKHJlY3RzID0+IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHJlY3RzW3RoaXMuZGF0YS5hY3RpdmVdO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZGF0YS5saW5lV2lkdGggfHwgcmVjdC53aWR0aDtcbiAgICAgICAgbGV0IGxlZnQgPSByZWN0c1xuICAgICAgICAgIC5zbGljZSgwLCB0aGlzLmRhdGEuYWN0aXZlKVxuICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLndpZHRoLCAwKTtcbiAgICAgICAgbGVmdCArPSAocmVjdC53aWR0aCAtIHdpZHRoKSAvIDI7XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBsaW5lU3R5bGU6IGBcbiAgICAgICAgICAgIHdpZHRoOiAke3dpZHRofXB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmRhdGEuY29sb3J9O1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7bGVmdH1weCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAke3RoaXMuZGF0YS5kdXJhdGlvbn1zO1xuICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2V0QWN0aXZlVGFiKCkge1xuICAgICAgdGhpcy5kYXRhLnRhYnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICBhY3RpdmU6IGluZGV4ID09PSB0aGlzLmRhdGEuYWN0aXZlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRhdGEuYWN0aXZlKSB7XG4gICAgICAgICAgZGF0YS5pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuYWN0aXZlICE9PSBpdGVtLmluc3RhbmNlLmRhdGEuYWN0aXZlKSB7XG4gICAgICAgICAgaXRlbS5pbnN0YW5jZS5zZXREYXRhKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gc2Nyb2xsIGFjdGl2ZSB0YWIgaW50byB2aWV3XG4gICAgc2Nyb2xsSW50b1ZpZXcoaW1tZWRpYXRlKSB7XG4gICAgICBpZiAoIXRoaXMuZGF0YS5zY3JvbGxhYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5nZXRSZWN0KCcudmFuLXRhYicsIHRydWUpLnRoZW4odGFiUmVjdHMgPT4ge1xuICAgICAgICBjb25zdCB0YWJSZWN0ID0gdGFiUmVjdHNbdGhpcy5kYXRhLmFjdGl2ZV07XG4gICAgICAgIGNvbnN0IG9mZnNldExlZnQgPSB0YWJSZWN0c1xuICAgICAgICAgIC5zbGljZSgwLCB0aGlzLmRhdGEuYWN0aXZlKVxuICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLndpZHRoLCAwKTtcbiAgICAgICAgY29uc3QgdGFiV2lkdGggPSB0YWJSZWN0LndpZHRoO1xuXG4gICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi10YWJzX19uYXYnKS50aGVuKG5hdlJlY3QgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hdldpZHRoID0gbmF2UmVjdC53aWR0aDtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2Nyb2xsTGVmdDogb2Zmc2V0TGVmdCAtIChuYXZXaWR0aCAtIHRhYldpZHRoKSAvIDJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19