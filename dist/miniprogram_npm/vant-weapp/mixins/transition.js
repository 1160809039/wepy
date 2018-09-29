'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var transition = exports.transition = function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      show: {
        value: showDefaultValue,
        type: Boolean,
        observer: function observer(value) {
          if (value) {
            this.show();
          } else {
            this.setData({
              type: 'leave'
            });
          }
        }
      },
      duration: {
        type: Number,
        value: 300
      }
    },

    data: {
      type: '',
      inited: false,
      display: false
    },

    attached: function attached() {
      if (this.data.show) {
        this.show();
      }
    },


    methods: {
      show: function show() {
        this.setData({
          inited: true,
          display: true,
          type: 'enter'
        });
      },
      onAnimationEnd: function onAnimationEnd() {
        if (!this.data.show) {
          this.setData({
            display: false
          });
        }
      }
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zaXRpb24uanMiXSwibmFtZXMiOlsidHJhbnNpdGlvbiIsInNob3dEZWZhdWx0VmFsdWUiLCJCZWhhdmlvciIsInByb3BlcnRpZXMiLCJjdXN0b21TdHlsZSIsIlN0cmluZyIsInNob3ciLCJ2YWx1ZSIsInR5cGUiLCJCb29sZWFuIiwib2JzZXJ2ZXIiLCJzZXREYXRhIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJkYXRhIiwiaW5pdGVkIiwiZGlzcGxheSIsImF0dGFjaGVkIiwibWV0aG9kcyIsIm9uQW5pbWF0aW9uRW5kIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLGtDQUFhLFNBQWJBLFVBQWEsQ0FBU0MsZ0JBQVQsRUFBMkI7QUFDbkQsU0FBT0MsU0FBUztBQUNkQyxnQkFBWTtBQUNWQyxtQkFBYUMsTUFESDtBQUVWQyxZQUFNO0FBQ0pDLGVBQU9OLGdCQURIO0FBRUpPLGNBQU1DLE9BRkY7QUFHSkMsZ0JBSEksb0JBR0tILEtBSEwsRUFHWTtBQUNkLGNBQUlBLEtBQUosRUFBVztBQUNULGlCQUFLRCxJQUFMO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUtLLE9BQUwsQ0FBYTtBQUNYSCxvQkFBTTtBQURLLGFBQWI7QUFHRDtBQUNGO0FBWEcsT0FGSTtBQWVWSSxnQkFBVTtBQUNSSixjQUFNSyxNQURFO0FBRVJOLGVBQU87QUFGQztBQWZBLEtBREU7O0FBc0JkTyxVQUFNO0FBQ0pOLFlBQU0sRUFERjtBQUVKTyxjQUFRLEtBRko7QUFHSkMsZUFBUztBQUhMLEtBdEJROztBQTRCZEMsWUE1QmMsc0JBNEJIO0FBQ1QsVUFBSSxLQUFLSCxJQUFMLENBQVVSLElBQWQsRUFBb0I7QUFDbEIsYUFBS0EsSUFBTDtBQUNEO0FBQ0YsS0FoQ2E7OztBQWtDZFksYUFBUztBQUNQWixVQURPLGtCQUNBO0FBQ0wsYUFBS0ssT0FBTCxDQUFhO0FBQ1hJLGtCQUFRLElBREc7QUFFWEMsbUJBQVMsSUFGRTtBQUdYUixnQkFBTTtBQUhLLFNBQWI7QUFLRCxPQVBNO0FBU1BXLG9CQVRPLDRCQVNVO0FBQ2YsWUFBSSxDQUFDLEtBQUtMLElBQUwsQ0FBVVIsSUFBZixFQUFxQjtBQUNuQixlQUFLSyxPQUFMLENBQWE7QUFDWEsscUJBQVM7QUFERSxXQUFiO0FBR0Q7QUFDRjtBQWZNO0FBbENLLEdBQVQsQ0FBUDtBQW9ERCxDQXJETSIsImZpbGUiOiJ0cmFuc2l0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHRyYW5zaXRpb24gPSBmdW5jdGlvbihzaG93RGVmYXVsdFZhbHVlKSB7XG4gIHJldHVybiBCZWhhdmlvcih7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgY3VzdG9tU3R5bGU6IFN0cmluZyxcbiAgICAgIHNob3c6IHtcbiAgICAgICAgdmFsdWU6IHNob3dEZWZhdWx0VmFsdWUsXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIG9ic2VydmVyKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2xlYXZlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICB2YWx1ZTogMzAwXG4gICAgICB9XG4gICAgfSxcblxuICAgIGRhdGE6IHtcbiAgICAgIHR5cGU6ICcnLFxuICAgICAgaW5pdGVkOiBmYWxzZSxcbiAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgfSxcblxuICAgIGF0dGFjaGVkKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5zaG93KSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICBzaG93KCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGluaXRlZDogdHJ1ZSxcbiAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgIHR5cGU6ICdlbnRlcidcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBvbkFuaW1hdGlvbkVuZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuc2hvdykge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG4iXX0=