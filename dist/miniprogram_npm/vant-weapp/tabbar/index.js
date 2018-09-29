'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    active: {
      type: Number,
      observer: function observer(active) {
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    },
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  data: {
    items: [],
    currentActive: -1
  },

  attached: function attached() {
    this.setData({ currentActive: this.data.active });
  },


  relations: {
    '../tabbar-item/index': {
      type: 'descendant',

      linked: function linked(target) {
        this.data.items.push(target);
        this.setActiveItem();
      },
      unlinked: function unlinked(target) {
        this.data.items = this.data.items.filter(function (item) {
          return item !== target;
        });
        this.setActiveItem();
      }
    }
  },

  methods: {
    setActiveItem: function setActiveItem() {
      var _this = this;

      this.data.items.forEach(function (item, index) {
        item.setData({
          active: index === _this.data.currentActive,
          count: _this.data.items.length
        });
      });
    },
    onChange: function onChange(child) {
      var active = this.data.items.indexOf(child);
      if (active !== this.data.currentActive && active !== -1) {
        this.$emit('change', active);
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiYWN0aXZlIiwidHlwZSIsIk51bWJlciIsIm9ic2VydmVyIiwic2V0RGF0YSIsImN1cnJlbnRBY3RpdmUiLCJzZXRBY3RpdmVJdGVtIiwiZml4ZWQiLCJCb29sZWFuIiwidmFsdWUiLCJ6SW5kZXgiLCJkYXRhIiwiaXRlbXMiLCJhdHRhY2hlZCIsInJlbGF0aW9ucyIsImxpbmtlZCIsInRhcmdldCIsInB1c2giLCJ1bmxpbmtlZCIsImZpbHRlciIsIml0ZW0iLCJtZXRob2RzIiwiZm9yRWFjaCIsImluZGV4IiwiY291bnQiLCJsZW5ndGgiLCJvbkNoYW5nZSIsImNoaWxkIiwiaW5kZXhPZiIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLG9CQUFPO0FBQ0xBLFNBQU87QUFDTEMsWUFBUTtBQUNOQyxZQUFNQyxNQURBO0FBRU5DLGNBRk0sb0JBRUdILE1BRkgsRUFFVztBQUNmLGFBQUtJLE9BQUwsQ0FBYSxFQUFFQyxlQUFlTCxNQUFqQixFQUFiO0FBQ0EsYUFBS00sYUFBTDtBQUNEO0FBTEssS0FESDtBQVFMQyxXQUFPO0FBQ0xOLFlBQU1PLE9BREQ7QUFFTEMsYUFBTztBQUZGLEtBUkY7QUFZTEMsWUFBUTtBQUNOVCxZQUFNQyxNQURBO0FBRU5PLGFBQU87QUFGRDtBQVpILEdBREY7O0FBbUJMRSxRQUFNO0FBQ0pDLFdBQU8sRUFESDtBQUVKUCxtQkFBZSxDQUFDO0FBRlosR0FuQkQ7O0FBd0JMUSxVQXhCSyxzQkF3Qk07QUFDVCxTQUFLVCxPQUFMLENBQWEsRUFBRUMsZUFBZSxLQUFLTSxJQUFMLENBQVVYLE1BQTNCLEVBQWI7QUFDRCxHQTFCSTs7O0FBNEJMYyxhQUFXO0FBQ1QsNEJBQXdCO0FBQ3RCYixZQUFNLFlBRGdCOztBQUd0QmMsWUFIc0Isa0JBR2ZDLE1BSGUsRUFHUDtBQUNiLGFBQUtMLElBQUwsQ0FBVUMsS0FBVixDQUFnQkssSUFBaEIsQ0FBcUJELE1BQXJCO0FBQ0EsYUFBS1YsYUFBTDtBQUNELE9BTnFCO0FBUXRCWSxjQVJzQixvQkFRYkYsTUFSYSxFQVFMO0FBQ2YsYUFBS0wsSUFBTCxDQUFVQyxLQUFWLEdBQWtCLEtBQUtELElBQUwsQ0FBVUMsS0FBVixDQUFnQk8sTUFBaEIsQ0FBdUI7QUFBQSxpQkFBUUMsU0FBU0osTUFBakI7QUFBQSxTQUF2QixDQUFsQjtBQUNBLGFBQUtWLGFBQUw7QUFDRDtBQVhxQjtBQURmLEdBNUJOOztBQTRDTGUsV0FBUztBQUNQZixpQkFETywyQkFDUztBQUFBOztBQUNkLFdBQUtLLElBQUwsQ0FBVUMsS0FBVixDQUFnQlUsT0FBaEIsQ0FBd0IsVUFBQ0YsSUFBRCxFQUFPRyxLQUFQLEVBQWlCO0FBQ3ZDSCxhQUFLaEIsT0FBTCxDQUFhO0FBQ1hKLGtCQUFRdUIsVUFBVSxNQUFLWixJQUFMLENBQVVOLGFBRGpCO0FBRVhtQixpQkFBTyxNQUFLYixJQUFMLENBQVVDLEtBQVYsQ0FBZ0JhO0FBRlosU0FBYjtBQUlELE9BTEQ7QUFNRCxLQVJNO0FBVVBDLFlBVk8sb0JBVUVDLEtBVkYsRUFVUztBQUNkLFVBQU0zQixTQUFTLEtBQUtXLElBQUwsQ0FBVUMsS0FBVixDQUFnQmdCLE9BQWhCLENBQXdCRCxLQUF4QixDQUFmO0FBQ0EsVUFBSTNCLFdBQVcsS0FBS1csSUFBTCxDQUFVTixhQUFyQixJQUFzQ0wsV0FBVyxDQUFDLENBQXRELEVBQXlEO0FBQ3ZELGFBQUs2QixLQUFMLENBQVcsUUFBWCxFQUFxQjdCLE1BQXJCO0FBQ0EsYUFBS0ksT0FBTCxDQUFhLEVBQUVDLGVBQWVMLE1BQWpCLEVBQWI7QUFDQSxhQUFLTSxhQUFMO0FBQ0Q7QUFDRjtBQWpCTTtBQTVDSixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5cbmNyZWF0ZSh7XG4gIHByb3BzOiB7XG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBvYnNlcnZlcihhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgY3VycmVudEFjdGl2ZTogYWN0aXZlIH0pO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZpeGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIHpJbmRleDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDFcbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBjdXJyZW50QWN0aXZlOiAtMVxuICB9LFxuXG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGN1cnJlbnRBY3RpdmU6IHRoaXMuZGF0YS5hY3RpdmUgfSk7XG4gIH0sXG5cbiAgcmVsYXRpb25zOiB7XG4gICAgJy4uL3RhYmJhci1pdGVtL2luZGV4Jzoge1xuICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxuXG4gICAgICBsaW5rZWQodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtcy5wdXNoKHRhcmdldCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgfSxcblxuICAgICAgdW5saW5rZWQodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtcyA9IHRoaXMuZGF0YS5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0YXJnZXQpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHNldEFjdGl2ZUl0ZW0oKSB7XG4gICAgICB0aGlzLmRhdGEuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaXRlbS5zZXREYXRhKHtcbiAgICAgICAgICBhY3RpdmU6IGluZGV4ID09PSB0aGlzLmRhdGEuY3VycmVudEFjdGl2ZSxcbiAgICAgICAgICBjb3VudDogdGhpcy5kYXRhLml0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbkNoYW5nZShjaGlsZCkge1xuICAgICAgY29uc3QgYWN0aXZlID0gdGhpcy5kYXRhLml0ZW1zLmluZGV4T2YoY2hpbGQpO1xuICAgICAgaWYgKGFjdGl2ZSAhPT0gdGhpcy5kYXRhLmN1cnJlbnRBY3RpdmUgJiYgYWN0aXZlICE9PSAtMSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBhY3RpdmUpO1xuICAgICAgICB0aGlzLnNldERhdGEoeyBjdXJyZW50QWN0aXZlOiBhY3RpdmUgfSk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4iXX0=