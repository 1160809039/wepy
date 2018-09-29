'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  relations: {
    '../col/index': {
      type: 'descendant'
    }
  },

  props: {
    gutter: {
      type: Number,
      observer: 'setGutter'
    }
  },

  ready: function ready() {
    this.setGutter();
  },


  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;

      var margin = '-' + Number(gutter) / 2 + 'px';
      var style = gutter ? 'margin-right: ' + margin + '; margin-left: ' + margin + ';' : '';

      this.setData({ style: style });
      this.getRelationNodes('../col/index').forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9ucyIsInR5cGUiLCJwcm9wcyIsImd1dHRlciIsIk51bWJlciIsIm9ic2VydmVyIiwicmVhZHkiLCJzZXRHdXR0ZXIiLCJtZXRob2RzIiwiZGF0YSIsIm1hcmdpbiIsInN0eWxlIiwic2V0RGF0YSIsImdldFJlbGF0aW9uTm9kZXMiLCJmb3JFYWNoIiwiY29sIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLG9CQUFPO0FBQ0xBLGFBQVc7QUFDVCxvQkFBZ0I7QUFDZEMsWUFBTTtBQURRO0FBRFAsR0FETjs7QUFPTEMsU0FBTztBQUNMQyxZQUFRO0FBQ05GLFlBQU1HLE1BREE7QUFFTkMsZ0JBQVU7QUFGSjtBQURILEdBUEY7O0FBY0xDLE9BZEssbUJBY0c7QUFDTixTQUFLQyxTQUFMO0FBQ0QsR0FoQkk7OztBQWtCTEMsV0FBUztBQUNQRCxhQURPLHVCQUNLO0FBQUE7O0FBQUEsVUFDRkosTUFERSxHQUNTLEtBQUtNLElBRGQsQ0FDRk4sTUFERTs7QUFFVixVQUFNTyxlQUFhTixPQUFPRCxNQUFQLElBQWlCLENBQTlCLE9BQU47QUFDQSxVQUFNUSxRQUFRUiw0QkFBMEJPLE1BQTFCLHVCQUFrREEsTUFBbEQsU0FBOEQsRUFBNUU7O0FBRUEsV0FBS0UsT0FBTCxDQUFhLEVBQUVELFlBQUYsRUFBYjtBQUNBLFdBQUtFLGdCQUFMLENBQXNCLGNBQXRCLEVBQXNDQyxPQUF0QyxDQUE4QyxVQUFDQyxHQUFELEVBQVM7QUFDckRBLFlBQUlSLFNBQUosQ0FBYyxNQUFLRSxJQUFMLENBQVVOLE1BQXhCO0FBQ0QsT0FGRDtBQUdEO0FBVk07QUFsQkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICByZWxhdGlvbnM6IHtcbiAgICAnLi4vY29sL2luZGV4Jzoge1xuICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnXG4gICAgfVxuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgZ3V0dGVyOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBvYnNlcnZlcjogJ3NldEd1dHRlcidcbiAgICB9XG4gIH0sXG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5zZXRHdXR0ZXIoKTtcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2V0R3V0dGVyKCkge1xuICAgICAgY29uc3QgeyBndXR0ZXIgfSA9IHRoaXMuZGF0YTtcbiAgICAgIGNvbnN0IG1hcmdpbiA9IGAtJHtOdW1iZXIoZ3V0dGVyKSAvIDJ9cHhgO1xuICAgICAgY29uc3Qgc3R5bGUgPSBndXR0ZXIgPyBgbWFyZ2luLXJpZ2h0OiAke21hcmdpbn07IG1hcmdpbi1sZWZ0OiAke21hcmdpbn07YCA6ICcnO1xuXG4gICAgICB0aGlzLnNldERhdGEoeyBzdHlsZSB9KTtcbiAgICAgIHRoaXMuZ2V0UmVsYXRpb25Ob2RlcygnLi4vY29sL2luZGV4JykuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbC5zZXRHdXR0ZXIodGhpcy5kYXRhLmd1dHRlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19