'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    icon: String,
    steps: {
      type: Array,
      observer: 'formatSteps'
    },
    active: {
      type: Number,
      observer: 'formatSteps'
    },
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: '#06bf04'
    }
  },

  attached: function attached() {
    this.formatSteps();
  },


  methods: {
    formatSteps: function formatSteps() {
      var _this = this;

      var steps = this.data.steps;

      steps.forEach(function (step, index) {
        step.status = _this.getStatus(index);
      });
      this.setData({ steps: steps });
    },
    getStatus: function getStatus(index) {
      var active = this.data.active;


      if (index < active) {
        return 'finish';
      } else if (index === active) {
        return 'process';
      }

      return '';
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaWNvbiIsIlN0cmluZyIsInN0ZXBzIiwidHlwZSIsIkFycmF5Iiwib2JzZXJ2ZXIiLCJhY3RpdmUiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWx1ZSIsImFjdGl2ZUNvbG9yIiwiYXR0YWNoZWQiLCJmb3JtYXRTdGVwcyIsIm1ldGhvZHMiLCJkYXRhIiwiZm9yRWFjaCIsInN0ZXAiLCJpbmRleCIsInN0YXR1cyIsImdldFN0YXR1cyIsInNldERhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTztBQUNMQyxVQUFNQyxNQUREO0FBRUxDLFdBQU87QUFDTEMsWUFBTUMsS0FERDtBQUVMQyxnQkFBVTtBQUZMLEtBRkY7QUFNTEMsWUFBUTtBQUNOSCxZQUFNSSxNQURBO0FBRU5GLGdCQUFVO0FBRkosS0FOSDtBQVVMRyxlQUFXO0FBQ1RMLFlBQU1GLE1BREc7QUFFVFEsYUFBTztBQUZFLEtBVk47QUFjTEMsaUJBQWE7QUFDWFAsWUFBTUYsTUFESztBQUVYUSxhQUFPO0FBRkk7QUFkUixHQURGOztBQXFCTEUsVUFyQkssc0JBcUJNO0FBQ1QsU0FBS0MsV0FBTDtBQUNELEdBdkJJOzs7QUF5QkxDLFdBQVM7QUFDUEQsZUFETyx5QkFDTztBQUFBOztBQUFBLFVBQ0pWLEtBREksR0FDTSxLQUFLWSxJQURYLENBQ0paLEtBREk7O0FBRVpBLFlBQU1hLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDN0JELGFBQUtFLE1BQUwsR0FBYyxNQUFLQyxTQUFMLENBQWVGLEtBQWYsQ0FBZDtBQUNELE9BRkQ7QUFHQSxXQUFLRyxPQUFMLENBQWEsRUFBRWxCLFlBQUYsRUFBYjtBQUNELEtBUE07QUFTUGlCLGFBVE8scUJBU0dGLEtBVEgsRUFTVTtBQUFBLFVBQ1BYLE1BRE8sR0FDSSxLQUFLUSxJQURULENBQ1BSLE1BRE87OztBQUdmLFVBQUlXLFFBQVFYLE1BQVosRUFBb0I7QUFDbEIsZUFBTyxRQUFQO0FBQ0QsT0FGRCxNQUVPLElBQUlXLFVBQVVYLE1BQWQsRUFBc0I7QUFDM0IsZUFBTyxTQUFQO0FBQ0Q7O0FBRUQsYUFBTyxFQUFQO0FBQ0Q7QUFuQk07QUF6QkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBwcm9wczoge1xuICAgIGljb246IFN0cmluZyxcbiAgICBzdGVwczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBvYnNlcnZlcjogJ2Zvcm1hdFN0ZXBzJ1xuICAgIH0sXG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBvYnNlcnZlcjogJ2Zvcm1hdFN0ZXBzJ1xuICAgIH0sXG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ2hvcml6b250YWwnXG4gICAgfSxcbiAgICBhY3RpdmVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjMDZiZjA0J1xuICAgIH1cbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLmZvcm1hdFN0ZXBzKCk7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGZvcm1hdFN0ZXBzKCkge1xuICAgICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5kYXRhO1xuICAgICAgc3RlcHMuZm9yRWFjaCgoc3RlcCwgaW5kZXgpID0+IHtcbiAgICAgICAgc3RlcC5zdGF0dXMgPSB0aGlzLmdldFN0YXR1cyhpbmRleCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7IHN0ZXBzIH0pO1xuICAgIH0sXG5cbiAgICBnZXRTdGF0dXMoaW5kZXgpIHtcbiAgICAgIGNvbnN0IHsgYWN0aXZlIH0gPSB0aGlzLmRhdGE7XG5cbiAgICAgIGlmIChpbmRleCA8IGFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gJ2ZpbmlzaCc7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBhY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICdwcm9jZXNzJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=