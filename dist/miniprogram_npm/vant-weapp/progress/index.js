'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    inactive: {
      type: Boolean,
      observer: function observer() {
        this.setPivotStyle();
        this.setPortionStyle();
      }
    },
    pivotColor: {
      type: String,
      observer: 'setPivotStyle'
    },
    percentage: {
      type: Number,
      observer: function observer() {
        this.setText();
        this.setPortionStyle();
      }
    },
    showPivot: {
      type: Boolean,
      value: true,
      observer: 'getWidth'
    },
    pivotText: {
      type: String,
      observer: function observer() {
        this.setText();
        this.getWidth();
      }
    },
    color: {
      type: String,
      value: '#38f',
      observer: function observer() {
        this.setPivotStyle();
        this.setPortionStyle();
      }
    },
    textColor: {
      type: String,
      value: '#fff',
      observer: 'setPivotStyle'
    }
  },

  data: {
    pivotWidth: 0,
    progressWidth: 0
  },

  ready: function ready() {
    this.setText();
    this.setPivotStyle();
    this.getWidth();
  },


  methods: {
    getCurrentColor: function getCurrentColor() {
      return this.data.inactive ? '#cacaca' : this.data.color;
    },
    setText: function setText() {
      this.setData({
        text: this.data.pivotText || this.data.percentage + '%'
      });
    },
    setPortionStyle: function setPortionStyle() {
      var width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
      var background = this.getCurrentColor();
      this.setData({
        portionStyle: 'width: ' + width + '; background: ' + background + '; '
      });
    },
    setPivotStyle: function setPivotStyle() {
      var color = this.data.textColor;
      var background = this.data.pivotColor || this.getCurrentColor();
      this.setData({
        pivotStyle: 'color: ' + color + '; background: ' + background
      });
    },
    getWidth: function getWidth() {
      var _this = this;

      this.getRect('.van-progress').then(function (rect) {
        _this.setData({
          progressWidth: rect.width
        });
        _this.setPortionStyle();
      });

      this.getRect('.van-progress__pivot').then(function (rect) {
        _this.setData({
          pivotWidth: rect.width || 0
        });
        _this.setPortionStyle();
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaW5hY3RpdmUiLCJ0eXBlIiwiQm9vbGVhbiIsIm9ic2VydmVyIiwic2V0UGl2b3RTdHlsZSIsInNldFBvcnRpb25TdHlsZSIsInBpdm90Q29sb3IiLCJTdHJpbmciLCJwZXJjZW50YWdlIiwiTnVtYmVyIiwic2V0VGV4dCIsInNob3dQaXZvdCIsInZhbHVlIiwicGl2b3RUZXh0IiwiZ2V0V2lkdGgiLCJjb2xvciIsInRleHRDb2xvciIsImRhdGEiLCJwaXZvdFdpZHRoIiwicHJvZ3Jlc3NXaWR0aCIsInJlYWR5IiwibWV0aG9kcyIsImdldEN1cnJlbnRDb2xvciIsInNldERhdGEiLCJ0ZXh0Iiwid2lkdGgiLCJiYWNrZ3JvdW5kIiwicG9ydGlvblN0eWxlIiwicGl2b3RTdHlsZSIsImdldFJlY3QiLCJ0aGVuIiwicmVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxTQUFPO0FBQ0xDLGNBQVU7QUFDUkMsWUFBTUMsT0FERTtBQUVSQyxjQUZRLHNCQUVHO0FBQ1QsYUFBS0MsYUFBTDtBQUNBLGFBQUtDLGVBQUw7QUFDRDtBQUxPLEtBREw7QUFRTEMsZ0JBQVk7QUFDVkwsWUFBTU0sTUFESTtBQUVWSixnQkFBVTtBQUZBLEtBUlA7QUFZTEssZ0JBQVk7QUFDVlAsWUFBTVEsTUFESTtBQUVWTixjQUZVLHNCQUVDO0FBQ1QsYUFBS08sT0FBTDtBQUNBLGFBQUtMLGVBQUw7QUFDRDtBQUxTLEtBWlA7QUFtQkxNLGVBQVc7QUFDVFYsWUFBTUMsT0FERztBQUVUVSxhQUFPLElBRkU7QUFHVFQsZ0JBQVU7QUFIRCxLQW5CTjtBQXdCTFUsZUFBVztBQUNUWixZQUFNTSxNQURHO0FBRVRKLGNBRlMsc0JBRUU7QUFDVCxhQUFLTyxPQUFMO0FBQ0EsYUFBS0ksUUFBTDtBQUNEO0FBTFEsS0F4Qk47QUErQkxDLFdBQU87QUFDTGQsWUFBTU0sTUFERDtBQUVMSyxhQUFPLE1BRkY7QUFHTFQsY0FISyxzQkFHTTtBQUNULGFBQUtDLGFBQUw7QUFDQSxhQUFLQyxlQUFMO0FBQ0Q7QUFOSSxLQS9CRjtBQXVDTFcsZUFBVztBQUNUZixZQUFNTSxNQURHO0FBRVRLLGFBQU8sTUFGRTtBQUdUVCxnQkFBVTtBQUhEO0FBdkNOLEdBREY7O0FBK0NMYyxRQUFNO0FBQ0pDLGdCQUFZLENBRFI7QUFFSkMsbUJBQWU7QUFGWCxHQS9DRDs7QUFvRExDLE9BcERLLG1CQW9ERztBQUNOLFNBQUtWLE9BQUw7QUFDQSxTQUFLTixhQUFMO0FBQ0EsU0FBS1UsUUFBTDtBQUNELEdBeERJOzs7QUEwRExPLFdBQVM7QUFDUEMsbUJBRE8sNkJBQ1c7QUFDaEIsYUFBTyxLQUFLTCxJQUFMLENBQVVqQixRQUFWLEdBQXFCLFNBQXJCLEdBQWlDLEtBQUtpQixJQUFMLENBQVVGLEtBQWxEO0FBQ0QsS0FITTtBQUtQTCxXQUxPLHFCQUtHO0FBQ1IsV0FBS2EsT0FBTCxDQUFhO0FBQ1hDLGNBQU0sS0FBS1AsSUFBTCxDQUFVSixTQUFWLElBQXVCLEtBQUtJLElBQUwsQ0FBVVQsVUFBVixHQUF1QjtBQUR6QyxPQUFiO0FBR0QsS0FUTTtBQVdQSCxtQkFYTyw2QkFXVztBQUNoQixVQUFNb0IsUUFBUSxDQUFDLEtBQUtSLElBQUwsQ0FBVUUsYUFBVixHQUEwQixLQUFLRixJQUFMLENBQVVDLFVBQXJDLElBQW1ELEtBQUtELElBQUwsQ0FBVVQsVUFBN0QsR0FBMEUsR0FBMUUsR0FBZ0YsSUFBOUY7QUFDQSxVQUFNa0IsYUFBYSxLQUFLSixlQUFMLEVBQW5CO0FBQ0EsV0FBS0MsT0FBTCxDQUFhO0FBQ1hJLGtDQUF3QkYsS0FBeEIsc0JBQThDQyxVQUE5QztBQURXLE9BQWI7QUFHRCxLQWpCTTtBQW1CUHRCLGlCQW5CTywyQkFtQlM7QUFDZCxVQUFNVyxRQUFRLEtBQUtFLElBQUwsQ0FBVUQsU0FBeEI7QUFDQSxVQUFNVSxhQUFhLEtBQUtULElBQUwsQ0FBVVgsVUFBVixJQUF3QixLQUFLZ0IsZUFBTCxFQUEzQztBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYSyxnQ0FBc0JiLEtBQXRCLHNCQUE0Q1c7QUFEakMsT0FBYjtBQUdELEtBekJNO0FBMkJQWixZQTNCTyxzQkEyQkk7QUFBQTs7QUFDVCxXQUFLZSxPQUFMLENBQWEsZUFBYixFQUE4QkMsSUFBOUIsQ0FBbUMsZ0JBQVE7QUFDekMsY0FBS1AsT0FBTCxDQUFhO0FBQ1hKLHlCQUFlWSxLQUFLTjtBQURULFNBQWI7QUFHQSxjQUFLcEIsZUFBTDtBQUNELE9BTEQ7O0FBT0EsV0FBS3dCLE9BQUwsQ0FBYSxzQkFBYixFQUFxQ0MsSUFBckMsQ0FBMEMsZ0JBQVE7QUFDaEQsY0FBS1AsT0FBTCxDQUFhO0FBQ1hMLHNCQUFZYSxLQUFLTixLQUFMLElBQWM7QUFEZixTQUFiO0FBR0EsY0FBS3BCLGVBQUw7QUFDRCxPQUxEO0FBTUQ7QUF6Q007QUExREosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBwcm9wczoge1xuICAgIGluYWN0aXZlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0UGl2b3RTdHlsZSgpO1xuICAgICAgICB0aGlzLnNldFBvcnRpb25TdHlsZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGl2b3RDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgb2JzZXJ2ZXI6ICdzZXRQaXZvdFN0eWxlJ1xuICAgIH0sXG4gICAgcGVyY2VudGFnZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dCgpO1xuICAgICAgICB0aGlzLnNldFBvcnRpb25TdHlsZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hvd1Bpdm90OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWUsXG4gICAgICBvYnNlcnZlcjogJ2dldFdpZHRoJ1xuICAgIH0sXG4gICAgcGl2b3RUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBvYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5zZXRUZXh0KCk7XG4gICAgICAgIHRoaXMuZ2V0V2lkdGgoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJyMzOGYnLFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0UGl2b3RTdHlsZSgpO1xuICAgICAgICB0aGlzLnNldFBvcnRpb25TdHlsZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGV4dENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJyNmZmYnLFxuICAgICAgb2JzZXJ2ZXI6ICdzZXRQaXZvdFN0eWxlJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiB7XG4gICAgcGl2b3RXaWR0aDogMCxcbiAgICBwcm9ncmVzc1dpZHRoOiAwXG4gIH0sXG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5zZXRUZXh0KCk7XG4gICAgdGhpcy5zZXRQaXZvdFN0eWxlKCk7XG4gICAgdGhpcy5nZXRXaWR0aCgpO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDdXJyZW50Q29sb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmluYWN0aXZlID8gJyNjYWNhY2EnIDogdGhpcy5kYXRhLmNvbG9yO1xuICAgIH0sXG5cbiAgICBzZXRUZXh0KCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdGV4dDogdGhpcy5kYXRhLnBpdm90VGV4dCB8fCB0aGlzLmRhdGEucGVyY2VudGFnZSArICclJ1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNldFBvcnRpb25TdHlsZSgpIHtcbiAgICAgIGNvbnN0IHdpZHRoID0gKHRoaXMuZGF0YS5wcm9ncmVzc1dpZHRoIC0gdGhpcy5kYXRhLnBpdm90V2lkdGgpICogdGhpcy5kYXRhLnBlcmNlbnRhZ2UgLyAxMDAgKyAncHgnO1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZ2V0Q3VycmVudENvbG9yKCk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBwb3J0aW9uU3R5bGU6IGB3aWR0aDogJHt3aWR0aH07IGJhY2tncm91bmQ6ICR7YmFja2dyb3VuZH07IGBcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZXRQaXZvdFN0eWxlKCkge1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmRhdGEudGV4dENvbG9yO1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZGF0YS5waXZvdENvbG9yIHx8IHRoaXMuZ2V0Q3VycmVudENvbG9yKCk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBwaXZvdFN0eWxlOiBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kOiAke2JhY2tncm91bmR9YFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldFdpZHRoKCkge1xuICAgICAgdGhpcy5nZXRSZWN0KCcudmFuLXByb2dyZXNzJykudGhlbihyZWN0ID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBwcm9ncmVzc1dpZHRoOiByZWN0LndpZHRoXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFBvcnRpb25TdHlsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi1wcm9ncmVzc19fcGl2b3QnKS50aGVuKHJlY3QgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHBpdm90V2lkdGg6IHJlY3Qud2lkdGggfHwgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRQb3J0aW9uU3R5bGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=